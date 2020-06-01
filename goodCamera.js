import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, style, captureButton, AsyncStorage } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Dimensions } from 'react-native'
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import isIPhoneX from 'react-native-is-iphonex';
import Result from './Result.js'
import * as FileSystem from 'expo-file-system';
import Fake from './Fakeloading.js'
import Home from './Home.js'
import moment from 'moment';
import Show from './ShowHistory.js'
import { Notifications } from 'expo'
import Constants from 'expo-constants'


var FormData = require('form-data');

export default class goodCamera extends React.Component {

    constructor(props) {
        super(props);
        dictUri = [];
        dictResult = [];
        // all = '';
        order = 0;
        position = this.props.position;
        temp = Date.now();
        allTime = [];
        currentImg = this.props.path;
    }

    state = {
        permissionsGranted: null,
        type: 'back',
        path: this.props.path, // store uri of photo
        aiResult: null,
        whatType: false,
        values: this.props.values,
        done: false,
        allData: [],
        notification: {},
        gogo: false,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });

        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            console.log(e, 'Directory exists');
        });

        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        ); 
    }

    _handleNotification = notification => {
        this.setState({ notification: notification });
    };


    backFromResult = () => {
        this.setState({
            permissionsGranted: 'granted',
            type: 'back',
            path: this.props.path, // store uri of photo
            whatType: false,
            values: this.props.values,
            done: false,
            allData: [],
            notification: {},
        });
        dictUri = [];
        // all = '';
        order = 0;
        position = this.props.position;
        temp = Date.now();
        allTime = [];
        currentImg = null;
    }

    back = e => {
        e.preventDefault();
        this.props.onPress();
    };

    getThaiPosition = (p) => {
        thai = ['มือซ้าย', 'มือขวา', 'แขนซ้าย', 'แขนขวา', 'ขาซ้าย', 'ขาขวา', 'เท้าซ้าย', 'เท้าขวา',]
        eng = ['Left Hand', 'Right Hand', 'Left Arm', 'Right Arm', 'Left Leg', 'Right Leg', 'Left Foot', 'Right Foot',]
        index = eng.indexOf(p)
        po = thai[index]
        console.log(po)
        return po
    }



    renderTopBar = () =>
        <View style={styles.topBar}>
            <TouchableOpacity style={styles.smileFace} >
            </TouchableOpacity>

            <View style={styles.smileFace} >
                <Text style={styles.icon}>{this.getThaiPosition(position)}</Text>
            </View>

            <TouchableOpacity style={styles.smileFace} >
            </TouchableOpacity>


        </View>



    renderBottomBar = () =>
        <View style={styles.bottomBar}>
            <TouchableOpacity
                style={{ alignSelf: 'center', marginBottom: 10 }}
                onPress={this.snapPhoto.bind(this)}>
                <Ionicons name="ios-radio-button-on" size={90} color="white" />
            </TouchableOpacity>
        </View>


    async snapPhoto() {
        // console.log(this.state.faces);

        if (this.camera) {
            console.log('Taking photo');
            const data = await this.camera.takePictureAsync();
            // this.setState({ path: data.uri });

            let p = position.replace(/\s/g, "");

            await FileSystem.copyAsync({
                from: data.uri,
                to: `${FileSystem.documentDirectory}photos/${p}_${temp}.jpg`
            });
            currentImg = `${FileSystem.documentDirectory}photos/${p}_${temp}.jpg`;
            this.setState({ path: `${FileSystem.documentDirectory}photos/${p}_${temp}.jpg` });
        }
    }

    


    async sendLocalNotification({ time }) {
        let value = this.state.values;
        const localNotification = {
            title: "please take a photo",
            body: 'กรุณาถ่ายรูปติดตามอาการของผู้ป่วยหมายเลข ' + value.hn,
            ios: {
                sound: true,
                _displayInForeground: true,
            },
            android: {
                sound: true,
            }
        }

        const schedulingOptions = {
            time,
            repeat: 'year'
        }

        await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)

    }

    saveData = async () => {

        let value = this.state.values;
        // this.uploadForm(value)

        if (value.datetime !== undefined) {
            let i = 0
            while (i < value.datetime.length) {
                allTime.push(value.datetime[i])
                i = i + 1
            }

        }

        allTime.push(temp.toString())

        if (value.result === undefined) {
            value.result = 'NORMAL'
        }


        if (value.result == 'MILD') {
            if (value.noti != 0) {
                value.noti = 8
            }
            else if (value.notiOther != '') {
                value.notiOther = 8
            }
        }
        if (value.result == 'MODERATE') {
            if (value.noti != 0) {
                value.noti = 8
            }
            else if (value.notiOther != '') {
                value.notiOther = 8
            }
        }
        if (value.result == 'SEVERE') {
            if (value.noti != 0) {
                value.noti = 4
            }
            else if (value.notiOther != '') {
                value.notiOther = 4
            }
        }

        console.log('sendLocalNotification')
        if (value.noti != 0) {
            // set noti
            const next = (value.noti * 60 * 60000) - (5 * 60000)
            // const next = 10000
            const expiredDate = new Date().getTime() + next
            this.sendLocalNotification({ time: expiredDate })
        }
        else if (value.notiOther != '') {
            // const next = 10000
            const next = (value.notiOther * 60 * 60000) - (5 * 60000)
            const expiredDate = new Date().getTime() + next
            this.sendLocalNotification({ time: expiredDate })
        }



        let obj = {
            id: value.hn,
            age: value.age,
            time: allTime,
            drug: value.drug,
            drugOther: value.drugOther,
            noti: value.noti,
            notiOther: value.notiOther,
            dictUri: dictUri,
            finish: false,
            result: value.result,
            allResult: dictResult,
            gender: value.gender,
            welfare: value.welfare,
            diagnosis: value.diagnosis,
            diagOther: value.diagOther,
            cor: value.cor,
            corOther: value.corOther,
            concenMG: value.concenMG,
            concenML: value.concenML,
            volumn: value.volumn,
            timeUsing: value.timeUsing,
            timeOccuring: value.timeOccuring
        }
        try {
            // AsyncStorage.clear()
            if (value.datetime !== undefined) {
                console.log(value.datetime[0])
                await AsyncStorage.setItem(value.datetime[0], JSON.stringify(obj));
            } else {
                await AsyncStorage.setItem(temp.toString(), JSON.stringify(obj));
            }


            // let item =  await AsyncStorage.getItem(temp.toString());
            // let items = JSON.parse(item);     

        } catch (error) {
            alert(error);
        }
        this.setState({ gogo: true })


    }

    renderMarks = () => {

        return (
            <View style={styles.maskBar} >
                {this.renderImage()}
            </View>
        );

    }

    renderImage = () => {

        switch (position) {
            case 'Left Hand': img = require('./Images/hand.png'); break;
            case 'Right Hand': img = require('./Images/hand.png'); break;
            case 'Left Arm': img = require('./Images/arm.png'); break;
            case 'Right Arm': img = require('./Images/arm.png'); break;
            case 'Left Leg': img = require('./Images/arm.png'); break;
            case 'Right Leg': img = require('./Images/arm.png'); break;
            case 'Left Foot': img = require('./Images/foot.png'); break;
            case 'Right Foot': img = require('./Images/foot.png'); break;
        }
        return (
            <View style={styles.imgBar} >
                <Image source={img} resizeMode='stretch' style={styles.mask} />
            </View>
        );
    }





    renderNoPermissions = () =>
        <View style={styles.noPermissions}>
            <Text style={{ color: 'white' }}>
                Camera permissions not granted - cannot open camera preview.
  </Text>
        </View>



    renderCamera = () =>
        <View style={{ flex: 1 }}>
            {this.renderTopBar()}
            <Camera
                ref={ref => {
                    this.camera = ref;
                }}
                style={styles.camera}
                type={this.state.type}
                onMountError={this.handleMountError}
                ratio={'16:9'}
            >

                {/* {this.renderSecondTopBar()} */}
                {this.renderMarks()}


            </Camera>
            {this.renderBottomBar()}

        </View>

    donePatient = async (key) => {
        let item = await AsyncStorage.getItem(key);
        let data = JSON.parse(item);
        // console.log(data)
        data.finish = true
        await AsyncStorage.mergeItem(key, JSON.stringify({ finish: true }))

    }

    // donePatient = async (key) => {
    //     let item = await AsyncStorage.getItem(key);
    //     let data = JSON.parse(item);
    //     // console.log(data)
    //     let i = 0
    //     while (i < data.dictUri.length) {
    //         await FileSystem.deleteAsync(`${data.dictUri[i].value}`)
    //         i = i + 1

    //     }
    //     await AsyncStorage.removeItem(key);
    // }

    // pressCamera = s => {
    //     this.setState({ selects: s, goCamera: true })
    // }

    pressOK = () => {
        // this.uploadImage(this.state.path,id,eye)
        this.setState({ done: true });
    }




    render() {


        if (this.state.gogo) {
            console.log('Good camera')
            console.log(this.props.pID)
            return (
                <Fake
                    key={allTime[0]}
                    dictUri={dictUri}
                    values={this.state.values}
                    donePatient={this.donePatient}
                    hn={this.state.values.hn}
                    age={this.state.values.age}
                    datetime={allTime}
                    result={this.state.values.result}
                    allResult={dictResult}
                    uri={dictUri}
                    drug={this.state.values.drug}
                    finish={false}
                    drugOther={this.state.values.drugOther}
                    noti={this.state.values.noti}
                    notiOther={this.state.values.notiOther}
                    gender={this.state.values.gender}
                    welfare={this.state.values.welfare}
                    diagnosis={this.state.values.diagnosis}
                    diagOther={this.state.values.diagOther}
                    cor={this.state.values.cor}
                    corOther={this.state.values.corOther}
                    concenMG={this.state.values.concenMG}
                    concenML={this.state.values.concenML}
                    volumn={this.state.values.volumn}
                    timeUsing={this.state.values.timeUsing}
                    timeOccuring={this.state.values.timeOccuring}
                    onPress={this.props.onPressToHome}
                    pressCamera={this.backFromResult.bind(this)}
                    onPressToHome={this.props.onPressToHome}
                    path={currentImg}
                    pID={this.props.pID}
                >
                </Fake>
                // <Show
                //     key={allTime[0]}
                //     dictUri={dictUri}
                //     values={this.state.values}
                //     donePatient={this.donePatient}
                //     hn={this.state.values.hn}
                //     datetime={allTime}
                //     result={this.state.values.result}
                //     allResult={dictResult}
                //     uri={dictUri}
                //     drug={this.state.values.drug}
                //     finish={false}
                //     drugOther={this.state.values.drugOther}
                //     noti={this.state.values.noti}
                //     notiOther={this.state.values.notiOther}
                //     gender={this.state.values.gender}
                //     welfare={this.state.values.welfare}
                //     diagnosis={this.state.values.diagnosis}
                //     diagOther={this.state.values.diagOther}
                //     cor={this.state.values.cor}
                //     corOther={this.state.values.corOther}
                //     concenMG={this.state.values.concenMG}
                //     concenML={this.state.values.concenML}
                //     volumn={this.state.values.volumn}
                //     timeUsing={this.state.values.timeUsing}
                //     timeOccuring={this.state.values.timeOccuring}
                //     onPress={this.props.onPressToHome}
                //     pressCamera={this.backFromResult.bind(this)}
                //     onPressToHome={this.props.onPressToHome}
                // >
                // </Show>
            )

        }



        if (this.state.done || this.props.noConfirm) {

            if (this.state.values.allResult !== undefined) {
                let u = dictResult.concat(this.state.values.allResult)
                dictResult = u

            }

            // dictResult.push({
            //     key: position,
            //     value: this.state.aiResult
            // });


            if (this.state.values.uri !== undefined) {
                let u = dictUri.concat(this.state.values.uri)
                dictUri = u
                // dictUri.push({
                //     key: position,
                //     value: this.state.values.uri[0].value
                // });    
            }

            dictUri.push({
                key: position,
                value: this.state.path
            });
            // console.log(dictUri)
            this.saveData();

        }



        if (this.state.path === undefined) {
            const cameraScreenContent = this.state.permissionsGranted
                ? this.renderCamera()
                : this.renderNoPermissions();
            const content = cameraScreenContent;

            return (
                <View style={styles.container}>
                    {content}
                </View>
            );
        }

        else {
            // show a photo when press takePhoto button
            return (
                <View style={styles.container}>



                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.smileFace} >
                        </TouchableOpacity>

                        <View style={styles.smileFace} >
                            <Text style={styles.icon}>{this.getThaiPosition(position)}</Text>
                        </View>

                        <TouchableOpacity style={styles.smileFace} >
                        </TouchableOpacity>


                    </View>

                    <View style={styles.camera}>
                        <Image
                            source={{ uri: this.state.path }}
                            style={styles.preview}
                        />
                    </View>


                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            style={styles.previewcancleButton}
                            onPress={() => {
                                { this.setState({ path: undefined }) };
                            }}
                        >
                            <Text style={styles.cancleText}> ถ่ายใหม่ </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.previewokButton}
                            onPress={this.pressOK}
                        >
                            <Text style={styles.upText}> ต่อไป </Text>
                        </TouchableOpacity>
                    </View>




                </View>
            );

        }


    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    bottomBar: {
        //paddingTop: isIPhoneX ? 500 : 350,
        paddingBottom: isIPhoneX ? 30 : 20,
        backgroundColor: 'black',
        justifyContent: 'space-around',
        flex: 0.3,
        flexDirection: 'row',
    },
    previewbottomBar: {
        //paddingTop: isIPhoneX ? 500 : 350,
        paddingBottom: isIPhoneX ? 10 : 5,
        backgroundColor: 'black',
        justifyContent: 'center',
        flex: 0.2,
        flexDirection: 'row',
    },
    upButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 144,
        height: 42,
    },
    cancleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 144,
        height: 42,
    },
    okButton: {
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 5,
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 70,
        height: 42,
    },
    previewcancleButton: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 5,
        // position: 'absolute',
        // bottom: 40,
        // left: 20,
        width: 144,
        height: 42,
    },
    previewokButton: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 5,
        // position: 'absolute',
        // bottom: 70,
        // right: 20,
        width: 144,
        height: 42,
    },
    selectButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: isIPhoneX ? 30 : 30,
        // position: 'absolute',
        // bottom: 70,
        // left: 20,
        width: 330,
        height: 60,
    },

    select: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderRadius: 5,
        top: 50,
        left: 50,
    },
    upText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    topBar: {
        paddingTop: 10,
        flex: 0.2,
        backgroundColor: '#005daa',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    previewtopBar: {
        flex: 0.13,
        backgroundColor: '#005daa',
        flexDirection: 'column',
        alignItems: 'center',
    },
    secondBar: {
        flex: 0.03,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    maskBar: {
        flex: 0.7,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    mask: {
        height: Dimensions.get('window').height * 0.64,
        width: Dimensions.get('window').width,

    },

    noPermissions: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    gallery: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    smileFace: {
        // marginTop: 60,
        paddingTop: isIPhoneX ? 20 : 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    previewsmileFace: {
        paddingTop: isIPhoneX ? 20 : 10,
        paddingRight: isIPhoneX ? 40 : 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    okBar: {

        flex: 0.13,
        paddingTop: 30,
        backgroundColor: '#3d1c02',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    nextButton: {
        // marginTop: 30,
        alignSelf: 'flex-end',
    },
    backBotton: {
        marginTop: 50,
        marginLeft: 5,
    },
    textToggleButton: {
        paddingLeft: 25,
        flex: 0.25,
        height: 50,
        marginHorizontal: 2,
        marginBottom: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    autoFocusLabel: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bottomButton: {
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },

    newPhotosDot: {
        position: 'absolute',
        top: 0,
        right: -5,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4630EB'
    },
    options: {
        position: 'absolute',
        bottom: 80,
        left: 30,
        width: 200,
        height: 160,
        backgroundColor: '#000000BA',
        borderRadius: 4,
        padding: 10,
    },
    detectors: {
        flex: 0.5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    pictureQualityLabel: {
        fontSize: 10,
        marginVertical: 3,
        color: 'white'
    },
    pictureSizeContainer: {
        flex: 0.5,
        alignItems: 'center',
        paddingTop: 10,
    },
    pictureSizeChooser: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    pictureSizeLabel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    preview: {
        // flex: 0.7,

        height: Dimensions.get('window').height * 0.64,
        width: Dimensions.get('window').width,
    },
    cancel: {
        position: 'absolute',
        left: 40,
        top: 60,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 17,
    },
    ok: {
        position: 'absolute',
        right: 40,
        top: 60,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 17,
    },

    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
    },
    icon: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        alignSelf: "center",
    },
    iconNext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        alignSelf: "center",
    },
    textMessage: {
        alignSelf: "center",
        fontSize: 15,
        color: 'blue',

    }

});