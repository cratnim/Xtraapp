import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, AsyncStorage, ScrollView, Dimensions } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Photo from './Photo.js';
import ShowHistory from './ShowHistory.js';
import * as FileSystem from 'expo-file-system';
import isIPhoneX from 'react-native-is-iphonex';
import Camera from './goodCamera.js'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class History extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    allkey: [],
    historys: [],
    selects: [],
    goCamera: false,
    search: '',
    allsearch: [],
  }

  componentDidMount = async () => {
    this.showyoyo();
  };

  backFromResult = () => {
    this.setState({
      allkey: [],
      historys: [],
      selects: [],
      goCamera: false,
      search: '',
      allsearch: [],
    })
    this.showyoyo()
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
      allid.reverse()
      this.setState({ allkey: allid });
      this.fetchData()
      // this.fetchHistory()
    });
  }

  fetchData = async () => {
    let i = 0
    const allid = [];
    while (i < this.state.allkey.length) {
      let item = await AsyncStorage.getItem(this.state.allkey[i]);
      let data = JSON.parse(item);
      // console.log('History')
      // console.log(data)
      if (data.finish == false) {
        allid.push(this.state.allkey[i])
      }
      i = i + 1
    }
    this.setState({ historys: allid })
  }

  fetchHistory = async () => {
    const alldata = [];
    const normal = [];
    const mild = [];
    const moderate = [];
    const severe = [];
    const other = [];
    let i = 0
    while (i < this.state.allkey.length) {
      let item = await AsyncStorage.getItem(this.state.allkey[i]);
      let data = JSON.parse(item);
      // console.log(data)

      if (data.finish == false) {

        switch (data.result) {
          case 'NORMAL': normal.push(this.state.allkey[i]); break;
          case 'MILD': mild.push(this.state.allkey[i]); break;
          case 'MODERATE': moderate.push(this.state.allkey[i]); break;
          case 'SEVERE': severe.push(this.state.allkey[i]); break;
          default: other.push(this.state.allkey[i]); break;
        }
      }

      i = i + 1
    }
    alldata.push(severe);
    alldata.push(moderate);
    alldata.push(mild);
    alldata.push(normal);
    alldata.push(other);
    this.setState({ historys: alldata });
    // console.log(this.state.upId)
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

  donePatient = async (key) => {
    let item = await AsyncStorage.getItem(key);
    let data = JSON.parse(item);
    // console.log(data)
    data.finish = true
    await AsyncStorage.mergeItem(key, JSON.stringify({ finish: true }))

  }

  // donePatient = async (key) => {
  //   let item = await AsyncStorage.getItem(key);
  //   let data = JSON.parse(item);

  //   let i = 0
  //   while (i < data.dictUri.length) {
  //     await FileSystem.deleteAsync(`${data.dictUri[i].value}`)
  //     i = i + 1
  //   }
  //   await AsyncStorage.removeItem(key);
  // }

  pressokactivatePatient = async (key) => {
    let item = await AsyncStorage.getItem(key);
    let data = JSON.parse(item);
    data.finish = false;
    // console.log('Home' + data)
    await AsyncStorage.setItem(key, JSON.stringify(data))
  }

  pressCamera = s => {
    this.setState({ selects: s, goCamera: true })
  }

  searching = async (keyword) => {
    const allmatch = [];
    let i = 0
    console.log('searching')
    while (i < this.state.historys.length) {
      let item = await AsyncStorage.getItem(this.state.historys[i]);
      let data = JSON.parse(item);
      // console.log(data)

      if (keyword == '') {
        console.log('match')
        allmatch.push(this.state.historys[i]);
      } else {
        // search by id
        if (data.id.includes(keyword)) {
          allmatch.push(this.state.historys[i]);
        }
      }

      i = i + 1
    }
    this.setState({ allsearch: allmatch });
    // console.log(this.state.upId)
  }

  updateSearch = search => {
    // console.log(search)
    this.setState({ search });
    this.searching(search)
  };


  render() {

    const { search } = this.state;

    if (this.state.goCamera) {
      return (
        <Camera
          values={this.state.selects}
          position={this.state.selects.uri[0].key}
          onPressToHome={this.props.onPressToHome}
        >
        </Camera>
      );
    }

    // when select on history
    if (this.state.selects.length != 0) {
      console.log('hhhhhhhhhhhhhhhh')
      console.log(this.state.selects)
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

            <Text style={styles.header}>ประวัติการถ่ายภาพ</Text>

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
            <ScrollView contentComponentStyle={styles.subContainer}>
              {this.state.historys.length == 0 ? this.renderNoData() : this.state.historys.map(this.renderResult)}
            </ScrollView>
            :
            <ScrollView contentComponentStyle={styles.subContainer}>
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
    marginTop: 10,
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
