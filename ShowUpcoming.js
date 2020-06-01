import React from 'react';
import { Alert, Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';


const detailSize = 130;


export default class ShowUpcoming extends React.Component {

    constructor(props) {
        super(props);
        key = this.props.timestamp;
        showTime = '';
        lastTime = '';
        finishColor = 'transparent';
        noti = '';
        latetime = '';
        checklate = false;
    }


    state = {
        show: false,
        allData: [],
    }

    ShowHistory = e => {
        const select = {
            hn: this.state.allData.id,
            age: this.state.allData.age,
            datetime: this.state.allData.time,
            uri: this.state.allData.dictUri,
            drug: this.state.allData.drug,
            drugOther: this.state.allData.drugOther,
            noti: this.state.allData.noti,
            notiOther: this.state.allData.notiOther,
            finish: this.state.allData.finish,
            gender: this.state.allData.gender,
            welfare: this.state.allData.welfare,
            diagnosis: this.state.allData.diagnosis,
            diagOther: this.state.allData.diagOther,
            cor: this.state.allData.cor,
            corOther: this.state.allData.corOther,
            concenMG: this.state.allData.concenMG,
            concenML: this.state.allData.concenML,
            volumn: this.state.allData.volumn,
            timeUsing: this.state.allData.timeUsing,
            timeOccuring: this.state.allData.timeOccuring,
            result: this.state.allData.result,
            allResult: this.state.allData.allResult,
            pID:this.state.allData.pid
        }
        this.props.showSelect(select)
    }

    testAgian = () => {
        const select = {
            hn: this.state.allData.id,
            age: this.state.allData.age,
            datetime: this.state.allData.time,
            uri: this.state.allData.dictUri,
            drug: this.state.allData.drug,
            drugOther: this.state.allData.drugOther,
            noti: this.state.allData.noti,
            notiOther: this.state.allData.notiOther,
            finish: this.state.allData.finish,
            gender: this.state.allData.gender,
            welfare: this.state.allData.welfare,
            diagnosis: this.state.allData.diagnosis,
            diagOther: this.state.allData.diagOther,
            cor: this.state.allData.cor,
            corOther: this.state.allData.corOther,
            concenMG: this.state.allData.concenMG,
            concenML: this.state.allData.concenML,
            volumn: this.state.allData.volumn,
            timeUsing: this.state.allData.timeUsing,
            timeOccuring: this.state.allData.timeOccuring,
            result: this.state.allData.result,
            allResult: this.state.allData.allResult,
            pID:this.state.allData.pid
        }
        this.props.pressCamera(select)
    }

    fetchdata = async () => {

        let item = await AsyncStorage.getItem(key);
        data = JSON.parse(item);
        console.log(data)

        // console.log(data)
        this.setState({ allData: data })
        
    }


    render() {

        if (this.state.allData.length == 0) {
            this.fetchdata()
        }
        // console.log(this.state.allData)
        if (this.state.allData.time !== undefined) {
            // console.log(parseInt(this.state.allData.time[0])) 
            showTime = this.state.allData.time[0]
            lastTime = this.state.allData.time[this.state.allData.time.length - 1]
        }

        noti = this.state.allData.noti;
        if (this.state.allData.noti == 'Others') {
            noti = this.state.allData.notiOther;
        }

        let x = moment(parseInt(lastTime)).add(noti , 'hours').format('DD MMM YYYY HH:mm').toString()
        if (moment(x).diff(moment(), 'minutes') < 0) {
            latetime = moment(parseInt(lastTime)).add(noti, 'hours').format('DD MMM YYYY HH:mm').toString()
            checklate = true
        }
        else {
            latetime = moment(x).diff(moment(), 'minutes').toString() + ' minutes'
            checklate = false
        }

        var c = ''
        switch (this.state.allData.result) {
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


            <TouchableOpacity
                style={{
                    height: detailSize,
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 5,
                    marginHorizontal: 10,
                    // backgroundColor: 'red',
                    borderColor: '#2B435F',
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: 10,
                    flexDirection: 'row',
                    elevation: 1,
                    shadowColor: 'rgba(0,0,0, .4)', // IOS
                    shadowOffset: { height: 1, width: 1 }, // IOS
                    shadowOpacity: 1, // IOS
                    shadowRadius: 1, //IOS
                    backgroundColor: this.state.allData.finish ? 'grey' : '#fefffe',
                }}
                activeOpacity={0.7}
                onPress={this.ShowHistory}
            >
                <View style={styles.topBar}>
                    {checklate ? <Text style={styles.header2}>Time : {latetime} </Text> : 
                    <Text style={styles.header}>Next shot in : {latetime} </Text>}
                    {/* <Text style={checklate ? styles.header2 : styles.header}>Next shot in : {latetime} </Text> */}
                    {/* <Text style={styles.header}>Next shot : {(moment(parseInt(lastTime)).add(noti, 'hours').format('DD MMM YYYY HH:mm')).toString()}</Text> */}
                    {/* <Text style={styles.header}>Date : {moment(parseInt(showTime)).toString()}</Text> */}
                    <Text style={styles.header}>Tracking : {this.state.allData.id}</Text>
                    <Text style={styles.header}>Result : <Text style={{ color: c, fontWeight: 'bold' }}>{this.state.allData.result}</Text></Text>
                </View>
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={this.testAgian}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="image-plus" size={30} color="white"></MaterialCommunityIcons>
                    <Text style={{ color: "white", fontSize: 12 }}>add image</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );

    }
}

const styles = StyleSheet.create({
    pictures: {
        flex: 1,
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 0,
        // alignItems: 'center',
        borderColor: '#b3b3ba',
        borderBottomWidth: 1.5,
        // backgroundColor: 'red',
    },
    picture: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        resizeMode: 'contain',
    },
    pictureWrapper: {
        height: detailSize,
        // alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        marginHorizontal: 10,
        // backgroundColor: 'red',
        borderColor: '#b3b3ba',
        borderWidth: 1.5,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        elevation: 1,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS

    },
    topBar: {
        marginVertical: 10,
        marginLeft: 20,
        // backgroundColor: 'blue'
    },
    header: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
    imgBar: {
        margin: 10,
        alignItems: 'center',
    },
    img: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    resultBar: {
        backgroundColor: 'green',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    resultText: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        marginTop: 10,
    },
    uploadButton: {
        alignItems: 'center',
        marginVertical: 20,
        // flex: 0.7,
        width: 90,
        height: 90,
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 50,
        backgroundColor: '#B6452C',
        elevation: 2,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    header2: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'red',
        marginTop: 10,
    },
});