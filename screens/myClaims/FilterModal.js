import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, { useState, useRef} from 'react';
import BackButton from '../../components/BackButton';
import DatePicker from "react-datepicker";
import DefaultButton from '../../components/DefaultButton';


export default function FilterModal({ closeModal }) {

    const [startDate, setStartDate ] = useState(new Date())
    const [endDate, setEndDate ] = useState(new Date())

    return (
        <View style={styles.page}>
            <View style={styles.defaultPage}>

                <View style={styles.topBar}>
                <BackButton onPress={closeModal} hideText={true}/>
                </View>

                <View style={styles.headerBar}>
                    <View style={{paddingHorizontal: '7px'}}>
                        <Text style={styles.bigText}>Filter</Text>
                    </View>
                    <View style={{padding: '7px'}}>
                        <Text style={styles.bigText}>Inputs</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{width:'100%',height:'0px'}} showsVerticalScrollIndicator={false}>
                    <View style={{ width:'100%', alignItems:'center', justifyContent:'center'}}>
                        <View style={[styles.inputContainer, {zIndex:99}]}>
                            <Text style={styles.normalBoldText}>Date - From</Text>
                            <DatePicker className="custom-input" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                        </View>
                        <View style={[styles.inputContainer, {zIndex:98}]}>
                            <Text style={styles.normalBoldText}>Date - To</Text>
                            <DatePicker className="custom-input" selected={endDate} onChange={(date) =>  setEndDate(date)} dateFormat="dd/MM/yyyy" />
                        </View>
                    </View>
                </ScrollView>
                    
                <View style={{ width: '100%', height:'60px', justifyContent:'center', alignItems: 'center'}}>
                <DefaultButton description='Feature not working yet' onPress={() => applyFilter()} customStyle={{width: "90%", maxWidth: "400px"}}/>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create(
    {
      page: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
      },
      defaultPage: {
        height: "90%",
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
      },
      topBar: {
        height: "50px",
        width:"90%",
        alignItems: "center",
        flexDirection: "row",
      },
      headerBar: {
        height: '50px',
        width:'90%',
        flexWrap:'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
      },
      bigText: {
        fontSize: "25px",
        fontWeight: "900",
        fontFamily: "inherit",
      },
      normalBoldText: {
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "inherit",
        paddingVertical:'10px'
      },
      textInput: {
        height: "45px",
        color: "#6A6A6A",
        borderWidth: "1px",
        borderRadius: "12px",
        padding: "10px",
        borderColor: "#DADADA",
      },
      inputContainer: {
        height:'100px',
        paddingVertical:'5px',
        width:'90%',
      },
    });
  
  