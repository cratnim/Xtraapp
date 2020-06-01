import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Home from './Home.js';

export default class Drug extends React.Component {

  constructor(props) {
    super(props);
  }
  state = {
    drug: this.props.sendDrug[0],
    grade: this.props.result,
    show: true,
    goHome: false,
  }

  cold_1 = [
    '20% lipid', '50% MgSo4', 'Aminophylline', 'Amphotericin B', 'Acyclovir', 'Cefotaxime', 'Ceftriaxone',
    'Co trimoxazole', 'Ganciclovir', 'Erythromycin', 'Penicillin', 'Vancomycin', 'Liposomal Amphotericin B',
    'Diazepam', 'Phenobarbital', 'Thiopental', 'Digoxin', 'Vasopressin', 'Amiodarone', 'Methotrexate'
  ]
  cold_2 = [
    'Doxorubicin', 'Idarubicin', 'Epirubicin', 'Mitomycin C', 'Dactinomycin'
  ]
  cold_3 = [
    'Cisplatin'
  ]
  cold_4 = [
    'Mannitol'
  ]
  middle_1 = [
    'Contrast media', '10% calcium gluconate', '5.5% calcium gluconate', 'Dextrose (>10%)', 'KCl (> 40 mmol/L)', 'NSS (>3-10%)', 'PPN/ TPN', 'Phenytoin', 'Paclitaxel'
  ]
  middle_2 = [
    'Oxaliplatin'
  ]
  hot_1 = [
    'Bleomycin', 'Carmustine Cetuximab', 'Cyclophosphamide', 'Dacarbazine Etoposide', 'Gemtalabine Teniposide', 'Vinblastine Vincristine', 'Vindesine Vinorelbine', 'Docetaxel'
  ]
  hot_2 = [
    'Adrenaline', 'Dobutamine', 'Dopamine', 'Norepinephrine'
  ]
  other = [
    'Others', 'OthersHyperosmolar', 'OthersChemotherapy', 'OthersVascular', 'OthersAntibiotic', 'OthersSedative', 'OthersArrythmia'
  ]

  selectLevel = level => {
    this.setState({ grade: level })
  }

  renderChoice() {
    return (
      <View style={styles.selectBar}>
        <Button
          title="NORMAL"
          onPress={() => this.selectLevel('NORMAL')}
          buttonStyle={[styles.button, { backgroundColor: '#67a65b' }]}
          type="solid"
          titleStyle={styles.buttonText}
        />
        <Button
          title="MILD"
          onPress={() => this.selectLevel('MILD')}
          buttonStyle={[styles.button, { backgroundColor: '#e49623' }]}
          type="solid"
          titleStyle={styles.buttonText}
        />
        <Button
          title="MODERATE"
          onPress={() => this.selectLevel('MODERATE')}
          buttonStyle={[styles.button, { backgroundColor: '#e46223' }]}
          type="solid"
          titleStyle={styles.buttonText}
        />
        <Button
          title="SEVERE"
          onPress={() => this.selectLevel('SEVERE')}
          buttonStyle={[styles.button, { backgroundColor: '#f44336' }]}
          type="solid"
          titleStyle={styles.buttonText}
        />
      </View>
    );
  }

  getDrugWay() {
    if (this.state.grade == 'NORMAL') {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>-</Text>
        </View>
      );
    }
    else if (this.cold_1.includes(this.state.drug)) {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>1)  หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)  รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>     (ไม่มี antidote)</Text>
          <Text style={styles.drugText}>4)  ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)  ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { color: '#005daa' }]}>6)  ประคบเย็น</Text>
          <Text style={styles.drugText}>7)  ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)  แพทย์พิจารณาอาการ</Text>
        </View>
      );
    } else if (this.cold_2.includes(this.state.drug)) {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>1)  หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)  รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>     (Antidote: * Dexrazoxane</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>     ** Dimethyl sulfoxide (DMSO))</Text>
          <Text style={styles.drugText}>4)  ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)  ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { color: '#005daa' }]}>6)  ประคบเย็น</Text>
          <Text style={styles.drugText}>7)  ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)  แพทย์พิจารณาอาการ</Text>
        </View>
      );
    } else if (this.cold_3.includes(this.state.drug)) {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>1)    หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)    ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)    รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>       (Antidote: Sodium thiosulfate)</Text>
          <Text style={styles.drugText}>4)    ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)    ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { color: '#005daa' }]}>6)    ประคบเย็น</Text>
          <Text style={styles.drugText}>7)    ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)    แพทย์พิจารณาอาการ</Text>
        </View>
      );
    } else if (this.cold_4.includes(this.state.drug)) {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>1)  หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)  รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>    (Antidote: Hyaluronidase)</Text>
          <Text style={styles.drugText}>4)  ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)  ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { color: '#005daa' }]}>6)  ประคบเย็น</Text>
          <Text style={styles.drugText}>7)  ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)  แพทย์พิจารณาอาการ</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }, { paddingTop: 5 }]}>การรักษา</Text>
          <Text style={styles.drugText}>topical 1% hydrocortisone</Text>
        </View>
      );
    } else if (this.hot_1.includes(this.state.drug)) {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>1)  หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)  รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>      (Antidote: Hyaluronidase)</Text>
          <Text style={styles.drugText}>4)  ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)  ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>6)  ประคบอุ่น</Text>
          <Text style={styles.drugText}>7)  ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)  แพทย์พิจารณาอาการ</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }, { paddingTop: 5 }]}>การรักษา</Text>
          <Text style={styles.drugText}>topical 1% hydrocortisone cream</Text>
        </View>
      );
    } else if (this.hot_2.includes(this.state.drug)) {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>1)  หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)  รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>      (Antidote: Phentolamine terbutaline)</Text>
          <Text style={styles.drugText}>4)  ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)  ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>6)   ประคบอุ่น</Text>
          <Text style={styles.drugText}>7)  ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)  แพทย์พิจารณาอาการ</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }, { paddingTop: 5 }]}>การรักษา</Text>
          <Text style={styles.drugText}>topical 2% nitroglycerin ointment</Text>
        </View>
      );
    } else if (this.middle_1.includes(this.state.drug)) {
      return (
        <ScrollView contentContainerStyle={[styles.drugBarr, { paddingHorizontal: 15 }]}>
          <Text style={styles.drugText}>1)  หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)  รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>     (Antidote: Hyaluronidase)</Text>
          <Text style={styles.drugText}>4)  ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)  ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }]}>6)  ประคบอุ่นหรือเย็นตามอาการและอาการแสดง</Text>
          <Text style={styles.drugText}>7)  ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)  แพทย์พิจารณาอาการ</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }, { paddingTop: 5 }]}>การรักษา</Text>
          <Text style={styles.drugText}>topical 1% hydrocortisone cream</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }, { paddingTop: 5 }]}>อธิบายเพิ่มเติม: </Text>
          <Text style={styles.drugText}>ยากลุ่มพิเศษ ที่ต้องเลือกพิจารณาประคบร้อนหรือเย็น ตามลักษณะของการบาดเจ็บ ได้แก่
          Vesicants : Hyperosmolar agents/ Contrast media/ Dextrose (>10%)/ 3% sodium chloride/ 5.5% calcium chloride/ TPN/Parenteral nutrition/ Phenytoin
          ยากลุ่มนี้มีฤทธิ์ ทั้งทำลายเนื้อเยื่อและทำให้หลอดเลือดหดตัว ดังนั้น
          ควรประคบเย็น เมื่อบริเวณที่ยารั่วซึม มีการทำลายของเนื้อเยื่อหรือ
          มีการอักเสบและปวดรุนแรง
          ควรประคบร้อน เมื่อบริเวณที่ยารั่วมีสีซีด ซึ่งแสดงว่าหลอดเลือดหดตัว
          *ยาเคมีบำบัดกลุ่ม Paclitaxel พบว่ามีการทำลายเนื้อเยื่อมากกว่า
          จึงพบว่าจะแนะนำให้ประคบเย็น
</Text>
        </ScrollView>
      );
    } else if (this.middle_2.includes(this.state.drug)) {
      return (
        <ScrollView contentContainerStyle={[styles.drugBarr, { paddingHorizontal: 15 }]}>
          <Text style={styles.drugText}>1)  หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)  รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>     (Antidote: Sodium thiosulfate)</Text>
          <Text style={styles.drugText}>4)  ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)  ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }]}>6)  ประคบอุ่นหรือเย็นตามอาการและอาการแสดง</Text>
          <Text style={styles.drugText}>7)  ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)  แพทย์พิจารณาอาการ</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }, { paddingTop: 5 }]}>การรักษา</Text>
          <Text style={styles.drugText}>topical 1% hydrocortisone cream</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }, { paddingTop: 5 }]}>อธิบายเพิ่มเติม: </Text>
          <Text style={styles.drugText}>ยาเคมีบำบัดกลุ่ม Oxaliplatin มีผลต่อการได้รับความรู้สึกบริเวณที่ได้รับยา
          การประคบเย็นบริเวณนี้ อาจเกิดอาการชา (paresthesia) ทำให้การรับความรู้สึกลดลง ควรเลือกประคบอุ่น และใช้ Topical 1% hydrocortisone cream เพื่อลดอาการแดง (erythema persists)
</Text>
        </ScrollView>
      );
    } else if (this.other.includes(this.state.drug)) {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>1)  หยุดยาทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาออกให้มากที่สุด</Text>
          <Text style={styles.drugText}>3)  รายงานแพทย์พิจารณาการรักษา</Text>
          <Text style={[styles.drugText, { color: 'red' }]}>     ตามชนิดของยาที่ได้รับ</Text>
          <Text style={styles.drugText}>4)  ดึงเข็มออก กดหยุดเลือด</Text>
          <Text style={styles.drugText}>5)  ทำการระบุตำแหน่งของรอยรั่วยา</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }]}>6)  ประคบอุ่นหรือเย็นตามอาการและ</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold' }]}>      อาการแสดง</Text>
          <Text style={styles.drugText}>7)  ยกแขนสูงกว่าระดับหน้าอก</Text>
          <Text style={styles.drugText}>8)  แพทย์พิจารณาการรักษา <Text style={[styles.drugText, { fontWeight: 'bold' }]}>ตามอาการ</Text></Text>
        </View>
      );

    }
  }

  getGradeWay() {
    if (this.state.grade == 'NORMAL') {
      return (
        <View style={styles.drugBar}>
          <Text style={styles.drugText}>* ประเมินผิวหนังตำแหน่งที่ให้สารน้ำ</Text>
          <Text style={styles.drugText}>* กรณีให้ยา/สารน้ำมีความเสี่ยงประเมินทุก 1 ชั่วโมงและทุกครั้งเมื่อให้การพยาบาล</Text>
        </View>
      );
    } else if (this.state.grade == 'MILD') {
      return (
        <View style={styles.drugBar}>
          <Text style={[styles.drugText, { fontWeight: 'bold', color: '#005daa' }]}>* ประเมินผิวหนังตำแหน่งที่ให้สารน้ำ</Text>
          <Text style={styles.drugText}>1)  หยุดการให้สารน้ำทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาที่รั่วออกให้ได้มากที่สุดโดยใช้ syringe 5 ml (ให้ยา Antidote ตามชนิดยา)</Text>
          <Text style={styles.drugText}>3)  เอาเข็มออกและกดให้เลือดหยุด</Text>
          <Text style={styles.drugText}>4)  ประคบร้อนหรือเย็นตามชนิดของยา</Text>
          <Text style={styles.drugText}>5)  ยกบริเวณที่ยารั่วหรือบวมสูงกว่าระดับหัวใจใน 24 ชั่วโมงแรก</Text>
          <Text style={styles.drugText}>* * ติดตาม เฝ้าระวังบันทึกอาการและอาการแสดงทุก 8 ชั่วโมงเป็นเวลา 2 วัน หรือจนกว่าอาการจะหายไป
          (ลงบันทึก/ถ่ายภาพ)
            </Text>
          <Text style={[styles.drugText, { fontWeight: 'bold', color: '#005daa' }]}>การทำแผล</Text>
          <Text style={styles.drugText}>แผลผิวหนังสมบูรณ์ ทาด้วย 1% topical hydrocortisone cream ลดการอักเสบ</Text>
        </View>
      );
    } else if (this.state.grade == 'MODERATE') {
      return (
        <ScrollView contentContainerStyle={styles.drugBarr}>
          <Text style={[styles.drugText, { fontWeight: 'bold', color: '#005daa' }]}>* ประเมินผิวหนังตำแหน่งที่ให้สารน้ำ</Text>
          <Text style={styles.drugText}>1)  หยุดการให้สารน้ำทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาที่รั่วออกให้ได้มากที่สุดโดยใช้ syringe 5 ml (ให้ยา Antidote ตามชนิดยา)</Text>
          <Text style={styles.drugText}>3)  เอาเข็มออกและกดให้เลือดหยุด</Text>
          <Text style={styles.drugText}>4)  ประคบร้อนหรือเย็นตามชนิดของยา</Text>
          <Text style={styles.drugText}>5)  ยกบริเวณที่ยารั่วหรือบวมสูงกว่าระดับหัวใจใน 24 ชั่วโมงแรก</Text>
          <Text style={styles.drugText}>* * ติดตาม เฝ้าระวังบันทึกอาการและอาการแสดงทุก 8 ชั่วโมงเป็นเวลา 2 วันในกรณีที่แผลไม่ดีขึ้น รายงานแพทย์ เพื่อพิจารณา
            การรักษาเพิ่มเติม (ลงบันทึก/ถ่ายภาพ)</Text>
          <Text style={[styles.drugText, { fontWeight: 'bold', color: '#005daa' }]}>การทำแผล</Text>
          <Text style={styles.drugText}>- แผลผิวหนังสมบูรณ์ ทาด้วย paraffin tulle with 0.5% chlorhexidineacetate cream ช่วยรักษาความชุ่มชื้นของเซลล์ที่ถูกทำลาย ปิดแผลด้วย cover wound with silicon dressing ; Mepital, hydrogel  sheet</Text>
          <Text style={styles.drugText}>- กรณีผิวหนังเปิด wet dressing with NSS</Text>
        </ScrollView>
      );
    } else if (this.state.grade == 'SEVERE') {
      return (
        <ScrollView contentContainerStyle={styles.drugBarr}>
          <Text style={[styles.drugText, { fontWeight: 'bold', color: '#005daa' }]}>* ประเมินผิวหนังตำแหน่งที่ให้สารน้ำ</Text>
          <Text style={styles.drugText}>1)  หยุดการให้สารน้ำทันที</Text>
          <Text style={styles.drugText}>2)  ดูดยาที่รั่วออกให้ได้มากที่สุดโดยใช้ syringe 5 ml (ให้ยา Antidote ตามชนิดยา)</Text>
          <Text style={styles.drugText}>3)  เอาเข็มออกและกดให้เลือดหยุด</Text>
          <Text style={styles.drugText}>4)  ประคบร้อนหรือเย็นตามชนิดของยา</Text>
          <Text style={styles.drugText}>5)  ยกบริเวณที่ยารั่วหรือบวมสูงกว่าระดับหัวใจใน 24 ชั่วโมงแรก</Text>
          <Text style={styles.drugText}>* * ติดตาม เฝ้าระวังบันทึกอาการและอาการแสดงทุก 8 ชั่วโมงเป็นเวลา 2 วัน (ลงบันทึก/ถ่ายภาพ)</Text>
          <Text style={styles.drugText}>ในกรณีที่แผลไม่ดีขึ้น รายงานแพทย์ เพื่อพิจารณา
          การรักษาเพิ่มเติม ในกรณีที่อาการรุนแรงมากขึ้นใน 24 ชั่วโมง ควรปรึกษาแพทย์ทางด้านศัลยกรรม เพื่อพิจารณาการรักษาบาดแผลต่อไป
            </Text>
          <Text style={[styles.drugText, { fontWeight: 'bold', color: '#005daa'}]}>การทำแผล</Text>
          <Text style={styles.drugText}>ผิวหนังเปิด wet dressing with NSS ทาด้วย topical silver sulfadiazine with 2% chlorhexidineacetate cream</Text>
        </ScrollView>
      );
    }
  }

  renderWay() {

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <TouchableOpacity style={this.state.show ? styles.nav2 : styles.nav} onPress={() => { this.setState({ show: true }) }}>
            <Text style={this.state.show ? styles.subheader2 : styles.subheader}>แนวทางจัดการ{"\n"}extravasation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.show ? styles.nav : styles.nav2} onPress={() => { this.setState({ show: false }) }}>
            <Text style={this.state.show ? styles.subheader : styles.subheader2}>แนวทางการพยาบาล{"\n"}และคำแนะนำ</Text>
          </TouchableOpacity>
        </View>
        {this.state.show ? this.getDrugWay() : this.getGradeWay()}
        {/* <View style={styles.bottomBar}>
          <Button
            title="Home"
            style={styles.buttonButtom}
            onPress={() => {
              { this.setState({ goHome: true }); }
            }}>

          </Button>
        </View> */}
      </View>
    );
  }

  render() {

    if (this.state.goHome) {
      return (
        <Home onPressLogout={this.props.onPressLogout}></Home>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.back} onPress={() => { this.props.onPress(); }}>
            <MaterialIcons name="arrow-back" size={40} color={this.state.grade == '' ? 'transparent' : 'white'} />
          </TouchableOpacity>
          <Text style={styles.header}>คำแนะนำในการดูแล</Text>
          <TouchableOpacity style={styles.back} onPress={() => { this.setState({ goHome: true }) }} >
            <MaterialIcons name="home" size={40} color={'white'} />
          </TouchableOpacity>
        </View>
        {this.renderWay()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    backgroundColor: '#F5F7F4',
    flexDirection: 'column',
    flex: 1,
  },
  topBar: {
    justifyContent: 'space-between',
    flex: 0.15,
    backgroundColor: '#005daa',
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    paddingLeft: 5
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: "center",
  },
  subheader: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  subheader2: {
    fontSize: 16,
    color: '#005daa',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  navBar: {
    flexDirection: 'row',
    flex: 0.15,
    justifyContent: 'space-between',
  },
  nav: {
    backgroundColor: '#F5F7F4',
    width: Dimensions.get('window').width / 2,
    borderColor: '#005daa',
    // borderEndWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav2: {
    backgroundColor: '#F5F7F4',
    width: Dimensions.get('window').width / 2,
    borderColor: '#005daa',
    // borderEndWidth: 1,
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBar: {
    flex: 0.87,
    justifyContent: 'space-around',
    marginHorizontal: 50,
    marginVertical: 50,
  },
  button: {
    height: 70,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#B6452C'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  drugBar: {
    flex: 0.7,
    // backgroundColor: 'white',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  drugText: {
    fontSize: 16,
    margin: 5,
  },
  drugBarr: {
    flex: 1,
    // backgroundColor: 'white',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  back: {
    width: 50,
  },

  bottomBar: {
    //paddingTop: isIPhoneX ? 500 : 350,
    // paddingBottom: isIPhoneX ? 10 : 5,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flex: 0.2,
    marginTop: 10,
    flexDirection: 'row',
  },
  buttonButtom:
  {
    alignSelf: 'center',
    width: 300,
    height: 400,

  },
});