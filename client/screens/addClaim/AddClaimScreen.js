import { TextInput, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, { useEffect, useState } from "react";
import { SelectList} from 'react-native-dropdown-select-list'
import DefaultButton from '../../components/DefaultButton';
import BackButton from '../../components/BackButton';


export default function AddClaimScreen({ navigation }) {        
  const expenseTypes = [{key: '0', value: 'Travelling'},{key: '1', value: 'Monthly'}]
  const [isExistingClaim, setIsExistingClaim] = useState(null);
  const [claim, setClaim] = useState({creator: window.localStorage.getItem('session'), formId: null, expenseType: null, company: null});
  const claimCompanies = [{key: '0', value: 'EKCA'},{key: '1', value: 'EKH'},{key: '2', value: 'Reefertec'}, {key: '3', value: 'SmartZ'}, {key: '4', value: 'PCL'}]

  /**
   * handleAddClaim Function
   *
   * Adds a new claim with the necessary details
   *
   * @param {object} claim - General details for the new claim created
   */
  async function handleAddClaim() {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    switch(isExistingClaim) {
      case 'Yes':
        fetch('http://dw.engkong.com:5000/joinClaim', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(claim)})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.message == "Joined claim successfully!") {
            alert(data.message)
            window.location.reload(false)
          } else if (data.error == "known") {
            alert(data.message);
          } else {
            console.log(data.message)
            alert("Failed to join claim!")
          }
        });
        break;
      case 'No':
        if (claim.expenseType != null) {
          if (claim.company == null) {
            alert("Please fill in the company which you are claiming from!")
            break;
          }
          (claim.expenseType == 'Travelling') ? (
            navigation.navigate("TravellingExpenseForm", {props: claim })
          ) : (
            navigation.navigate("MonthlyExpenseForm", {props: claim })
          )
        } else {
          alert("Please fill in the expense form type!")
        }
        break;
      default:
        alert("Please fill in all relevant fields!")
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.pageDefault}>

        <View style={styles.topCard}>
          <View style={styles.backButtonBar}>
            <BackButton onPress={() => navigation.goBack()}/>
          </View>
        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} style={{height:"0px"}}>
            <View style={{width:"100%", alignItems:"center"}}>
              <View style={styles.headerBar}>
                <View style={{paddingHorizontal: '7px'}}>
                  <Text style={styles.bigText}>Add</Text>
                </View>
                <View style={{paddingHorizontal: '7px'}}>
                  <Text style={styles.bigText}>Claim</Text>
                </View>
              </View>
            </View>
      
            <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
              <View style={[styles.inputContainer,{zIndex:99}]}>
              <Text style={styles.normalBoldText}>Join Existing?</Text>
              <SelectList
                dropdownStyles={styles.dropdownStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                boxStyles={styles.boxStyles}
                inputStyles={styles.inputStyles}  
                setSelected={(val) => setIsExistingClaim(val)} 
                data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                save="value"
                showsVerticalScrollIndicator = {false}
                search = {false}
              />  
            </View>
            {isExistingClaim == null ? (
              <Text></Text>
            ):(isExistingClaim == 'Yes') ? (
              <View style={[styles.inputContainer, {}]}>
                <Text style={styles.normalBoldText}>Form ID</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. 1827463" 
                  onChangeText={(formId) => setClaim({...claim, formId:formId})} 
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
            ):(
              <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
                <View style={[styles.inputContainer,{zIndex:98}]}>
                  <Text style={styles.normalBoldText}>Expense Form Type</Text>
                  <SelectList
                    dropdownStyles={styles.dropdownStyles}
                    dropdownItemStyles={styles.dropdownItemStyles}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    boxStyles={styles.boxStyles}
                    inputStyles={styles.inputStyles}  
                    setSelected={(val) => setClaim({...claim, expenseType:val})}
                    data={expenseTypes} 
                    save="value"
                    showsVerticalScrollIndicator = {false}
                    search = {false}
                  />  
                </View>
                <View style={[styles.inputContainer,{zIndex:1}]}>
                  <Text style={styles.normalBoldText}>Company</Text>
                  <SelectList
                    dropdownStyles={styles.dropdownStyles}
                    dropdownItemStyles={styles.dropdownItemStyles}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    boxStyles={styles.boxStyles}
                    inputStyles={styles.inputStyles}  
                    setSelected={(val) => setClaim({...claim, company:val})} 
                    data={claimCompanies} 
                    save="value"
                    showsVerticalScrollIndicator = {false}
                    search = {false}
                  />  
                </View>
              </View>
            )}
            </View>
          </ScrollView>
        </View>

        <View style={styles.bottomCard}>
          <View style={{width:"100%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <View style={styles.buttonContainer}>
              <DefaultButton description='Add' onPress={() => handleAddClaim()} customStyle={{width: "90%", maxWidth: "400px"}}/>
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

