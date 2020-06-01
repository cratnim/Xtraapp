import { Modal } from 'react-native';
import { Alert, Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { Ionicons, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import isIPhoneX from 'react-native-is-iphonex';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        img = [];
    }



    back = () => {
        this.props.onPress();
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


    _renderHeader(index) {
        // console.log(img)
        // console.log(index)
        return (
            <View style={styles.headerContainer}>
                {/* <TouchableOpacity style={styles.backBtn2} onPress={this.back} >
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
                <Text style={styles.header}>{img[img.length - index - 1].props.headers}</Text>
                <TouchableOpacity style={[styles.backBtn2, {width: 50}]}  >
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity> */}

                <Text style={styles.header}>{img[img.length - index - 1].props.headers}</Text>
            </View>
        );
    }

    

    render() {
        const { images, datetime, index, allResult } = this.props;
        // allResult.reverse() 
        // console.log('ImageViewer')
        // console.log(allResult)
        var i;
        for (i = 0; i < images.length; i++) {
            img.push({
                url: images[i].value,
                props: {
                    headers:
                        `ถ่ายครั้งที่ ${images.length - i} เมื่อ : \n${this.handleDate((moment(parseInt(datetime[images.length - i - 1])).format('DD MMM YYYY HH:mm')))} \nผลลัพธ์ : ${allResult[images.length - i - 1].value}`,
                    // headers: `ถ่ายครั้งที่ ${images.length - i} เมื่อ : ${(moment(parseInt(datetime[images.length - i - 1])).format('DD MMM YYYY HH:mm')).toString()}`
                    // footers: `ผลลัพธ์ : ${allResult[i].value}`

                }
            })
        }

        return (
            <View style={styles.container}>
                <Modal visible={true} transparent={true}>

                    <ImageViewer imageUrls={img} index={images.length - index - 1} renderHeader={(currentIndex) => this._renderHeader(currentIndex)} 
                    >
                    </ImageViewer>
                    <TouchableOpacity style={styles.backBtn} onPress={this.back} >
                        <MaterialIcons name="arrow-back" size={35} color="white" />
                    </TouchableOpacity>

                </Modal>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flexDirection: 'column',
        flex: 1,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'black',
    },
    topBar: {
        backgroundColor: 'black',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
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
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        elevation: 1,
        // marginTop: 25,
        // fontWeight: 'bold',
        // marginBottom: 10,
        // position: 'absolute',
        // bottom: 0,
        // right: 0,
        // left: 20,
        // top: isIPhoneX ? 40 : 30,
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
        position: 'absolute',
        // bottom: 0,
        // right: 0,
        left: 20,
        top: isIPhoneX ? 40 : 30,
    },
    backBtn2: {
        // position: 'absolute',
        // // bottom: 0,
        // // right: 0,
        // left: 20,
        // top: isIPhoneX ? 40 : 30,
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
    headerContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingHorizontal: 10,
        // // paddingBottom: 20,
        // // backgroundColor: '#005daa',
        // paddingTop: 10,
        // alignItems: 'center',
        // // marginBottom:10,
        // backgroundColor: 'red',
        zIndex: 999,
        position: 'absolute',
        // bottom: 0,
        // right: 0,
        left: Dimensions.get('window').width / 4,
        top: isIPhoneX? 70 : 60,
    },
    footerContainer:{
        zIndex: 999,
        position: 'absolute',
        // bottom: 0,
        // right: 0,
        left:Dimensions.get('window').width / 4,
        top: 400 ,
    },
    picture: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 35,
        resizeMode: 'cover',
    },
    pictureWrapper: {
        // width: pictureSize,
        height: 260,
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