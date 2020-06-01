import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Dimensions,
    TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Form from './Form.js'
import Home from './Home.js'



export default class Result extends Component {

    constructor(props) {
        super(props);
        dictUri = this.props.dictUri;
        x = true;
       
    }

    state = {
        next: false,
        pic1: '',
        pic2: '',
        goHome : false,
        goForm : false,
        
    }

    menuPress = () => {
        this.setState({goHome:true})
    };

    testPress = () => {
        this.setState({goForm:true})
    }

    backFromResult = () => {
        this.setState({
            next: false,
        });
    }

    fetchImage = () => {
        this.setState({pic1 :dictUri[0].value})
        
    }



    render() {
        if(x)
        {
            this.fetchImage();
            x = false;

        }
        if(this.state.goForm)
        {
            return(<Form onPressToLogin={this.props.onPressToLogin} onPressToHome={this.props.onPressToHome}></Form>)
        }
        if(this.state.goHome)
        {
            return(<Home onPressToLogin={this.props.onPressToLogin} onPressToHome={this.props.onPressToHome}></Home>)
        }
        
        // const x = this.state.next ? <Text>GO NEXT</Text> : this.renderForm();
        // const content = x;
        return (
            <View style={styles.container}>
                {/* {content} */}
                <View style={styles.topBar}>
                    <Text style={styles.header}>Result</Text>
                </View>
                <ScrollView contentComponentStyle={styles.subContainer}>
                    <View style={styles.imgBar} >
                        <Image
                            style={styles.img}
                            source={{ uri: this.state.pic1 }}
                            resizeMode='contain'
                        />
                        
                    </View>

                    <View style={styles.resultBar}>
                        <Text style={styles.resultText}>NORMAL</Text>
                    </View>

                    <View style={styles.bottomBar}>
                        {/* <Button
                            title="Test Again"
                            onPress={this.testPress}
                            buttonStyle={[styles.nextBtn]}
                            type="solid"
                            titleStyle={{ color: 'white' }}
                        /> */}
                        <Button
                            title="Menu"
                            onPress={this.menuPress}
                            buttonStyle={[styles.nextBtn]}
                            type="solid"
                            titleStyle={{ color: 'white' }}
                        />
                    </View>


                </ScrollView>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F7F4',
        flexDirection: 'column',
        flex: 1,
    },
    topBar: {
        backgroundColor: '#2B435F',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 10,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    imgBar: {
        // flex: 1,
        margin: 10,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    bottomBar: {
        marginVertical: 20,
        marginBottom: 30,
    },
    img: {
        height: Dimensions.get('window').height/2,
        width: Dimensions.get('window').width/2,
    },
    resultBar: {
        backgroundColor: '#67a65b',
        alignItems: 'center',
        marginTop: 10,
    },
    resultText: {
        fontSize: 32,
        // fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        marginTop: 10,
    },
    subheader: {
        fontSize: 16,
        fontWeight: '100',
        marginBottom: 10,
        color: 'black',
        marginTop: 10,
    },
    textinput: {
        fontSize: 16,
        fontWeight: '100',
        borderWidth: 1,
        borderColor: '#7f8585',
        paddingLeft: 5,
        borderRadius: 10,
        height: 40,
        color: 'black',
    },
    header: {
        fontSize: 18,
        color: 'white',
        marginTop: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nextBtn: {
        backgroundColor: '#B6452C',
        borderColor: '#B6452C',
        marginHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
});