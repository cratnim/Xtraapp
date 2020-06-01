import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import GoCamera from './goodCamera.js'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import isIPhoneX from 'react-native-is-iphonex';
import Pick from './Pick.js'
import { Dropdown } from 'react-native-material-dropdown';
import RadioForm from 'react-native-simple-radio-button';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";



const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
);
export default class Step2 extends Component {
    constructor(props) {
        super(props);
        checkDrug = true;
        checkDrugOther = true;
        checkConcenMG = true;
        checkConcenML = true;
        checkVolumn = true;
        checkNoti = true;
        checkNotiOther = true;
        checktimeUsing = true;
        checktimeOccuring = true;
    }

    state = {
        checkALL: false,
        // next: false,
        // drug: '',
        // drugOther: '',
        // concenMG: '',
        // concenML: '',
        // volumn: '',
        // noti: '',
        // notiOther: '',
        // timeUsing: moment().format('DD MMM YYYY HH:mm'),
        // timeOccuring: moment().format('DD MMM YYYY HH:mm'),
        fPickerVisible: false,
        sPickerVisible: false,
    }


    drugs = [
        {
            name: 'Hyperosmolar agents',
            id: 'Hyperosmolar agents',
            problem: [
                { name: '5.5% calcium gluconate', id: '5.5% calcium gluconate', },
                { name: '10% calcium gluconate', id: '10% calcium gluconate', },
                { name: '20% lipid', id: '20% lipid', },
                { name: '50% MgSo4', id: '50% MgSo4', },
                { name: 'Contrast media', id: 'Contrast media', },
                { name: 'Dextrose (>10%)', id: 'Dextrose (>10%)', },
                { name: 'KCl (> 40 mmol/L)', id: 'KCl (> 40 mmol/L)', },
                { name: 'Mannitol', id: 'Mannitol', },
                { name: 'NSS (>3-10%)', id: 'NSS (>3-10%)', },
                { name: 'PPN/ TPN', id: 'PPN/ TPN', },
                { name: 'Phenytoin', id: 'Phenytoin', },
                { name: 'Others', id: 'OthersHyperosmolar', },
            ],
        }, {
            name: 'Chemotherapy',
            id: 'Chemotherapy',
            problem: [
                { name: 'Bleomycin C', id: 'Bleomycin', },
                { name: 'Cisplatin', id: 'Cisplatin', },
                { name: 'Carmustine Cetuximab', id: 'Carmustine Cetuximab', },
                { name: 'Cyclophosphamide', id: 'Cyclophosphamide', },
                { name: 'Dacarbazine Etoposide', id: 'Dacarbazine Etoposide', },
                { name: 'Dactinomycin', id: 'Dactinomycin', },
                { name: 'Doxorubicin', id: 'Doxorubicin', },
                { name: 'Docetaxel', id: 'Docetaxel', },
                { name: 'Epirubicin', id: 'Epirubicin', },
                { name: 'Gemtalabine Teniposide', id: 'Gemtalabine Teniposide', },
                { name: 'Idarubicin', id: 'Idarubicin', },
                { name: 'Mitomycin C', id: 'Mitomycin C', },
                { name: 'Oxaliplatin', id: 'Oxaliplatin', },
                { name: 'Paclitaxel', id: 'Paclitaxel', },
                { name: 'Vinblastine Vincristine', id: 'Vinblastine Vincristine', },
                { name: 'Vindesine Vinorelbine', id: 'Vindesine Vinorelbine', },
                { name: 'Others', id: 'OthersChemotherapy', },
            ],
        }, {
            name: 'Vascular regulators',
            id: 'Vascular regulators',
            problem: [
                { name: 'Adrenaline', id: 'Adrenaline', },
                { name: 'Dobutamine', id: 'Dobutamine', },
                { name: 'Dopamine', id: 'Dopamine', },
                { name: 'Norepinephrine', id: 'Norepinephrine', },
                { name: 'Others', id: 'OthersVascular', },
            ],
        }, {
            name: 'Antibiotic (Acid) & (alkaline)',
            id: 'Antibiotic (Acid) & (alkaline)',
            problem: [
                { name: 'Acyclovir', id: 'Acyclovir', },
                { name: 'Aminophylline', id: 'Aminophylline', },
                { name: 'Amphotericin B', id: 'Amphotericin B', },
                { name: 'Cefotaxime', id: 'Cefotaxime', },
                { name: 'Ceftriaxone', id: 'Ceftriaxone', },
                { name: 'Co trimoxazole', id: 'Co trimoxazole', },
                { name: 'Erythromycin', id: 'Erythromycin', },
                { name: 'Ganciclovir', id: 'Ganciclovir', },
                { name: 'Liposomal Amphotericin B', id: 'Liposomal Amphotericin B', },
                { name: 'Penicillin', id: 'Penicillin', },
                { name: 'Vancomycin', id: 'Vancomycin', },
                { name: 'Others', id: 'OthersAntibiotic', },
            ],
        }, {
            name: 'Sedative drugs & Anticonvulsant',
            id: 'Sedative drugs & Anticonvulsant',
            problem: [
                { name: 'Diazepam', id: 'Diazepam', },
                { name: 'Phenobarbital', id: 'Phenobarbital', },
                { name: 'Thiopental', id: 'Thiopental', },
                { name: 'Others', id: 'OthersSedative', },
            ],
        }, {
            name: 'Arrythmia drugs & vasopressor',
            id: 'Arrythmia drugs & vasopressor',
            problem: [
                { name: 'Amiodarone', id: 'Amiodarone', },
                { name: 'Digoxin', id: 'Digoxin', },
                { name: 'Vasopressin', id: 'Vasopressin', },
                { name: 'Others', id: 'OthersArrythmia', },
            ],
        }, {
            name: 'Others',
            id: 'Others',
            problem: [
                { name: 'Others', id: 'Others', },
            ],
        }
    ];

    back = e => {
        e.preventDefault();
        // this.props.onPress();
        this.props.prevStep();
    };

    next = e => {
        if (this.validate()) {
            e.preventDefault();
            this.setState({ next: true });
        }
    }

    backFromResult = () => {
        this.setState({
            checkALL: false,
            next: false,
            // drug: '',
            // drugOther: '',
            // concenMG: '',
            // concenML: '',
            // volumn: '',
            // noti: '',
            // notiOther: '',
            // timeUsing: moment().format('DD MMM YYYY HH:mm'),
            // timeOccuring: moment().format('DD MMM YYYY HH:mm'),
            // fPickerVisible: false,
            // sPickerVisible: false,
        });
        // checkDrug = true;
        // checkDrugOther = true;
        // checkConcenMG = true;
        // checkConcenML = true;
        // checkVolumn = true;
        // checkNoti = true;
        // checkNotiOther = true;
        // checktimeUsing = true;
        // checktimeOccuring = true;
    }
    validate = () => {

        const { values } = this.props;

        if (values.drug == '') {
            checkDrug = false;
        } else {
            checkDrug = true;
        }

        if (values.drug == 'Others') {
            if (values.drugOther == '') {
                checkDrugOther = false;
            } else {
                checkDrugOther = true;
            }
        }

        if (values.concenMG == '') {
            checkConcenMG = false;
        } else {
            checkConcenMG = true;
        }

        if (values.concenML == '') {
            checkConcenML = false;
        } else {
            checkConcenML = true;
        }

        // if (values.volumn == '') {
        //     checkVolumn = false;
        // } else {
        //     checkVolumn = true;
        // }

        if (values.noti == '') {
            checkNoti = false;
        } else {
            checkNoti = true;
        }

        if (values.noti == 'Others') {
            if (values.notiOther == '') {
                checkNotiOther = false;
            }
            else {
                checkNotiOther = true;
            }
        }

        var check = checkDrug && checkDrugOther && checkConcenMG && checkConcenML && checkVolumn && checktimeUsing && checktimeOccuring && checkNoti && checkNotiOther;

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

    handleDate = e => {
        // console.log(e)
        months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
        m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        date = e.substring(0, 2) * 1
        index = m.indexOf(e.substring(3, 6))
        year = 543 + (e.substring(7, 11) * 1)
        month = months[index]
        time = e.substring(12, e.length)
        day = `${date} ${month} ${year} ${time}`
        return day;
    };


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

                        <Text style={styles.subheader}>ยา *</Text>
                        <View style={styles.formpicker}>
                            <SectionedMultiSelect
                                items={this.drugs}
                                uniqueKey="id"
                                selectText="ระบุ..."
                                subKey="problem"
                                showDropDowns={true}
                                readOnlyHeadings={true}
                                onSelectedItemsChange={(e) => { console.log(e); handleChange('drug', e) }}
                                selectedItems={values.drug}
                                expandDropDowns={false}
                                searchPlaceholderText="Search"
                                colors={{ subText: '#000000' }}
                                single={true}
                                styles={{
                                    container: {
                                        backgroundColor: 'white',
                                    },
                                    selectToggle: {
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
                        {this.renderError(checkDrug, 'กรุณาระบุยา')}

                        {values.drug.length != 0 &&  values.drug[0].includes('Others') ?
                            <View>
                                <Text style={styles.subheader}>โปรดระบุ </Text>
                                <TextInput
                                    style={[styles.textinput]}
                                    placeholder='ยา'
                                    returnKeyType="next"
                                    // keyboardType="number-pad"
                                    onSubmitEditing={() => this.concenMG.focus()}
                                    maxLength={20}
                                    onChangeText={(e) => handleChange('drugOther', e)}
                                    defaultValue={values.drugOther}
                                    autoCorrect={false}
                                />
                            </View> : <View></View>
                        }
                        {this.renderError(checkDrugOther, 'กรุณาระบุยา')}

                        <Text style={styles.subheader}>Dose (mg/ml) *</Text>
                        <View style={styles.concentrationArea}>
                            <TextInput
                                style={[styles.textinput, { width: 150 }]}
                                placeholder='mg'
                                returnKeyType="next"
                                keyboardType="number-pad"
                                ref={(input) => this.concenMG = input}
                                onSubmitEditing={() => this.concenML.focus()}
                                maxLength={5}
                                onChangeText={(e) => handleChange('concenMG', e)}
                                defaultValue={values.concenMG}
                                autoCorrect={false}
                            />
                            <Text style={styles.subheader}>/</Text>
                            <TextInput
                                style={[styles.textinput, { width: 150 }]}
                                placeholder='ml'
                                returnKeyType="next"
                                keyboardType="number-pad"
                                ref={(input) => this.concenML = input}
                                onSubmitEditing={() => this.volumn.focus()}
                                maxLength={5}
                                onChangeText={(e) => {
                                    handleChange('concenML', e)
                                }}
                                defaultValue={values.concenML}
                                autoCorrect={false}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 0.5 }}>
                                {this.renderError(checkConcenMG, 'กรุณาระบุ Dose (mg)')}
                            </View>
                            <View style={{ flex: 0.5 }}>
                                {this.renderError(checkConcenML, 'กรุณาระบุ Dose (ml)')}
                            </View>
                        </View>



                        <Text style={styles.subheader}>ปริมาณที่ได้รับ (ml)</Text>
                        <TextInput
                            style={[styles.textinput, { width: 150 }]}
                            placeholder='ปริมาณที่ได้รับ (ml)'
                            returnKeyType="next"
                            keyboardType="number-pad"
                            maxLength={5}
                            onChangeText={(e) => handleChange('volumn', e)}
                            defaultValue={values.volumn}
                            autoCorrect={false}
                            ref={(input) => this.volumn = input}
                            // onSubmitEditing={() => this.volumn.focus()}
                        />
                        {this.renderError(checkVolumn, 'กรุณาระบุปริมาณที่ได้รับ')}


                        <Text style={styles.subheader}>เวลาที่เริ่มใช้ยา *</Text>
                        <DateTimePicker
                            isVisible={this.state.fPickerVisible}
                            onConfirm={(e) => {
                                e = moment(e).format('DD MMM YYYY HH:mm');
                                handleChange('timeUsing', e)
                                this.setState({ fPickerVisible: false })
                            }}
                            onCancel={() => { this.setState({ fPickerVisible: false }) }}
                            mode={'datetime'}
                            maximumDate={new Date()}
                        />
                        <Button
                            icon={
                                <Icon
                                    name='calendar'
                                    type='font-awesome'
                                    color='#165d5a'
                                />
                            }
                            title={this.handleDate(values.timeUsing)}
                            // title={(values.timeUsing).toString()}
                            buttonStyle={[styles.backBtn, { width: 250 }, { height: 40 }]}
                            type="outline"
                            onPress={() => this.setState({ fPickerVisible: true })}
                            titleStyle={{ color: 'black', paddingLeft: 10 }}
                        >
                        </Button>


                        <Text style={styles.subheader}>เวลาที่เกิด extravasation *</Text>
                        <DateTimePicker
                            isVisible={this.state.sPickerVisible}
                            onConfirm={(e) => {
                                e = moment(e).format('DD MMM YYYY HH:mm');
                                handleChange('timeOccuring', e)
                                this.setState({ sPickerVisible: false })
                            }}
                            onCancel={() => { this.setState({ sPickerVisible: false }) }}
                            mode={'datetime'}
                            maximumDate={new Date()}
                        />
                        <Button
                            icon={
                                <Icon
                                    name='calendar'
                                    type='font-awesome'
                                    color='#165d5a'
                                />
                            }
                            title={this.handleDate(values.timeOccuring)}
                            // title={(values.timeOccuring).toString()}
                            buttonStyle={[styles.backBtn, { width: 250 }, { height: 40 }]}
                            type="outline"
                            onPress={() => this.setState({ sPickerVisible: true })}
                            titleStyle={{ color: 'black', paddingLeft: 10 }}
                        >
                        </Button>

                        <Text style={styles.subheader}>แจ้งเตือนสำหรับการถ่ายครั้งต่อไป *</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Dropdown
                                data={[
                                    { label: 'ไม่ต้องการ', value: '0' },
                                    { label: '1 ชั่วโมง', value: '1' },
                                    { label: '2 ชั่วโมง', value: '2' },
                                    { label: '4 ชั่วโมง', value: '4' },
                                    { label: 'อื่น ๆ', value: 'Others' },
                                ]}
                                value={values.noti}
                                itemCount={4}
                                dropdownOffset={{ top: 10 }}
                                onChangeText={(e) => handleChange('noti', e)}
                                containerStyle={[styles.dropdown, { width: 120 }]}
                            />
                            {values.noti == 'Others' ?

                                <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                                    <TextInput
                                        style={[styles.textinput, { width: 90 }]}
                                        placeholder='ระบุจำนวน'
                                        returnKeyType="next"
                                        keyboardType="number-pad"
                                        // onSubmitEditing={() => this.ageInput.focus()}
                                        maxLength={2}
                                        onChangeText={(e) => handleChange('notiOther', e)}
                                        defaultValue={values.notiOther}
                                        autoCorrect={false}
                                    />
                                    <Text style={[styles.subheader, { fontWeight: 'normal', marginLeft: 20 }]}>ชั่วโมง</Text>

                                </View> : <View></View>}

                        </View>
                        {this.renderError(checkNoti, 'กรุณาระบุเวลาสำหรับการแจ้งเตือนครั้งถัดไป')}
                        {this.renderError(checkNotiOther, 'กรุณาระบุเวลาสำหรับการแจ้งเตือนครั้งถัดไป')}


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
        //     <Pick onPress={this.backFromResult.bind(this)} values={this.state} onPressToLogin={this.props.onPressToLogin} onPressToHome={this.props.onPressToHome}></Pick>
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
        color: '#005daa',
        marginTop: 15,
    },
    textinput: {
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#6a6e78',
        paddingLeft: 5,
        borderRadius: 5,
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
        // borderWidth: 0.55,
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
    backBtn: {
        // backgroundColor: '#f8f8ec',
        borderWidth: 1,
        borderColor: '#6a6e78',
    },
});