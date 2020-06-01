import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, AsyncStorage, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Photo from './Photo.js';
import * as FileSystem from 'expo-file-system';
import isIPhoneX from 'react-native-is-iphonex';
import ShowDodo from './ShowDodo.js'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class Dodo extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        done: [],
        selects: [],
        showDoneID: []
    }

    componentDidMount = async () => {
        this.showyoyo();
    };

    backFromResult = () => {
        this.setState({
            done: [],
            selects: [],
            showDoneID: []
        })
        this.showyoyo()
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


    donePatient = async (key) => {
        let item = await AsyncStorage.getItem(key);
        let data = JSON.parse(item);
        // console.log(data)
        data.finish = true
        await AsyncStorage.mergeItem(key, JSON.stringify({ finish: true }))

    }


    pressokactivatePatient = async (key) => {
        let item = await AsyncStorage.getItem(key);
        let data = JSON.parse(item);
        data.finish = false;
        // console.log('Home' + data)
        await AsyncStorage.mergeItem(key, JSON.stringify({ finish: false }))
    }


    showyoyo = async () => {
        // get history inside phone
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
            this.setState({ done: allid });
            this.fetchData()
        });
    }

    fetchData = async () => {
        let i = 0
        const allid = [];
        while (i < this.state.done.length) {
            let item = await AsyncStorage.getItem(this.state.done[i]);
            let data = JSON.parse(item);
            if (data.finish == true) {
                allid.push(this.state.done[i])
            }
            i = i + 1
        }
        this.setState({ showDoneID: allid })
    }


    back = () => {
        this.props.onPressToHome()
        // console.log('back to menu')
    }

    showSelect = s => {
        this.setState({ selects: s })
    }

    renderResult = key =>
        <Photo
            key={key}
            timestamp={key}
            showSelect={this.showSelect}
            pressCamera={this.pressCamera}
        />;

    renderNoData = () =>
        <View style={styles.noData}>
            <Text style={styles.noDataText}>- ไม่มีข้อมูล -</Text>
        </View>


    render() {
        // when select on done
        if (this.state.selects.length != 0) {
            console.log('Dodo')
            console.log(this.state.selects)
            return (
                <ShowDodo
                    key={this.state.selects.datetime[0]}
                    donePatient={this.donePatient}
                    hn={this.state.selects.hn}
                    datetime={this.state.selects.datetime}
                    result={this.state.selects.result}
                    allResult={this.state.selects.allResult}
                    uri={this.state.selects.uri}
                    drug={this.state.selects.drug}
                    finish={this.state.selects.finish}
                    drugOther={this.state.selects.drugOther}
                    noti={this.state.selects.noti}
                    notiOther={this.state.selects.notiOther}
                    gender={this.state.selects.gender}
                    welfare={this.state.selects.welfare}
                    diagnosis={this.state.selects.diagnosis}
                    diagOther={this.state.selects.diagOther}
                    cor={this.state.selects.cor}
                    corOther={this.state.selects.corOther}
                    concenMG={this.state.selects.concenMG}
                    concenML={this.state.selects.concenML}
                    volumn={this.state.selects.volumn}
                    timeUsing={this.state.selects.timeUsing}
                    timeOccuring={this.state.selects.timeOccuring}
                    onPress={this.backFromResult.bind(this)}
                    pressCamera={this.pressCamera}
                    activatePatient={this.pressokactivatePatient}
                    onPressToHome={this.props.onPressToHome}
                    pID={this.state.selects.pID}
                >
                </ShowDodo>
            );
        } else {
            // show list of done
            return (
                <View style={styles.container}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.backBtn} onPress={this.back} >
                            <MaterialIcons name="arrow-back" size={35} color="white" />
                        </TouchableOpacity>

                        <Text style={styles.header}>รายการที่เสร็จสิ้น</Text>

                        <TouchableOpacity style={[styles.button]} >
                            <MaterialIcons name="done" size={25} color="transparent"></MaterialIcons>
                            <Text style={{ color: 'transparent' }}>เปิดเคส</Text>
                        </TouchableOpacity>

                    </View>
                    <ScrollView contentComponentStyle={styles.subContainer}>
                        {this.state.showDoneID.length == 0 ? this.renderNoData() : this.state.showDoneID.map(this.renderResult)}
                    </ScrollView>

                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F7F4',
        flexDirection: 'column',
        flex: 1,
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
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    pictures: {
        flex: 1,
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 0,
        alignItems: 'center',
        // backgroundColor: 'green',
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
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    resultBar: {
        backgroundColor: 'green',
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
        fontSize: 18,
        fontWeight: 'bold',
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
        // marginTop: 25,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    nextBtn: {
        backgroundColor: '#262e30',
        borderColor: '#262e30',
        marginHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    backBtn: {
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
    button: {
        // paddingVertical: 10,
        alignItems: 'center',
    },


});
