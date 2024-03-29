import { TextInput, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, { useState } from "react";
import DefaultButton from '../../components/DefaultButton';
import BackButton from '../../components/BackButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../components/custom-datepicker.css";

export default function TravellingExpenseForm({ route }) {      
  const addClaim = route.params.props;
  const [claim, setClaim] = useState({creator: addClaim.creator, formId: addClaim.formId, expenseType: addClaim.expenseType, company: addClaim.company,
    country: null, exchangeRate:null, dateFrom:  new Date(), dateTo:  new Date()});


  /**
   * addTravellingClaim Function
   *
   * User adds a new travelling claim.
   * 
   * @param {object} claim - All necessary details for the new claim created.
   */
  function addTravellingClaim (claim) {
    console.log(claim)
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    fetch('http://dw.engkong.com:5000/addClaim', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(claim)})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.message == "Travelling claim added successfully!") {
            alert(data.message)
            window.location.reload(false)
          } else if(data.error == "known") {
            alert(data.message)
          } else {
            console.log(data.message)
            alert("Failed to add travelling claim!")
          }
        });
  }; 

  return (
    <View style={styles.page}>
      <View style={styles.pageDefault}>
        
        <View style={styles.topCard}> 
          <View style={styles.backButtonBar}>
            <BackButton onPress={() => window.location.reload(false)}/>
          </View>
        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} style={{height:"0px"}}>
            <View style={{width:"100%", alignItems:"center"}}>
              <View style={styles.headerBar}>
                <View style={{paddingHorizontal: '7px'}}>
                  <Text style={styles.bigText}>Travelling</Text>
                </View>
                <View style={{paddingHorizontal: '7px'}}>
                  <Text style={styles.bigText}>Form</Text>
                </View>
              </View>
            </View>
            <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
              <View style={[styles.inputContainer, {zIndex:99}]}>
                  <Text style={styles.normalBoldText}>Date - From</Text>
                  <DatePicker className="custom-input" selected={claim.dateFrom} onChange={(date) => setClaim({...claim, dateFrom: date})} dateFormat="dd/MM/yyyy"/>
              </View>
              <View style={[styles.inputContainer, {zIndex:98}]}>
                  <Text style={styles.normalBoldText}>Date - To</Text>
                  <DatePicker className="custom-input" selected={claim.dateTo} onChange={(date) => setClaim({...claim, dateTo: date})} dateFormat="dd/MM/yyyy"/>
              </View>
              <View style={[styles.inputContainer, {}]}>
                <Text style={styles.normalBoldText}>Country</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. Spain" 
                  onChangeText={(val) => setClaim({...claim, country:val})} 
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
              <View style={[styles.inputContainer, {}]}>
                <Text style={styles.normalBoldText}>Exchange Rate (1SGD = ?)</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. 0.74USD" 
                  onChangeText={(val) => setClaim({...claim, exchangeRate:val})} 
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.bottomCard}>
          <View style={{width:"100%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <View style={styles.buttonContainer}>
              <DefaultButton description='Add' onPress={() => addTravellingClaim(claim)} style={styles.defaultButton} customStyle={{width: "90%", maxWidth: "400px"}}/>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    minWidth: "330px",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "Arial",
  },
  pageDefault: {
    width: "100%",
    height: "90%",
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: "column",
  },
  topCard: {
    height: "70px",
    width:"100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  headerBar: {
      height: '95px',
      width:'60%',
      flexWrap:'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent:'center',
    },
  bigText: {
      fontSize: "35px",
      fontWeight: "900",
      fontFamily: "inherit",
  },
  mediumText: {
      fontSize: "20px",
      fontWeight: "500",
      color: "#6A6A6A",
      fontFamily: "inherit",
  },
  backButtonBar: {
      width:"90%",
  },
  bottomCard: {
    bottom: "0",
    height: "70px",
    width:"100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    borderTopWidth: "1px",
    borderColor: "#DADADA",
    backgroundColor: "white",
  },
  text: {
    fontSize: "17px",
    fontWeight: "700",
    fontFamily: "inherit",
  },
  textInput: {
    height: "35px",
    color: "#6A6A6A",
    backgroundColor: "#D9D9D9",
    borderWidth: "1px",
    borderRadius: "12px",
    padding: "10px",
    borderColor: "#DADADA",
  },
  content: {
    width:"90%",
    flex:"1",
  },
  inputContainer: {
    width:'85%',
    paddingBottom: "20px",
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
    padding: "15px",
    borderColor: "#DADADA",
  },
  inputContainer: {
    paddingVertical:'5px',
    width:'90%',
    maxWidth: '450px'
  },

  buttonContainer: {
    width:"90%",
    justifyContent:"center",
    alignItems:"center"
  },
  dropdownStyles: {
    position:"absolute",
    width:"100%",
    top:35,
    zIndex:1,
    backgroundColor:"white",
    borderColor:"#DADADA"
  },
  dropdownItemStyles: {
      marginHorizontal:"5px",
      height:"40px",
  },
  dropdownTextStyles: {
      color: "#6A6A6A",
  },
  boxStyles: {
      borderColor:"#DADADA",
  },
  inputStyles: {
      color: "#6A6A6A",
  },
});

