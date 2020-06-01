import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import isIPhoneX from 'react-native-is-iphonex';
import Pick from './Pick.js'
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import { Dropdown } from 'react-native-material-dropdown';
import RadioForm from 'react-native-simple-radio-button';
import moment from 'moment'



const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
);
export default class Form extends Component {


    state = {
        step: 1,

        // step 1 
        hn: '',
        age: '',
        gender: '',
        welfare: '',
        diagnosis: '',
        diagOther: '',
        cor: [],
        corOther: [],

        // step 2
        drug: [],
        drugOther: '',
        concenMG: '',
        concenML: '',
        volumn: '',
        noti: '',
        notiOther: '',
        timeUsing: moment().format('DD MMM YYYY HH:mm'),
        timeOccuring: moment().format('DD MMM YYYY HH:mm'),
    }


    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    // Handle fields change
    handleChange = (input, e) => {
        // set input for all state
        this.setState({ [input]: e },
            // replace other
            () => 
            {
                // var a = this.replaceOther(this.state.diagnosis, this.state.diagOther);
                // var b = this.replaceOther(this.state.cor, this.state.corOther);
                // var c = this.replaceOther(this.state.drug, this.state.drugOther);
                // var d = this.replaceOther(this.state.noti, this.state.notiOther)
                // this.setState({ diag: a, cormobility: b, 
                //     drugs: c, notification: d})
            }
            
        );
    };

    replaceOther = (arr1, arr2) => {
        var array1 = arr1.slice()
        var index = array1.indexOf("Others");
        if (index != -1) {
            array1[index] = arr2;
        }
        return array1;
    }


    render() {
        const { step } = this.state;
        const { hn, age, gender, welfare, diagnosis, diagOther, cor, corOther, drug, drugOther, 
            concenMG, concenML, volumn, noti, notiOther, timeUsing, timeOccuring } = this.state;

        // const diag = this.replaceOther(diagnosis, diagOther)
        // const cormobility = this.replaceOther(cor, corOther);
        // const drugs = this.replaceOther(drug, drugOther);
        // const notification = this.replaceOther(noti, notiOther)

        // const values = {
        //     hn, age, gender, welfare, diag, diagnosis, diagOther, cor, corOther, cormobility, drug, drugOther, drugs, 
        //     concenMG, concenML, volumn, noti, notiOther, notification, timeUsing, timeOccuring
        // };

        const values = {
            hn, age, gender, welfare, diagnosis, diagOther, cor, corOther,  drug, drugOther, 
            concenMG, concenML, volumn, noti, notiOther,  timeUsing, timeOccuring
        };

        console.log(this.state)

        switch (step) {
            case 1:
                return (
                    <Step1
                        nextStep={this.nextStep}
                        prevStep={this.props.onPressToHome}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <Step2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <Pick
                        onPress={this.prevStep}
                        values={values}
                        onPressToLogin={this.props.onPressToLogin} 
                        onPressToHome={this.props.onPressToHome}
                    />
                );
        }

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
        backgroundColor: '#2B435F',
        flex: 0.15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    formBar: {
        flex: 0.7,
        paddingHorizontal: 20,
        // alignItems: 'center'
        // backgroundColor: 'red'
    },
    bottomBar: {
        flex: 0.13,
        margin: 20,
        marginBottom: 40,
    },
    back: {
        marginTop: 40,
        width: 40
    },
    profileHeader: {
        // marginTop: 5,
        // marginLeft: 110
    },
    subheader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        marginTop: 15,
    },
    textinput: {
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#6a6e78',
        paddingLeft: 5,
        borderRadius: 10,
        height: 50,
        color: 'black',
        // borderBottomWidth:1
    },
    header: {
        fontSize: 18,
        color: 'white',
        marginTop: 40,
        fontWeight: 'bold'
    },
    nextBtn: {
        backgroundColor: '#B6452C',
        borderColor: '#B6452C',
        // marginTop: isIPhoneX? 220: 100,
        borderRadius: 5,
        height: 50,
        marginVertical: 20
    },
    error: {
        fontSize: 14,
        color: 'red',
        marginTop: 10,
    },
    formpicker: {
        marginHorizontal: 0,
        // borderColor: '#6a6e78',
        // borderWidth: 1,
        borderRadius: 10,
        // height: 70,
        justifyContent: 'center',
    },
    dropdown: {
        // width: 150,
        borderColor: '#6a6e78',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
        // height: 60,
    },
    concentrationArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});