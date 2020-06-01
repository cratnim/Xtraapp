import React from 'react';
import { Button } from 'react-native-elements';
import { Alert, Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { Ionicons, MaterialIcons, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import isIPhoneX from 'react-native-is-iphonex';
import Drug from './Drug.js'
import moment from 'moment';
import Done from './Done.js'
import Camera from './goodCamera.js'
import ShowImage from './Image.js';
import Picker from './Picker.js'

const pictureSize = 150;
export default class ShowHistory extends React.Component {

    state = {
        goDrug: false,
        donepatient: false,
        length: 0,
        select: [],
        touch: [],
    }

    back = e => {
        e.preventDefault();
        this.props.onPress();
    };

    backFromResult = () => {
        this.setState({
            goDrug: false,
            donepatient: false,
            length: 0,
            select: [],
            touch: [],
        });
    }



    //ฟังชั่นกดแล้วจะไปหน้ากล้องพร้อมส่งข้อมูลไป
    pressCamera = e => {
        console.log(this.props)
        select = {
            hn: this.props.hn,
            age: this.props.age,
            datetime: this.props.datetime,
            uri: this.props.uri,
            drug: this.props.drug,
            drugOther: this.props.drugOther,
            noti: this.props.noti,
            notiOther: this.props.notiOther,
            finish: this.props.finish,
            gender: this.props.gender,
            welfare: this.props.welfare,
            diagnosis: this.props.diagnosis,
            diagOther: this.props.diagOther,
            cor: this.props.cor,
            corOther: this.props.corOther,
            concenMG: this.props.concenMG,
            concenML: this.props.concenML,
            volumn: this.props.volumn,
            timeUsing: this.props.timeUsing,
            timeOccuring: this.props.timeOccuring,
            result: this.props.result,
            allResult: this.props.allResult,
        }
        this.setState({ select })
        // this.props.pressCamera(select)
    }



    donePatient = () => {
        Alert.alert(
            'ต้องการปิดเคสหรือไม่ ?',
            '',
            [
                { text: 'ใช่', onPress: () => this.pressokDone() },
                { text: 'ไม่', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    activatePatient = () => {
        if (this.props.finish) {
            Alert.alert(
                'ต้องการเปิดเคสหรือไม่?',
                '',
                [
                    { text: 'ใช่', onPress: () => this.pressokactivatePatient() },
                    { text: 'ไม่', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
        else {


        }
    }

    pressokactivatePatient() {
        this.props.activatePatient(this.props.datetime[0])
        this.props.onPress();
    }


    pressokDone() {
        this.props.donePatient(this.props.datetime[0])
        this.setState({ donepatient: true });
    }

    gogoDrug = () => {
        this.setState({ goDrug: true })
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


    renderImage = (u, index) => {
        const { hn, datetime, result, uri, drug, allResult } = this.props;
      
        console.log(allResult) //undefind now
        
        // console.log('renderImage')
        // console.log(allResult)

        // console.log(allResult)
        return (
            <TouchableOpacity
                key={index}
                style={styles.pictureWrapper}
                onPress={() => { this.setState({ touch: index }) }}
                activeOpacity={1}
            >
                 <Text style={styles.time}><Text style={{fontWeight: 'bold'}}>ถ่ายครั้งที่ {length - index} เมื่อ : </Text>{"\n"}{this.handleDate((moment(parseInt(datetime[length - index - 1])).format('DD MMM YYYY HH:mm')))}</Text>
                <Text style={styles.time}><Text style={{fontWeight: 'bold'}}>ผลลัพธ์ : </Text>{allResult[length - index - 1].value} </Text>


                <Image
                    style={styles.picture}
                    source={{ uri: u.value }}
                />
            </TouchableOpacity>

            // <View style={styles.historyBar}>
            //     <Text style={styles.subheader}>ถ่ายครั้งที่ {index + 1} เมื่อ : {(moment(parseInt(datetime[index])).format('DD MMM YYYY HH:mm')).toString()}</Text>
            //     <Image
            //         style={styles.img}
            //         source={{ uri: u.value }}
            //         resizeMode='contain'
            //     />
            // </View>
        );
    }


    render() {
        const { hn, datetime, result, uri, drug, drugOther, finish, allResult } = this.props;
        console.log('ShowHistory')
        console.log(this.props.pID)
        let p = this.props.pID.result === undefined ? this.props.pID : this.props.pID.result.id;

        uri.reverse()
        length = uri.length
        // console.log(drug)
        const d = drug[0].includes('Others') ? drugOther : drug;

        if (this.state.goDrug) {
            // console.log(result)
            return (
                <Drug onPress={this.backFromResult.bind(this)} pID={p} sendDrug={drug} result={result} ></Drug>
            )
        }
        if (this.state.donepatient) {
            return (
                <Done onPress={this.backFromResult.bind(this)} pID={p} goHome={this.props.onPress}></Done>
            )
        }

        if (this.state.touch.length != 0) {
            return (
                <ShowImage images={uri} datetime={datetime} index={this.state.touch} allResult={allResult} onPress={this.backFromResult.bind(this)}></ShowImage>
            );
        }

        if (this.state.select.length != 0) {
            console.log(p)
            return (
                <Picker
                    values={this.state.select}
                    position={this.state.select.uri[0].key}
                    onPressToHome={this.props.onPressToHome}
                    pID={p}
                    onPress={this.backFromResult.bind(this)}
                >
                </Picker>
                //     <Camera
                //         values={this.state.select}
                //         position={this.state.select.uri[0].key}
                //         onPressToHome={this.props.onPressToHome}
                //     >
                //     </Camera>
            );
        }

        var c = ''
        switch (result) {
            case 'NORMAL':
                c = 'green'
                break;
            case 'MILD':
                c = '#e49623'
                break;
            case 'MODERATE':
                c = '#e46223'
                break;
            case 'SEVERE':
                c = '#f44336'
                break;
            default:
                c = 'gray'
                break;
        }

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backBtn} onPress={this.back} >
                        <MaterialIcons name="arrow-back" size={35} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.header}>RESULT</Text>

                    <TouchableOpacity style={styles.button} onPress={this.pressCamera}>
                        <MaterialCommunityIcons name="image-plus" size={25} color="white"></MaterialCommunityIcons>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.button} onPress={finish ? this.activatePatient : this.donePatient}>
                        <MaterialIcons name="done" size={25} color="white"></MaterialIcons>
                        {finish ? <Text style={{ color: 'white' }}>เปิดเคส</Text> : <Text style={{ color: 'white' }}>ปิดเคส</Text>}
                    </TouchableOpacity> */}
                </View>

                <ScrollView contentComponentStyle={styles.subContainer}>


                    <TouchableOpacity style={styles.bar} onPress={this.gogoDrug}>
                        <View style={styles.a}>
                            <Text style={styles.h2}>{hn}</Text>
                            <Text style={[styles.subheader]}>{d}</Text>
                        </View>
                        <View style={styles.b}>
                            <Text style={[styles.resultText2, { color: c }]}>{result}</Text>
                            <Text style={styles.tipText2}>คำแนะนำในการดูแล >></Text>
                        </View>
                    </TouchableOpacity>



                    <ScrollView contentComponentStyle={{ flex: 1 }}>
                        <View style={styles.pictures}>

                            {uri.map(this.renderImage)}
                        </View>
                    </ScrollView>


                    <TouchableOpacity style={styles.close} onPress={this.donePatient}>
                        <Ionicons name="md-close-circle-outline" size={25}></Ionicons>
                        <Text style={styles.closeText}>ปิดเคส</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F7F4',
        flexDirection: 'column',
        flex: 1,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#F5F7F4',
    },
    topBar: {
        backgroundColor: '#005daa',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: isIPhoneX ? 60 : 40,
        // marginBottom: 10,
        paddingHorizontal: 15,
        // flex: 0.15
        paddingBottom: 10,
    },

    historyBar: {
        margin: 10,
        marginLeft: 20,
    },
    header: {
        fontSize: 18,
        color: 'white',
        // marginTop: 25,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    newButton: {
        alignSelf: 'center',
        borderRadius: 10,
        width: 300,
        height: 50,
        backgroundColor: '#B6452C',
        marginBottom: 70,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        // marginTop: 10,
        flexWrap: 'wrap',
        flex: 1
    },
    subheader: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black',
        // marginTop: 10,
    },

    resultBar: {
        backgroundColor: 'green',
        alignItems: 'center',
        // height: 80,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    resultText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        marginTop: 10,

    },
    backBtn: {

    },
    button: {
        // paddingVertical: 10,
        alignItems: 'center',
    },
    detail: {
        flexDirection: 'column',
        // borderColor: '#b3b3ba',
        // borderWidth: 1.5,
        // backgroundColor: 'grey',
        margin: 10,
        // marginHorizontal: 20,
        alignItems: 'center',
    },
    tipText: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        elevation: 1,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    tipText2: {
        fontSize: 12,
        // fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    tipBar: {
        marginBottom: 10,
        // width: 100,
        // flex: 0.5,
        justifyContent: 'center',
        flexDirection: 'row',
        // alignItems: 'center',
        elevation: 1,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        // backgroundColor: '#F5F7F4',
    },
    pictures: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 8,
        // backgroundColor: 'red',
    },
    picture: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 55,
        resizeMode: 'cover',
    },
    pictureWrapper: {
        // width: pictureSize,
        height: 270,
        width: Dimensions.get('window').width / 2 - 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 5,
        // borderColor: 'black',
        // borderWidth: 1,
    },
    time: {
        color: 'black',
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'left',
        marginLeft: 5,
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 1,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS

    },
    a: {
        // backgroundColor: 'red',
        margin: 10,
        // marginHorizontal: 20,
        justifyContent: 'center',
        flex: 0.5,
    },
    b: {
        // backgroundColor: 'green',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5,
    },
    resultText2: {
        fontSize: 25,
        fontWeight: 'bold',
        // marginBottom: 10,
        color: 'green',
        // marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 0.5,
        // textShadowOpacity: 1, // IOS
    },
    closeText: {
        fontSize: 18,
        // fontWeight: 'bold',
        // marginBottom: 10,
        color: 'black',
        paddingLeft: 10
    },
    close: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        // borderColor: '#bcbdb8', 
        borderColor: 'black',
        marginVertical: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 0.2,
        // backgroundColor: 'red',
        marginTop: 100
    }

});