import React from 'react';
import { Alert, Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';


const detailSize = 130;


export default class Photo extends React.Component {

    constructor(props) {
        super(props);
        key = this.props.timestamp;
        showTime = '';
        finishColor = 'transparent';
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
            allResult:this.state.allData.allResult,
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
            allResult:this.state.allData.allResult,
            pID:this.state.allData.pid
        }
        this.props.pressCamera(select)
    }

    fetchdata = async () => {

        let item = await AsyncStorage.getItem(key);
        let data = JSON.parse(item);
        console.log('Photo')
        console.log(data)
        this.setState({ allData: data })
    }


    render() {

        if (this.state.allData.length == 0) {
            this.fetchdata()

        }

        if (this.state.allData.time !== undefined) {
            // console.log(parseInt(this.state.allData.time[0])) 
            showTime = this.state.allData.time[0]
        }
        // console.log(this.state.allData)

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
                    backgroundColor:  '#fefffe',
                    // #dadada
                }}
                activeOpacity={0.7}
                onPress={this.ShowHistory}
            >
                <View style={styles.topBar}>
                    <Text style={styles.header}>Date : {(moment(parseInt(showTime)).format('DD MMM YYYY HH:mm')).toString()}</Text>
                    {/* <Text style={styles.header}>Date : {moment(parseInt(showTime)).toString()}</Text> */}
                    <Text style={styles.header}>Tracking : {this.state.allData.id}</Text>
                    <Text style={styles.header}>Result : <Text style={{ color: c, fontWeight: 'bold' }}>{this.state.allData.result}</Text></Text>
                </View>
               

                <TouchableOpacity
                    style={styles.uploadButton}
                    activeOpacity={1}
                >
                     <FontAwesome name="angle-right" size={50} color="#005daa"></FontAwesome>
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
        // flex: 0.5,
        justifyContent: 'center',
        // marginRight: 10,
        // borderRadius: 50,
        // backgroundColor: '#B6452C',
        elevation: 2,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        marginRight: 20
    },
});