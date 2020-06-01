import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Dropdown } from 'react-native-material-dropdown';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
);

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0

export default class Done extends Component {
    constructor(props) {
        super(props);
        checkABT = true;
        checkGet = true;
    }
    state = {
        atb: '',
        clean: 0,
        room: '',
        deb: 0,
        skin: 0,
        sleep: 0,

        get: '',
        isNext: false,
        checkAll: false,
    }

    back = e => {
        e.preventDefault();
        this.props.onPress();
    };


    backFromResult = () => {
        this.setState({
            atb: '',
            clean: 0,
            room: '',
            deb: 0,
            skin: 0,
            sleep: 0,

            get: '',
            isNext: false,
            checkAll: false,
        });
        checkABT = true;
        checkGet = true;
    }


    validate = () => {

        
        if (this.state.atb == '') {
            if(this.state.get === 'YES'){
                checkABT = true
                checkGet = false
            } else {
                checkABT = false
                checkGet = true
            }
        }
        else {
            checkABT = true
            checkGet = true
        }

        const allValid = checkABT && checkGet 

        console.log('allValid: ', allValid)

        if (allValid) {
            this.setState({ checkAll: true })
        } else {
            this.setState({ checkAll: false })
        }

        if (allValid) {
            // this.setState({ isNext: true });
            this.uploadDone(this.props.pID)
            this.props.goHome()
        } else {
            // this.setState({ isNext: false });
        }
        return this.state.checkAll;
    }

    renderError = (type, text) => {
        if (!type) {
            return <Text style={styles.error}>{text}</Text>;
        }
        return null;
    }

    renderForm() {
        return (
            <DismissKeyboard>
                {/* <View style={styles.container}> */}
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? "padding" : "padding"} enabled>
                    <View style={styles.subContainer}>
                        <TouchableOpacity style={styles.back} onPress={this.back} >
                            <MaterialIcons name="arrow-back" size={40} color="white" />
                        </TouchableOpacity>
                        <View style={styles.profileHeader}>
                            <Text style={styles.header}>Patient</Text>
                        </View>
                        <TouchableOpacity style={styles.back}  >
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.formArea}>
                        <Text style={styles.subheader}>การรับยา ATB *</Text>
                        <RadioForm
                            radio_props={[
                                { label: 'ไม่ได้รับยา ATB', value: "NO" },
                                { label: 'ได้รับยา ATB', value: "YES" },
                            ]}
                            initial={-1}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonColor={'#3d1c02'}
                            selectedButtonColor={'#3d1c02'}
                            onPress={(value) => {
                                if (value == 'NO') {
                                    this.setState({ atb: value })
                                } 
                                this.setState({ get: value })
                            }}
                            style={styles.form}
                            buttonSize={15}
                            labelStyle={{ fontSize: 16, marginHorizontal: 5 }}
                        />
                        

                        {this.state.get == 'YES' ?
                            <View style={{ flexDirection: 'row', marginHorizontal: 50, }}>
                                <Text style={[styles.subheader, { fontWeight: 'normal' }]}>ระบุ</Text>
                                <Dropdown
                                    data={[
                                        { label: 'clindanycin', value: "clindanycin" },
                                        { label: 'vancomycin', value: "vancomycin" },
                                        { label: 'cefazolin', value: "cefazolin" },
                                    ]}
                                    dropdownOffset={{ top: 10, left: 20 }}
                                    value={this.state.atb}
                                    onChangeText={(e) => this.setState({ atb: e })}
                                    containerStyle={[styles.dropdown, { marginLeft: 20 }]}
                                />
                            </View> : <View></View>}
                        {this.renderError(checkABT, 'กรุณาระบุการรับยา ATB')}
                        {this.renderError(checkGet, 'กรุณาระบุการรับยา ATB')}


                        <Text style={styles.subheader}>การทำแผล</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.textinput]}
                                placeholder='จำนวน'
                                returnKeyType="next"
                                keyboardType="number-pad"
                                // ref={(input) => this.ageInput = input}
                                maxLength={2}
                                onChangeText={(e) => this.setState({ clean: e })}
                                defaultValue={this.state.clean}
                                autoCorrect={false}
                            />
                            <Text style={[styles.subheader, { fontWeight: 'normal', marginLeft: 20 }]}>ครั้ง/วัน</Text>
                        </View>

                        <Text style={styles.subheader}>สถานที่เข้ารับการรักษา</Text>
                        <Dropdown
                            data={[
                                { label: 'หอผู้ป่วยสามัญ', value: "หอผู้ป่วยสามัญ" },
                                { label: 'หอผู้ป่วยพิเศษ', value: "หอผู้ป่วยพิเศษ" },
                                { label: 'หอผู้ป่วยวิกฤต', value: "หอผู้ป่วยวิกฤต" },
                            ]}
                            dropdownOffset={{ top: 10 }}
                            value={this.state.room}
                            onChangeText={(e) => this.setState({ room: e })}
                            containerStyle={[styles.dropdown]}
                        />

                        <Text style={styles.subheader}>ผ่าตัด debridement</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.textinput]}
                                placeholder='จำนวน'
                                returnKeyType="next"
                                keyboardType="number-pad"
                                // ref={(input) => this.ageInput = input}
                                maxLength={2}
                                onChangeText={(e) => this.setState({ deb: e })}
                                defaultValue={this.state.deb}
                                autoCorrect={false}
                            />
                            <Text style={[styles.subheader, { fontWeight: 'normal', marginLeft: 20 }]}>ครั้ง</Text>
                        </View>

                        <Text style={styles.subheader}>ผ่าตัด skin graft</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.textinput]}
                                placeholder='จำนวน'
                                returnKeyType="next"
                                keyboardType="number-pad"
                                // ref={(input) => this.ageInput = input}
                                maxLength={2}
                                onChangeText={(e) => this.setState({ skin: e })}
                                defaultValue={this.state.skin}
                                autoCorrect={false}
                            />
                            <Text style={[styles.subheader, { fontWeight: 'normal', marginLeft: 20 }]}>ครั้ง</Text>
                        </View>

                        <Text style={styles.subheader}>จำนวนวันที่นอนโรงพยาบาล</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.textinput]}
                                placeholder='จำนวนวันที่นอนโรงพยาบาล'
                                returnKeyType="next"
                                keyboardType="number-pad"
                                // ref={(input) => this.ageInput = input}
                                maxLength={2}
                                onChangeText={(e) => this.setState({ sleep: e })}
                                defaultValue={this.state.sleep}
                                autoCorrect={false}
                            />
                            <Text style={[styles.subheader, { fontWeight: 'normal', marginLeft: 20 }]}>วัน</Text>


                        </View>

                        <Button
                            title="ถัดไป"
                            onPress={this.validate}
                            buttonStyle={[styles.nextBtn, { height: 50 }]}
                            type="solid"
                            titleStyle={{ color: 'white' }}
                        />
                    </ScrollView>

                </KeyboardAvoidingView>
                {/* </View> */}
            </DismissKeyboard>
        );
    }

    //x = x.pid
    uploadDone = async (x) => {
        console.log(x)
        const apiURL = 'https://xyh4ml0s-dr006-8812.in.cils.space/close/'+x;
    
        const form = new FormData();
    
       
        form.append('atb', this.state.atb);
        form.append('clean', this.state.clean);
        form.append('room', this.state.room);
        form.append('deb', this.state.deb);
        form.append('skin', this.state.skin);
        form.append('sleepDate', this.state.sleep);

    
        // upload image to api
        fetch(apiURL, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: form
        })
          .then(response => response.json())
          .then((responseJson) => {
            console.log('responseJson.result')
            console.log(responseJson)
          })
          .catch(error => console.log(error))
      }
    

    render() {
        // const x = this.state.isNext ? null : this.renderForm();
        const x = this.renderForm();
        const content = x;
        return (
            <View style={styles.container}>
                {content}
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
    header: {
        fontSize: 18,
        color: 'white',
        marginTop: 40,
    },
    profileHeader: {
        // marginTop: 5,
        // marginLeft: 110
    },
    logoutHeader: {
        marginTop: 40,
        marginLeft: 10
    },
    subheader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        marginTop: 10,
    },
    textinput: {
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#6a6e78',
        paddingLeft: 5,
        borderRadius: 10,
        height: 40,
        color: 'black',
        width: 200,
        marginLeft: 0
    },
    form: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 90,
        paddingLeft: 10
    },
    concentrationArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backBtn: {
        backgroundColor: '#f8f8ec',
        borderColor: '#6a6e78',
    },
    nextBtn: {
        backgroundColor: '#B6452C',
        borderColor: '#B6452C',
        // marginTop: isIPhoneX? 220: 100,
        borderRadius: 5,
        marginVertical: 20
    },
    subContainer: {
        backgroundColor: '#005daa',
        flex: 0.15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    btntap: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 0.2,
        // marginVertical: 40
    },
    formArea: {
        paddingHorizontal: 20,
        marginTop: 10,
        flex: 0.8,
    },
    error: {
        fontSize: 14,
        color: 'red',
        marginBottom: 10,
    },
    formpicker: {
        marginHorizontal: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        height: 70,
        justifyContent: 'center',
    },
    dropdown: {
        width: 200,
        // borderColor: '#6a6e78',
        // borderWidth: 1,
        // paddingHorizontal: 20
        // height: 60,
    },
    back: {
        marginTop: 40,
        width: 40
    },
});