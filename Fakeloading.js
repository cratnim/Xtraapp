import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Result from './Result.js'
import Show from './ShowHistory.js';
import moment from 'moment';


var FormData = require('form-data');

export default class Fakeloading extends Component {

  constructor(props) {
    super(props);
    pID = {};
    imgID = {};
    dictResult = [];
  }

  state = {
    loading: true,
    allData: this.props.allData,
    User: this.props.User,
    response: {},
  }

  uploadForm = async (values) => {
    console.log('uploadForm')
    // console.log(values)

    // const apiURL = 'https://xyh4ml0s-dr006-8812.in.cils.space/form'
    const apiURL = 'https://api.cils.space/xtra/v1/form?apikey=4lcDEOJzjPqQ1kaAQo1KNKRiCi1I0wFM'

    function replaceOther(arr1, arr2) {
      var array1 = arr1.slice()
      var index = array1.findIndex(element => element.includes("Others"))

      if (index != -1) {
        array1[index] = arr2;
      }
      return array1;
    }


    var diag = values.diagnosis.includes('Others') ? values.diagOther : values.diagnosis;
    var comobility = (values.cor.length != 0 && values.cor[0].includes('Others')) ? replaceOther(values.cor, values.corOther) : values.cor;
    var drug = (values.drug.length != 0 && values.drug[0].includes('Others')) ? replaceOther(values.drug, values.drugOther) : values.drug;
    var volumn = values.volumn == '' ? 0 : values.volumn;
    var notification = values.noti == 'Others' ? values.notiOther : values.noti;
    var timeUsing = moment(values.timeUsing, 'DD MMM YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss')
    var timeOccuring = moment(values.timeOccuring, 'DD MMM YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss')

    const form = new FormData();


    form.append('subject_id', values.hn);
    form.append('age', values.age);
    form.append('gender', values.gender);
    form.append('welfare', values.welfare);
    form.append('diagnosis', diag);
    form.append('comobility', comobility.toString());
    form.append('drug', drug.toString());
    form.append('concenMG', values.concenMG);
    form.append('concenML', values.concenML);
    form.append('volumn', volumn);
    form.append('timeUsing', timeUsing);
    form.append('timeOccuring', timeOccuring);
    form.append('notification', notification);

    console.log(form)

    // upload image to api
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: form
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log('Upload success!!!');
        pID = responseJson;
        console.log('responseJson.result ')
        // console.log(responseJson.result)
        const x = responseJson.result
        this.uploadImage(x.id);
      })
      .catch(error => console.log(error))
  }


  uploadImage = async (pid) => {
    console.log('uploadImage')
    // console.log(this.props.uri)


    // const apiURL = 'https://xyh4ml0s-dr006-8812.in.cils.space/predict/' + pid
    const apiURL = 'https://api.cils.space/xtra/v1/predict/' + pid + '?apikey=4lcDEOJzjPqQ1kaAQo1KNKRiCi1I0wFM'

    const form = new FormData();

    form.append('image', {
      uri: this.props.path,
      type: 'image/jpg',
      name: this.props.datetime[this.props.datetime.length - 1] + '.jpg',
    });


    // upload image to api
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: form
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log('Upload success');
        imgID = responseJson;
        console.log('responseJson.result')
        // console.log(responseJson.result)
        const x = responseJson.result
        this.timerId = setInterval(() => this.checkAiResult(x.id), 10000);
      })
      .catch(error => console.log(error))
  }

  checkAiResult = (imgid) => {
    console.log('checkAiResult')
    console.log(imgid)
    // const apiURL = 'https://xyh4ml0s-dr006-8812.in.cils.space/result/' + imgid 
    const apiURL = 'https://api.cils.space/xtra/v1/result/' + imgid + '?apikey=4lcDEOJzjPqQ1kaAQo1KNKRiCi1I0wFM'

    fetch(apiURL, {
      method: "GET",
    })
      .then(response => response.json())
      .then((responseJson) => {
        // console.log('result')
        // console.log(responseJson)
        const x = responseJson.result
        if (x.status == 'done') {
          clearInterval(this.timerId);
          this.saveData(responseJson)
          this.setState({ response: responseJson })
        }
      })
      .catch(error => console.log(error))
  }

  saveData = async (responseJson) => {

    let item = await AsyncStorage.getItem(this.props.datetime[0]);
    let data = JSON.parse(item);
    // console.log(data)
    data.result = responseJson.result.result.severity

    if (data.allResult !== undefined) {
      let u = dictResult.concat(data.allResult)
      dictResult = u

    }

    dictResult.push({
      key: this.props.dictUri[0].key,
      value: responseJson.result.result.severity
    });

    data.allResult = dictResult
    if (this.props.pID == undefined) {
      data.pid = pID.result.id
    } else {
      data.pid = this.props.pID
      pID = this.props.pID
    }

    if (data.result == 'NORMAL' && data.dictUri.length > 1) {
      if (data.noti != 0) {
        data.noti = 1
      }
      else if (data.notiOther != '') {
        data.notiOther = 1
      }
    }

    if (data.result == 'MILD') {
      if (data.noti != 0) {
        data.noti = 8
      }
      else if (data.notiOther != '') {
        data.notiOther = 8
      }
    }
    if (data.result == 'MODERATE') {
      if (data.noti != 0) {
        data.noti = 8
      }
      else if (data.notiOther != '') {
        data.notiOther = 8
      }
    }
    if (data.result == 'SEVERE') {
      if (data.noti != 0) {
        data.noti = 4
      }
      else if (data.notiOther != '') {
        data.notiOther = 4
      }
    }

    // console.log(data)
    await AsyncStorage.mergeItem(this.props.datetime[0], JSON.stringify(data))
    this.setState({ loading: false })
  }

  setloading = () => {
    this.setState({ loading: false })
  }

  async componentDidMount() {
    // upload data then upload img to api
    if (this.props.pID == undefined) {
      await this.uploadForm(this.props.values)
    } else {
      console.log('pid is exists')
      await this.uploadImage(this.props.pID)
    }
  }

  render() {

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" margin={20} />
          <Text style={styles.loading}> Uploading... </Text>
        </View>
      )
    } else {
      console.log('Fakeeeeeeeeee')
      console.log(pID)
      return (
        // <View></View>
        <Show
          // key={this.props.datetime[0]}
          dictUri={this.props.dictUri}
          values={this.props.values}
          donePatient={this.props.donePatient}
          hn={this.props.hn}
          age={this.props.age}
          datetime={this.props.datetime}
          result={dictResult[dictResult.length - 1].value}
          allResult={dictResult}
          uri={this.props.uri}
          drug={this.props.drug}
          finish={false}
          drugOther={this.props.drugOther}
          noti={this.props.noti}
          notiOther={this.props.notiOther}
          gender={this.props.gender}
          welfare={this.props.welfare}
          diagnosis={this.props.diagnosis}
          diagOther={this.props.diagOther}
          cor={this.props.cor}
          corOther={this.props.corOther}
          concenMG={this.props.concenMG}
          concenML={this.props.concenML}
          volumn={this.props.volumn}
          timeUsing={this.props.timeUsing}
          timeOccuring={this.props.timeOccuring}
          onPress={this.props.onPressToHome}
          // pressCamera={this.props.backFromResult}
          onPressToHome={this.props.onPressToHome}
          pID={pID}
        >
        </Show>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.25,
    left: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 5,
  },
  textComplete: {
    color: '#2699FB',
    fontSize: 16,
  },
  okButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
    backgroundColor: '#2699FB',
    borderRadius: 5,
    width: 144,
    height: 42,
  },
  okText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loading: {
    color: 'white',
    fontSize: 20,
  }
});      