import { TextInput, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, { useState } from "react";
import DefaultButton from '../../components/DefaultButton';
import BackButton from '../../components/BackButton';

export default function MonthlyExpenseForm({route}) {        

  const addClaim = route.params.props;
  const [claim, setClaim] = useState(
    {creator: addClaim.creator, formId: addClaim.formId, expenseType: addClaim.expenseType, 
    payPeriodFrom: null, payPeriodTo: null, costCenter: null, note: null});

  function addMonthlyClaim (claim) {
    console.log(claim)
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    fetch('http://10.0.1.28:5000/addClaim', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(claim)})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.message == "Monthly claim added successfully!") {
            alert("Monthly claim added successfully!")
            window.location.reload(false)
          } else {
            alert("Error adding monthly claim!")
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
                  <Text style={styles.bigText}>Monthly</Text>
                </View>
                <View style={{paddingHorizontal: '7px'}}>
                  <Text style={styles.bigText}>Expense</Text>
                </View>
              </View>
            </View>
            <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
              <View style={[styles.inputContainer]}>
                <Text style={styles.normalBoldText}>Pay Period - From</Text>
                <TextInput style={styles.textInput}
                  placeholder="dd/mm/yyyy" 
                  onChangeText={(val) => setClaim({...claim, payPeriodFrom: val})} 
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={styles.normalBoldText}>Pay Period - To</Text>
                <TextInput style={styles.textInput}
                  placeholder="dd/mm/yyyy" 
                  onChangeText={(val) => setClaim({...claim, payPeriodTo: val})} 
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={styles.normalBoldText}>Cost Center</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. SG Depot" 
                  onChangeText={(val) => setClaim({...claim, costCenter: val})} 
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
              <DefaultButton description='Add' onPress={() => addMonthlyClaim(claim)} style={styles.defaultButton} customStyle={{width: "90%", maxWidth: "400px"}}/>
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