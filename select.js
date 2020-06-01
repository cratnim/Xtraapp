import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Photo from './Photo.js';
import ShowHistory from './ShowHistory.js';

export default class select extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    historys: [],
    selects: [],
  }

  componentDidMount = async () => {
    // get history from database
    const historys = [
      {
        hn: '111111111',
        datetime: '2020-02-28',
        uri: 'https://reactnative.dev/img/tiny_logo.png',
        result: 'NORMAL',
      },
      {
        hn: '222222222',
        datetime: '2020-02-27',
        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        result: 'MILD',
      },
    ];
    this.setState({ historys });
  };

  back = () => {
    console.log('back to menu')
  }

  backFromResult = () => {
    this.setState({
      historys: [],
      selects: [],
    })
    // get history from database
    const historys = [
      {
        hn: '111111111',
        datetime: '2020-02-28',
        uri: 'https://reactnative.dev/img/tiny_logo.png',
        result: 'NORMAL',
      },
      {
        hn: '222222222',
        datetime: '2020-02-27',
        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        result: 'MILD',
      },
    ];
    this.setState({ historys });
  }

  showSelect = s => {
    this.setState({ selects: s })
  }

  renderResult = history =>
    <Photo
      key={history.hn}
      hn={history.hn}
      datetime={history.datetime}
      result={history.result}
      uri={`${history.uri}`}
      showSelect={this.showSelect}
    />;

  render() {
    if (this.state.selects.length != 0) {
      const s = this.state.selects;
      console.log('show history')
      return (
        <ShowHistory
          hn={s.hn}
          datetime={s.datetime}
          result={s.result}
          uri={`${s.uri}`}
          onPress={this.backFromResult}
        >
        </ShowHistory>
      );
    } else {
      return (
        <View style={styles.container}>
          {/* {content} */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} onPress={this.back} >
              <MaterialIcons name="arrow-back" size={35} color="white" />
            </TouchableOpacity>
  
            <Text style={styles.header}>History</Text>
  
            <TouchableOpacity style={[styles.backBtn, { width: 35 }]}></TouchableOpacity>
          </View>
          <ScrollView contentComponentStyle={styles.subContainer}>
            {this.state.historys.map(this.renderResult)}
          </ScrollView>
  
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8ec',
    flexDirection: 'column',
    flex: 1,
  },
  topBar: {
    backgroundColor: '#46281d',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 10,
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
    fontSize: 16,
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
    marginTop: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nextBtn: {
    backgroundColor: '#262e30',
    borderColor: '#262e30',
    marginHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  backBtn: {
    marginLeft: 10,
    marginTop: 10,
  },



});
