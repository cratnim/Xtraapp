import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Camera from './goodCamera.js'
import Picker from './Picker.js'

export default class Form extends Component {

  constructor(props) {
    super(props);
    pick = '';

  }

  state = {
    values: this.props.values,
    lh: this.props.lh === undefined ? '' : this.props.lh,
    position: null,
    allUri: this.props.dictUri === undefined ? [] : this.props.dictUri,
    allDisease: this.props.dictDisease === undefined ? [] : this.props.dictDisease,

  }


  backFromResult = () => {
    this.setState({
      values: this.props.values,
      lh: this.props.lh === undefined ? '' : this.props.lh,
      position: null,
      allUri: this.props.dictUri === undefined ? [] : this.props.dictUri,
      allDisease: this.props.dictDisease === undefined ? [] : this.props.dictDisease,
    });
  }

  back = e => {
    e.preventDefault();
    this.props.onPress();
  };


  renderTopBar = () => {
    return (
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBotton} onPress={this.back} >
          <MaterialIcons name="arrow-back" size={40} color='white' />
        </TouchableOpacity>
        <TouchableOpacity  >
          <Text style={styles.text}>ตำแหน่งที่ต้องการถ่าย</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBotton}  >

        </TouchableOpacity>
      </View>
    );
  }

  renderChoice = () => {
    console.log(this.state.lh)
    pick = this.state.lh.toString()
    // console.log('Left Hand + ', pick.includes('Left Hand'))
    return (
      <View style={styles.choiceBar}>
        <View style={styles.subContainer}>
          <Button
            title="มือซ้าย"
            buttonStyle={[styles.backBtn, pick.includes('Left Hand') ? { backgroundColor: 'black' } : { backgroundColor: '#F5F7F4' }]}
            type="outline"
            onPress={() => this.setState({ position: 'Left Hand' })}
            titleStyle={pick.includes('Left Hand') ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' } }
          >
          </Button>
          <Button
            title="มือขวา"
            buttonStyle={[styles.backBtn, pick.includes('Right Hand') ? { backgroundColor: 'black' } : { backgroundColor: '#F5F7F4' }]}
            type="outline"
            onPress={() => this.setState({ position: "Right Hand" })}
            titleStyle={pick.includes('Left Hand') ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' } }
          >
          </Button>
        </View>

        <View style={styles.subContainer}>
          <Button
            title="แขนซ้าย"
            buttonStyle={[styles.backBtn, pick.includes('Left Arm') ? { backgroundColor: 'black' } : { backgroundColor: '#F5F7F4' }]}
            type="outline"
            onPress={() => this.setState({ position: "Left Arm" })}
            titleStyle={pick.includes('Left Hand') ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' } }
          >
          </Button>
          <Button
            title="แขนขวา"
            buttonStyle={[styles.backBtn, pick.includes('Right Arm') ? { backgroundColor: 'black' } : { backgroundColor: '#F5F7F4' }]}
            type="outline"
            onPress={() => this.setState({ position: "Right Arm" })}
            titleStyle={pick.includes('Left Hand') ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' } }
          >
          </Button>
        </View>

        <View style={styles.subContainer}>
          <Button
            title="ขาซ้าย"
            buttonStyle={[styles.backBtn, pick.includes('Left Leg') ? { backgroundColor: 'black' } : { backgroundColor: '#F5F7F4' }]}
            type="outline"
            onPress={() => this.setState({ position: "Left Leg" })}
            titleStyle={pick.includes('Left Hand') ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' } }
          >
          </Button>
          <Button
            title="ขาขวา"
            buttonStyle={[styles.backBtn, pick.includes('Right Leg') ? { backgroundColor: 'black' } : { backgroundColor: '#F5F7F4' }]}
            type="outline"
            onPress={() => this.setState({ position: "Right Leg" })}
            titleStyle={pick.includes('Left Hand') ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' } }
          >
          </Button>
        </View>

        <View style={styles.subContainer}>
          <Button
            title="เท้าซ้าย"
            buttonStyle={[styles.backBtn, pick.includes('Left Foot') ? { backgroundColor: 'black' } : { backgroundColor: '#F5F7F4' }]}
            type="outline"
            onPress={() => this.setState({ position: "Left Foot" })}
            titleStyle={pick.includes('Left Hand') ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' } }
          >
          </Button>
          <Button
            title="เท้าขวา"
            buttonStyle={[styles.backBtn, pick.includes('Right Foot') ? { backgroundColor: 'black' } : { backgroundColor: '#F5F7F4' }]}
            type="outline"
            onPress={() => this.setState({ position: "Right Foot" })}
            titleStyle={pick.includes('Left Hand') ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' } }
          >
          </Button>
        </View>

      </View>
    );
  }

  render() {
    pick = this.state.lh.toString()
    if (pick.includes('Right Foot') && pick.includes('Left Foot') && pick.includes('Right Leg') && pick.includes('Left Leg') && pick.includes('Right Arm') && pick.includes('Left Arm') && pick.includes('Left Hand') && pick.includes('Right Hand')) {
      return (<Upload values={this.state.values} allUri={this.state.allUri} allDisease={this.state.allDisease}></Upload>)
    }


    if (this.state.position != null) {
      return (
        <Picker
          dictUri={this.state.allUri}
          dictDisease={this.state.allDisease}
          values={this.state.values}
          position={this.state.position}
          onPress={this.backFromResult.bind(this)}
          lhPick={this.state.lh}
          onPressToLogin={this.props.onPressToLogin}
          onPressToHome={this.props.onPressToHome}
        >
        </Picker>
      )
    }

    return (
      <View style={styles.container}>
        {this.renderTopBar()}
        {this.renderChoice()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    backgroundColor: '#F5F7F4',
    flexDirection: 'column',
    flex: 1,
  },
  topBar: {
    backgroundColor: '#005daa',
    flex: 0.15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  choiceBar: {
    flex: 0.87,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F5F7F4',
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginTop: 40,
    fontWeight: 'bold'
  },
  backBotton: {
    marginTop: 40,
    width: 40
  },
  smileFace: {
    marginTop: 50,
    marginLeft: 110,
  },
  backBtn: {

    borderColor: '#6a6e78',
    width: Dimensions.get('window').width / 2 - 10,
    height: Dimensions.get('window').height / 4 - 25
  },
});