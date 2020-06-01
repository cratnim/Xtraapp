import React, { Component }from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard , TouchableWithoutFeedback, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import Form from './Form.js';
import firebase from 'firebase';
import db from './Config.js';
// import Camera from './Newcamera.js'
import Home from './Home.js';
import isIPhoneX from 'react-native-is-iphonex';

const DismissKeyboard = ({ children}) => (
  <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()} >
    {children}
  </TouchableWithoutFeedback> 
);

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0

export default class App extends Component {
 
  state={
    login: false,
    Email: '',
    Password: '',
  }

  backFromResult = () => {
    this.setState({
      login: false,
      Email: '',
      Password: '',
     });
  }

  onLoginButtonPress=() =>{
    const {Email , Password} = this.state;
    firebase.auth().signInWithEmailAndPassword(Email,Password)
      .then(()=>{ this.setState({login: true}); })
      .catch(function(error) {
        // Handle Errors 
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errorCode: ' + errorCode)
        console.log('errorMessage: ' + errorMessage)
        if(errorCode === 'auth/invalid-email'){
          if (Email == ''){
            alert('กรุณากรอกอีเมล');
          }
          else {
            alert('รูปแบบอีเมลไม่ถูกต้อง')
          }
        }
        else if (errorCode === 'auth/wrong-password') {
          if (Password == ''){
            alert('กรุณากรอกรหัสผ่าน');
          }else {
            alert('รหัสผ่านผิด');
          }
        } 
        else {
          alert(errorMessage);
        }
        console.log(error);
      });
  } 


  render() {
    if(this.state.login == false){
      return (
        <DismissKeyboard>
        <KeyboardAvoidingView style={styles.container} behavior={ isIPhoneX ? null : "position"}  keyboardVerticalOffset={keyboardVerticalOffset} enabled>  
          {/* <SafeAreaView style={styles.container}>  */}
            
          <View style={styles.top}>
              <Image source={require('./Images/logo.png')} style={{ width: 250, height: 250 }} />
            </View>
          <View style={styles.topBox}>
            
            {/* <Text style={styles.welcome}>Welcome</Text> */}
            <Text style={styles.Text}>อีเมล</Text>
            <TextInput
              placeholder={'อีเมล'}
              style={styles.TextInput}
              onChangeText={
                email => this.setState({Email: email})
              }
              clearButtonMode='while-editing'
              textContentType='emailAddress'
              returnKeyType='next'
              onSubmitEditing = {() => this.passwd.focus()}
              keyboardType="email-address"
              autoCapitalize="none"  
            />
            <Text style={styles.Text}>รหัสผ่าน</Text>
            <TextInput
              placeholder={'รหัสผ่าน'}
              style={styles.TextInput}
              onChangeText={
                password => this.setState({Password: password })
              }
              clearButtonMode='while-editing'
              secureTextEntry={true}
              textContentType='password'
              ref={(input) => this.passwd = input}
              returnKeyType="done"
              autoCapitalize="none"  
            />
          </View>
          <View style={styles.bottomBox}>
            <Button 
              title="เข้าสู่ระบบ"
              onPress={this.onLoginButtonPress}
              buttonStyle={styles.loginButton}
              titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
            />
           
          </View>
        {/* </SafeAreaView>     */}
        </KeyboardAvoidingView>
        </DismissKeyboard>
      );
    }
    else{
      if(this.state.login==true){
        User1={
          Email: this.state.Email,
          Password: this.state.Password
        }
        return (
          // <Store User={User1} onPress={this.backFromResult.bind(this)} />
          <Home User={User1} onPress={this.backFromResult.bind(this)} onPressLogout={this.backFromResult.bind(this)} />
        );
      }
      
      
    }
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'column',
    flex: 1,
    paddingTop: isIPhoneX ? 60 : 40,
    paddingHorizontal:30,
  },
  top:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBox:{
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'stretch',
  },
  bottomBox:{
    paddingTop: 30,
    justifyContent: 'center',
  },

  loginButton:{
    backgroundColor: '#005daa',
    height: 50,
    borderRadius: 5,
  },
  welcome:{
    fontWeight:'bold',
    fontSize:36,
    alignSelf:'center',
    flex:0.4,
    color:'black',
  },
  formLogin:{
    backgroundColor:'#ffffff',
  },
  TextInput:{
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderColor: '#005daa',
    borderWidth: 1,
    // backgroundColor: '#F5F7F4',
  },
  Text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#005daa',
  }
});
