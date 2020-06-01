import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, TouchableOpacity, StyleSheet, Image, style, captureButton, AsyncStorage, ScrollView, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Form from './Form.js';
import History from './History.js';
import Photo from './Photo.js';
import Upcoming from './Upcoming.js';
import isIPhoneX from 'react-native-is-iphonex';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';
import Done from './Dodo.js';
import { Notifications } from 'expo'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';


export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        goHistory: false,
        goForm: false,
        goUpcoming: false,
        selects: [],
        id: [],
        upId: [],
        goCamera: false,
        show: false,
        numberUpcoming: 0,
        goDone: false,
        notification: {},
    };

    componentDidMount = async () => {
        this.registerForPushNotificationsAsync()
        this.showyoyo()

        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );

        // const expiredDate = new Date().getTime() + 12000 
        // this.sendLocalNotification({ time: expiredDate })

    };

    _handleNotification = notification => {
        this.setState({ notification: notification });
    };


    async registerForPushNotificationsAsync() {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
            let finalStatus = existingStatus
            console.log(finalStatus)
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!')
                return
            }

            // Get the token that identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            console.log(token);
        }
    }


    async sendLocalNotification({ time }) {
        const localNotification = {
            title: "Time's up",
            body: 'Please take a photo',
            ios: {
                sound: true,
            },
            android:  {
                sound: true, 
            }
        }

        const schedulingOptions = {
            time
        }

        await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)

    }

    showyoyo = async () => {
        const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
        this.setState({ photos });
        const allid = [];
        await AsyncStorage.getAllKeys(async (err, keys) => {
            await AsyncStorage.multiGet(keys, async (err, stores) => {
                stores.map(async (result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];

                    if (key.length == 13) {
                        allid.push(key);
                    }
                });
            });
            this.setState({ id: allid });
            this.fetchUpcoming()
        });

    }

    fetchUpcoming = async () => {
        const allid = [];
        let i = 0
        while (i < this.state.id.length) {
            let item = await AsyncStorage.getItem(this.state.id[i]);
            let data = JSON.parse(item);
            if (!data.finish) {
                if (data.notiOther != '') {
                    if (moment().diff(moment(parseInt(data.time[data.time.length - 1])), 'minutes') >= (parseInt(data.notiOther) * 60) - 5) {
                        if (data.noti == 0) {

                        }
                        else {
                            allid.push(this.state.id[i])
                        }
                    }
                }
                else {
                    if (moment().diff(moment(parseInt(data.time[data.time.length - 1])), 'minutes') >= (parseInt(data.noti) * 60) - 5) {
                        if (data.noti == 0) {

                        }
                        else {
                            allid.push(this.state.id[i])
                        }
                    }
                }
            }
            i = i + 1
        }
        this.setState({ upId: allid });
    }

    backFromResult = () => {
        this.setState({
            goHistory: false,
            goForm: false,
            goUpcoming: false,
            historys: [],
            selects: [],
            id: [],
            upId: [],
            goCamera: false,
            show: false,
            numberUpcoming: 0,
            goDone: false,
            notification: {},
        });
        this.showyoyo()
    }

    showSelect = s => {
        this.setState({ selects: s })
    }

    toggleForm = () => {
        this.setState({ goForm: true });
    }

    toggleHistory = () => {
        this.setState({ goHistory: true });
    }

    toggleDone = () => {
        this.setState({ goDone: true });
    }

    toggleUpcoming = () => {
        this.setState({ goUpcoming: true })
    }

    renderResult = key =>
        <Photo
            key={key}
            timestamp={key}
            showSelect={this.showSelect}
            pressCamera={this.pressCamera}
        />;

    renderUpcoming = key =>
        <Upcoming
            key={key}
            timestamp={key}
            showSelect={this.showSelect}
            pressCamera={this.pressCamera}
        />;

    pressCamera = s => {
        this.setState({ selects: s, goCamera: true })
    }

    async clearAll() {
        const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
        photos.map(this.deleteAllPhoto)
        AsyncStorage.clear();
    }

    deleteAllPhoto = async (fileName) => {
        await FileSystem.deleteAsync(`${PHOTOS_DIR}/${fileName}`)
    }

    donePatient = async (key) => {
        let item = await AsyncStorage.getItem(key);
        let data = JSON.parse(item);
        data.finish = true;
        // console.log('Home' + data)
        await AsyncStorage.setItem(key, JSON.stringify(data))
    }

    pressokactivatePatient = async (key) => {
        let item = await AsyncStorage.getItem(key);
        let data = JSON.parse(item);
        data.finish = false;
        // console.log('Home' + data)
        await AsyncStorage.setItem(key, JSON.stringify(data))
    }

    checkUpcoming = (e) => {
        this.setState({ numberUpcoming: e })
    }

    renderNoData = () =>
        <View style={styles.noData}>
            <Text style={styles.noDataText}>- ไม่มีข้อมูล -</Text>
        </View>

    render() {
        // clear all photo and data
        // this.clearAll()

        // console.log(this.state.upId.length)



        // press New Patient
        if (this.state.goForm) {
            return (
                <Form onPress={this.backFromResult.bind(this)} onPressToHome={this.backFromResult.bind(this)} onPressToLogin={this.props.onPressToLogin}></Form>
            );
        }

        // press Upcoming
        if (this.state.goUpcoming) {
            return (
                <Upcoming onPress={this.backFromResult.bind(this)} onPressToHome={this.backFromResult.bind(this)} onPressToLogin={this.props.onPressToLogin} check={this.checkUpcoming}></Upcoming>
            );
        }

        // press History
        if (this.state.goHistory) {
            return (
                <History onPress={this.backFromResult.bind(this)} onPressToHome={this.backFromResult.bind(this)} onPressToLogin={this.props.onPressToLogin}></History>
            );
        }

        if (this.state.goDone) {
            return (
                <Done onPress={this.backFromResult.bind(this)} onPressToHome={this.backFromResult.bind(this)} onPressToLogin={this.props.onPressToLogin}></Done>
            );

        }

        // Menu
        return (
            <View style={styles.container}>
                <View style={styles.topbar}>
                    {/* <TouchableOpacity style={styles.button} onPress={this.props.onPressToLogin}>
                        <MaterialCommunityIcons name="logout" size={25} color="white"></MaterialCommunityIcons>
                        <Text style={styles.whiteText}>Log Out</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ width: 100 }}></TouchableOpacity>
                    <Text style={styles.textTopMiddle}>XtraVasat</Text>
                    <TouchableOpacity style={{ width: 100 }}></TouchableOpacity>
                </View>
                <View style={styles.bottomBar}>
                    <Button
                        title="ผู้ป่วยใหม่"
                        type="solid"
                        buttonStyle={styles.newButton}
                        onPress={this.toggleForm}
                        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                    />
                    <TouchableOpacity
                        style={[styles.newButton, { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
                        onPress={this.toggleUpcoming}
                        activeOpacity={1}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white", marginLeft: 5 }}>ติดตามประเมินอาการ</Text>
                        {this.state.upId.length != 0 ?
                            <TouchableOpacity style={styles.noti} disabled>
                                <Text style={[styles.subheader, { fontSize: 14 }]}>{this.state.upId.length}</Text>
                            </TouchableOpacity> : null
                        }
                    </TouchableOpacity>

                    {/* <Button
                        title="Upcoming"
                        type="solid"
                        buttonStyle={styles.newButton}
                        onPress={this.toggleUpcoming}
                        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                    /> */}

                    <Button
                        title="ประวัติการถ่ายภาพ"
                        type="solid"
                        buttonStyle={styles.newButton}
                        onPress={this.toggleHistory}
                        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                    />
                    <Button
                        title="รายการที่เสร็จสิ้น"
                        type="solid"
                        buttonStyle={styles.newButton}
                        onPress={this.toggleDone}
                        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                    />
                </View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    loginButton: {
        backgroundColor: '#B6452C',
        margin: 20,
        height: 250,
        borderRadius: 30,
    },
    loginLabel: {
        fontSize: 30,
    },
    nav: {
        backgroundColor: '#B6966D',
        width: Dimensions.get('window').width / 2,
        borderColor: '#2B435F',
        borderEndWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // elevation: 1,
        // shadowColor: 'rgba(0,0,0, .4)', // IOS
        // shadowOffset: { height: 1, width: 1 }, // IOS
        // shadowOpacity: 1, // IOS
        // shadowRadius: 1, //IOS
    },
    nav2: {
        backgroundColor: '#F5F7F4',
        width: Dimensions.get('window').width / 2,
        borderColor: '#2B435F',
        borderEndWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // elevation: 1,
        // shadowColor: 'rgba(0,0,0, .4)', // IOS
        // shadowOffset: { height: 1, width: 1 }, // IOS
        // shadowOpacity: 1, // IOS
        // shadowRadius: 1, //IOS
    },

    subheader: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subheader2: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    navBar: {
        flexDirection: 'row',
        // flex: 0.15,
        justifyContent: 'space-between',
        height: 50,
        borderColor: '#2B435F',
        borderTopWidth: 1,
    },
    topbar: {
        flex: 0.15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: isIPhoneX ? 40 : 30,
        paddingBottom: isIPhoneX ? 20 : 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: '#005daa'

    },
    whiteText: {
        color: 'white'
    },
    textTop: {
        color: 'white',
    },
    textTopMiddle: {
        color: '#005daa',
        // color: 'black',
        // paddingRight: 100,
        fontSize: 24,
        fontWeight: 'bold'
    },
    allbuttonStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    button: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    bottomBar: {
        // paddingTop: 10,
        // paddingBottom: 50,
        flex: 1,
        // backgroundColor: 'black',
        justifyContent: 'space-around',
        margin: 10,
        marginVertical: 30,
        flexDirection: 'column',
        // borderColor: '#B6966D',
        // borderWidth: 1.5,
        // borderRadius: 20,
    },
    newButton: {
        alignSelf: 'center',
        borderRadius: 10,
        width: 300,
        height: 100,
        backgroundColor: '#005daa',
        // borderColor: '#005daa'
        // backgroundColor: '#C38E5A',
    },
    uploadBar: {
        height: 50,
        alignItems: 'center',
        backgroundColor: '#B6966D'
    },
    uploadText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    upload: {
        borderColor: '#B6966D',
        borderBottomWidth: 1.5,
        borderTopWidth: 1.5,
        marginBottom: 10,
    },
    noDataText: {
        fontSize: 18,
        // fontWeight : 'bold',
        alignItems: 'center'
    },
    noData: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    noti: {
        backgroundColor: '#ee3324',
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 5,
        paddingHorizontal: 7,
    },
});