import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, AsyncStorage, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import ShowUpcoming from './ShowUpcoming.js';
import ShowHistory from './ShowHistory.js';
import * as FileSystem from 'expo-file-system';
import isIPhoneX from 'react-native-is-iphonex';
import moment from 'moment';
import Camera from './goodCamera.js'
import Picker from './Picker.js'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class Upcoming extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        id: [],
        upId: [],
        selects: [],
        goCamera: false,
        refreshing: false,
        search: '',
        allsearch: [],
    }

    componentDidMount = async () => {
        this.showyoyo();
    };

    backFromResult = () => {
        this.setState({
            id: [],
            upId: [],
            selects: [],
            goCamera: false,
            search: '',
            allsearch: [],
        })
        this.showyoyo()
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
        // const allid = [];
        const late = [];
        const intime = [];
        let i = 0
        console.log('fetchUpcoming')
        while (i < this.state.id.length) {
            let item = await AsyncStorage.getItem(this.state.id[i]);
            let data = JSON.parse(item);
            // console.log(data)

            if (!data.finish) {
                const lastTime = data.time[data.time.length - 1]

                if (data.notiOther != '') {
                    if (moment().diff(moment(parseInt(data.time[data.time.length - 1])), 'minutes') >= (parseInt(data.notiOther) * 60) - 5) {
                        let x = moment(parseInt(lastTime)).add(data.notiOther, 'hours').format('DD MMM YYYY HH:mm').toString()
                        if (data.noti == 0) {

                        }
                        else {
                            if (moment(x).diff(moment(), 'minutes') < 0) {
                                // late
                                late.push(this.state.id[i])
                            }
                            else {
                                //intime
                                intime.push(this.state.id[i])

                            }
                            // allid.push(this.state.id[i])
                        }
                    }
                }
                else {
                    // console.log(moment().diff(moment(parseInt(data.time[data.time.length - 1])), 'minutes'))
                    if (moment().diff(moment(parseInt(data.time[data.time.length - 1])), 'minutes') >= (parseInt(data.noti) * 60) - 5) {
                        let x = moment(parseInt(lastTime)).add(data.noti, 'hours').format('DD MMM YYYY HH:mm').toString()
                        if (data.noti == 0) {

                        }
                        else {
                            if (moment(x).diff(moment(), 'minutes') < 0) {
                                // late
                                late.push(this.state.id[i])
                            }
                            else {
                                //intime
                                intime.push(this.state.id[i])
                            }
                            // allid.push(this.state.id[i])
                        }
                    }
                }
            }
            i = i + 1
        }
        const allid = late.concat(intime);

        this.setState({ upId: allid });
        // console.log('allid')
        // console.log(allid)
    }

    back = () => {
        this.props.onPressToHome()
        console.log('back to menu')
    }

    showSelect = s => {
        this.setState({ selects: s })
    }

    pressCamera = s => {
        this.setState({ selects: s, goCamera: true })
    }

    renderResult = key =>
        <ShowUpcoming
            key={key}
            timestamp={key}
            showSelect={this.showSelect}
            pressCamera={this.pressCamera}
        />;

    renderNoData = () =>
        <View style={styles.noData}>
            <Text style={styles.noDataText}>- ไม่มีข้อมูล -</Text>
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
    //     // data.finish = true;
    //     // // console.log('Home' + data)
    //     // await AsyncStorage.setItem(key, JSON.stringify(data))
    //     let i = 0
    //     while (i < data.dictUri.length) {
    //         await FileSystem.deleteAsync(`${data.dictUri[i].value}`)
    //         i = i + 1

    //     }
    //     await AsyncStorage.removeItem(key);
    // }

    pressokactivatePatient = async (key) => {
        let item = await AsyncStorage.getItem(key);
        let data = JSON.parse(item);
        data.finish = false;
        // console.log('Home' + data)
        await AsyncStorage.setItem(key, JSON.stringify(data))
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.showyoyo().then(() => {
            this.setState({ refreshing: false });
        });
    }

    searching = async (keyword) => {
        const allmatch = [];
        let i = 0
        console.log('searching')
        while (i < this.state.upId.length) {
            let item = await AsyncStorage.getItem(this.state.upId[i]);
            let data = JSON.parse(item);
            if (keyword == '') {
                console.log('match')
                allmatch.push(this.state.upId[i]);
            } else {
                // search by id
                if (data.id.includes(keyword)) {
                    allmatch.push(this.state.upId[i]);
                }
            }

            i = i + 1
        }
        this.setState({ allsearch: allmatch });
    }

    updateSearch = search => {
        this.setState({ search });
        this.searching(search)
    };


    render() {
        const { search } = this.state;

        // when press on take photo button
        if (this.state.goCamera) {
            return (
                <Picker
                    values={this.state.selects}
                    position={this.state.selects.uri[0].key}
                    onPressToHome={this.props.onPressToHome}
                    onPress={this.backFromResult.bind(this)}
                >
                </Picker>
                // <Camera
                //     values={this.state.selects}
                //     position={this.state.selects.uri[0].key}
                //     onPressToHome={this.props.onPressToHome}
                // >
                // </Camera>
            );
        }


        // when select on history
        if (this.state.selects.length != 0) {
            console.log('show history')
            return (
                <ShowHistory
                    key={this.state.selects.datetime[0]}
                    donePatient={this.donePatient}
                    hn={this.state.selects.hn}
                    age={this.state.selects.age}
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
                </ShowHistory>
            );
        } else {
            // show list of history
            return (
                <View style={styles.container}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.backBtn} onPress={this.back} >
                            <MaterialIcons name="arrow-back" size={35} color="white" />
                        </TouchableOpacity>

                        <Text style={styles.header}>ติดตามประเมินอาการ</Text>

                        <TouchableOpacity style={[styles.button]} >
                            <MaterialIcons name="done" size={25} color="transparent"></MaterialIcons>
                            <Text style={{ color: 'transparent' }}>เปิดเคส</Text>
                        </TouchableOpacity>

                    </View>
                    <SearchBar
                        lightTheme={true}
                        placeholder="Search by Tracking ..."
                        onChangeText={this.updateSearch}
                        value={search}
                        containerStyle={styles.searchBar}
                        inputContainerStyle={styles.searchBar2}
                    />

                    {search == '' ?
                        <ScrollView contentComponentStyle={styles.subContainer} refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            {this.state.upId.length == 0 ? this.renderNoData() : this.state.upId.map(this.renderResult)}
                        </ScrollView>
                        :
                        <ScrollView contentComponentStyle={styles.subContainer} refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            {this.state.allsearch.length == 0 ? this.renderNoData() : this.state.allsearch.map(this.renderResult)}
                        </ScrollView>
                    }


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
    searchBar: {
        backgroundColor: '#F5F7F4',
    },
    searchBar2: {
        backgroundColor: '#e4e5e7',
    }



});
