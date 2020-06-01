import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import isIPhoneX from 'react-native-is-iphonex';
import Step2 from './Step2.js';
import { Dropdown } from 'react-native-material-dropdown';
import RadioForm from 'react-native-simple-radio-button';



const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
);
export default class Step1 extends Component {
    constructor(props) {
        super(props);
        checkHN = true;
        checkAge = true;
        checkGender = true;
        checkWelfare = true;
        checkDiagnosis = true;
        checkDiagOther = true;
        checkCor = true;
        checkCorOther = true;
    }

    state = {
        // hn: '',
        // age: '',
        // gender: '',
        // welfare: '',
        // diagnosis: '',
        // diagOther: '',
        // cor: [],
        // corOther: [],
        checkALL: false,
        // next: false,
    }

    cor = [
        {
            name: 'Co mobility',
            problem: [
                { name: 'DM', id: 'DM', },
                { name: 'HT', id: 'HT', },
                { name: 'CKD/ESRD', id: 'CKD/ESRD', },
                { name: 'CHF', id: 'CHF', },
                { name: 'MI', id: 'MI', },
                { name: 'Others', id: 'Others', },
            ]
        }
    ]


    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    // next = e => {
    //     if (this.validate()) {
    //         e.preventDefault();
    //         this.setState({ next: true });
    //     }
    // }

    // backFromResult = () => {
    //     this.setState({
    //         // hn: '',
    //         // age: '',
    //         // gender: '',
    //         // welfare: '',
    //         // diagnosis: '',
    //         // diagOther: '',
    //         // cor: [],
    //         // corOther: [],
    //         checkALL: false,
    //         next: false,
    //     });
    //     // checkHN = true;
    //     // checkAge = true;
    //     // checkGender = true;
    //     // checkWelfare = true;
    //     // checkDiagnosis = true;
    //     // checkDiagOther = true;
    //     // checkCor = true;
    //     // checkCorOther = true;
    // }

    validate = () => {
        const { values } = this.props;

        if (values.hn == '') {
            checkHN = false;
        } else {
            checkHN = true;
        }

        if (values.age == '' || values.age == 0) {
            checkAge = false;
        } else {
            checkAge = true;
        }

        if (values.gender == '') {
            checkGender = false;
        } else {
            checkGender = true;
        }

        if (values.welfare == '') {
            checkWelfare = false;
        } else {
            checkWelfare = true;
        }

        if (values.diagnosis == '') {
            checkDiagnosis = false;
        } else {
            checkDiagnosis = true;
        }

        if (values.diagnosis == 'Others') {
            if (values.diagOther == '') {
                checkDiagOther = false;
            } else {
                checkDiagOther = true;
            }
        }

        if (values.cor.length == 0) {
            checkCor = false;
        } else {
            checkCor = true;
        }

        if (values.cor.includes('Others')) {
            if (values.corOther.length == 0) {
                checkCorOther = false;
            } else {
                checkCorOther = true;
            }
        }

        var check = checkHN && checkAge && checkGender && checkWelfare && checkDiagnosis && checkDiagOther && checkCor && checkCorOther;

        if (check) {
            this.setState({ checkAll: true })
        } else {
            this.setState({ checkAll: false })
        }

        if (check) {
            // this.setState({ next: true });
            this.props.nextStep();
        } else {
            // this.setState({ next: false });
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
        const { values, handleChange } = this.props;

        return (
            <DismissKeyboard>
                <KeyboardAvoidingView style={styles.container} behavior={isIPhoneX ? "padding" : "padding"} enabled>

                    {/* <View style={styles.container}> */}
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.back} onPress={this.back} >
                            <MaterialIcons name="arrow-back" size={40} color="white" />
                        </TouchableOpacity>
                        <View style={styles.profileHeader}>
                            <Text style={styles.header}>ผู้ป่วยใหม่</Text>
                        </View>
                        <TouchableOpacity style={styles.back}  >
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.formBar}>
                        <Text style={[styles.subheader, { paddingTop: 10 }]}>หมายเลขอ้างอิง * </Text>
                        <TextInput
                            style={[styles.textinput]}
                            placeholder='หมายเลขอ้างอิง'
                            returnKeyType="next"
                            // keyboardType="number-pad"
                            onSubmitEditing={() => this.ageInput.focus()}
                            maxLength={20}
                            onChangeText={(e) => handleChange('hn', e)}
                            defaultValue={values.hn}
                            autoCorrect={false}
                        />
                        {this.renderError(checkHN, 'กรุณาระบุหมายเลขอ้างอิง')}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.subheader, { flex: 0.5 }]}>อายุ *</Text>
                            <Text style={[styles.subheader, { flex: 0.5 }]}>เพศ *</Text>

                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                <TextInput
                                    style={[styles.textinput, { width: 100 }]}
                                    placeholder='อายุ'
                                    returnKeyType="next"
                                    keyboardType="number-pad"
                                    ref={(input) => this.ageInput = input}
                                    maxLength={2}
                                    onChangeText={(e) => handleChange('age', e)}
                                    defaultValue={values.age}
                                    autoCorrect={false}
                                />
                                <Text style={[styles.subheader, { marginLeft: 10, fontWeight: 'normal' }]}>ปี</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Dropdown
                                    data={[
                                        { label: 'ชาย', value: 'MALE' },
                                        { label: 'หญิง', value: 'FEMALE' },
                                    ]}
                                    dropdownOffset={{ top: 10 }}
                                    value={values.gender}
                                    onChangeText={(e) => handleChange('gender', e)}
                                    containerStyle={[styles.dropdown, { marginLeft: 0 }]}
                                />

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 0.5 }}>
                                {this.renderError(checkAge, 'กรุณาระบุอายุ')}
                            </View>
                            <View style={{ flex: 0.5 }}>
                                {this.renderError(checkGender, 'กรุณาระบุเพศ')}
                            </View>
                        </View>


                        <Text style={styles.subheader}>สิทธิการรักษา *</Text>
                        <Dropdown
                            data={[
                                { label: 'ข้าราชการ/เบิกต้นสังกัด', value: 'ข้าราชการ/เบิกต้นสังกัด' },
                                { label: 'ประกันสังคม', value: 'ประกันสังคม' },
                                { label: 'บัตรประกันสุขภาพถ้วนหน้า', value: 'บัตรประกันสุขภาพถ้วนหน้า' },
                                { label: 'ประกันชีวิต', value: 'ประกันชีวิต' },
                                { label: 'เงินสด', value: 'เงินสด' },
                            ]}
                            itemCount={5}
                            dropdownOffset={{ top: 10 }}
                            value={values.welfare}
                            onChangeText={(e) => handleChange('welfare', e)}
                            containerStyle={[styles.dropdown]}
                        />
                        {this.renderError(checkWelfare, 'กรุณาระบุสิทธิการรักษา')}

                        <Text style={styles.subheader}>การวินิจฉัยโรค *</Text>
                        <Dropdown
                            data={[
                                { label: 'Septic shock', value: 'Septic shock' },
                                { label: 'Sepsis', value: 'Sepsis' },
                                { label: 'Cardiogenic shock', value: 'Cardiogenic shock' },
                                { label: 'Anaphylaxis shock', value: 'Anaphylaxis shock' },
                                { label: 'Hypovolemic shock', value: 'Hypovolemic shoc' },
                                { label: 'Others', value: 'Others' },
                            ]}
                            dropdownOffset={{ top: 10 }}
                            itemCount={6}
                            value={values.diagnosis}
                            onChangeText={(e) => handleChange('diagnosis', e)}
                            containerStyle={[styles.dropdown]}
                        />
                        {this.renderError(checkDiagnosis, 'กรุณาระบุการวินิจฉัยโรค')}


                        {values.diagnosis == 'Others' ?
                            <View>
                                <Text style={styles.subheader}>โปรดระบุ</Text>
                                <TextInput
                                    style={[styles.textinput]}
                                    placeholder='การวินิจฉัยโรค'
                                    returnKeyType="next"
                                    // keyboardType="number-pad"
                                    // onSubmitEditing={() => this.ageInput.focus()}
                                    maxLength={50}
                                    onChangeText={(e) => handleChange('diagOther', e)}
                                    defaultValue={values.diagOther}
                                    autoCorrect={false}
                                />
                            </View> : <View></View>
                        }
                        {this.renderError(checkDiagOther, 'กรุณาระบุการวินิจฉัยโรค')}

                        <Text style={styles.subheader}>โรคร่วม (Co mobility) * </Text>
                        <View style={styles.formpicker}>
                            <SectionedMultiSelect
                                items={this.cor}
                                uniqueKey="name"
                                selectText="ระบุ..."
                                subKey="problem"
                                showDropDowns={true}
                                readOnlyHeadings={true}
                                onSelectedItemsChange={(e) => handleChange('cor', e)}
                                selectedItems={values.cor}
                                expandDropDowns={true}
                                searchPlaceholderText="Search"
                                colors={{ subText: '#000000' }}
                                styles={{container : {
                                    backgroundColor: 'white',
                                  },
                                  selectToggle : {
                                    // backgroundColor: '#e2e2e2',
                                    // backgroundColor: '#f2f2f2',
                                    borderWidth: 1,
                                    borderColor: '#6a6e78',
                                    borderRadius: 10,
                                    paddingVertical: 10,
                                    paddingHorizontal: 5,
                                    marginBottom: 5,
                                  },
                                  selectToggleText: {
                                    // fontWeight: 'bold'
                                  }
                                }}
                            />
                        </View>

                        {this.renderError(checkCor, 'กรุณาระบุโรคร่วม')}

                        {values.cor.includes('Others') ?
                            <View>
                                <Text style={styles.subheader}>โปรดระบุ</Text>
                                <TextInput
                                    style={[styles.textinput]}
                                    placeholder='โรคร่วม (Co mobility)'
                                    returnKeyType="next"
                                    // keyboardType="number-pad"
                                    // onSubmitEditing={() => this.ageInput.focus()}
                                    maxLength={50}
                                    onChangeText={(e) => handleChange('corOther', e)}
                                    defaultValue={values.corOther}
                                    autoCorrect={false}
                                />
                            </View> : <View></View>
                        }
                        {this.renderError(checkCorOther, 'กรุณาระบุโรคร่วม')}

                        <Button
                            title="ถัดไป"
                            onPress={this.validate}
                            buttonStyle={[styles.nextBtn]}
                            type="solid"
                            titleStyle={{ color: 'white' }}
                        />


                    </ScrollView>
                </KeyboardAvoidingView>
            </DismissKeyboard>
        );
    }
    render() {
        // console.log(this.state)
        // const x = this.state.next ?
        //     <Step2 onPress={this.backFromResult.bind(this)} values={this.state} onPressToLogin={this.props.onPressToLogin} onPressToHome={this.props.onPressToHome}></Step2>
        //     : this.renderForm();
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
    topBar: {
        backgroundColor: '#005daa',
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
        // color: 'black',
        color: '#005daa',
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
        // color: '#005daa',
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
        // backgroundColor: '#005daa',
        // borderColor: '#005daa',
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