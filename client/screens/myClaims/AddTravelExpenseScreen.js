import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from "react";
import { Ionicons } from "react-native-vector-icons";
import { SelectList } from 'react-native-dropdown-select-list'
import ConfirmationButton from '../../components/ConfirmationButton';
import BackButton from '../../components/BackButton';
import DefaultButton from '../../components/DefaultButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../components/custom-datepicker.css";
import FilePicker from '../../components/FilePicker';

export default function AddTravelExpenseScreen({ navigation, route }) {        
  const user = window.localStorage.getItem('session');
  const claim  = route.params.props;
  const expenseTypeDropdown = route.params.travellingExpenseTypes;
  const [expense, setExpense] = useState({id: claim.current.id, claimee: user, type: null, otherType: null,
    amount: null, date: new Date(), description: null, place: null, customer_name: null, company: null, file_data:null, file_name:null});

  /**
   * handleAddExpense Function
   * 
   * Sends a POST request to the addTravellingExpense endpoint with the expense details.
   * 
   * @param {object} expense - The expense details.
   */
  async function handleAddExpense() {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    await fetch('http://10.0.1.28:5000/addTravellingExpense', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(expense)})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.message == "Success!") {
          alert("Expense added successfully!")
          navigation.goBack()
        } else if (data.message == 'Invalid date! Date of expense must be within travelling period!' || data.error == "known") {
          alert(data.message)
        } else {
          console.log(data.message)
          alert("Failed to add expense!")
        }
      })    
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
                  <Text style={styles.bigText}>Expense</Text>
                </View>
              </View>
            </View>
            <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
              <View style={[styles.inputContainer,{zIndex:5}]}>
                <Text style={styles.normalBoldText}>Expense Type</Text>
                <SelectList
                  dropdownStyles={styles.dropdownStyles}
                  dropdownItemStyles={styles.dropdownItemStyles}
                  dropdownTextStyles={styles.dropdownTextStyles}
                  boxStyles={styles.boxStyles}
                  inputStyles={styles.inputStyles} 
                  setSelected={(type) => setExpense({...expense, type: type})}
                  data={expenseTypeDropdown} 
                  save="value"
                  showsVerticalScrollIndicator = {false}
                  search = {true}
                />  
              </View>
              {expense.type == 'Others' ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.normalBoldText}>If others, state type</Text>
                  <TextInput style={styles.textInput}
                    placeholder="eg. Overtime meal" 
                    onChangeText={(type) => setExpense({...expense, otherType: type})}
                    autoCapitalize="none" 
                    autoCorrect={false} 
                  />
                </View>
              ) : (
                <View/>
              )}
              <View style={[styles.inputContainer, {zIndex:4}]}>
                <Text style={styles.normalBoldText}>Date</Text>
                <DatePicker className="custom-input" selected={expense.date} onChange={(date) => setExpense({...expense, date: date})} dateFormat="dd/MM/yyyy"/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Amount</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. 20.34" 
                  value={expense.amount}
                  onChangeText={(amount) => setExpense({...expense, amount: amount})}
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
              {expense.type == 'Entertainment and Gifts' ? (
                <View style={{width:'100%', alignItems:'center'}}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.normalBoldText}>Place</Text>
                    <TextInput style={styles.textInput}
                      placeholder="Place" 
                      value={expense.place} 
                      onChangeText={(place) => setExpense({...expense, place: place})}
                      autoCapitalize="none" 
                      autoCorrect={false} 
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.normalBoldText}>Customer Name</Text>
                    <TextInput style={styles.textInput}
                      placeholder="Name(s)" 
                      value={expense.customer_name} 
                      onChangeText={(customer_name) => setExpense({...expense, customer_name: customer_name})}
                      autoCapitalize="none" 
                      autoCorrect={false} 
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.normalBoldText}>Company</Text>
                    <TextInput style={styles.textInput}
                      placeholder="eg. Yang Ming" 
                      value={expense.company} 
                      onChangeText={(company) => setExpense({...expense, company: company})}
                      autoCapitalize="none" 
                      autoCorrect={false} 
                    />
                  </View>
                </View>
              ):(
                  <View/>
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Description</Text>
                <TextInput style={[styles.textInput,{height:'100px'}]}
                  placeholder="Optional" 
                  value={expense.description}
                  multiline={true}
                  onChangeText={(description) => setExpense({...expense, description: description})}
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Receipt</Text>
                <FilePicker 
                  file_data={expense.file_data} 
                  file_name={expense.file_name} 
                  onChangeFile={(fileData, fileName) => setExpense({...expense, file_data: fileData, file_name: fileName })}
                  editable={true}
                />
              </View>

            </View>
          </ScrollView>
        </View>

        <View style={styles.bottomCard}>
          <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <View style={styles.buttonContainer}>
              <DefaultButton description='Cancel' onPress = {() => ConfirmationButton('Are you sure you want to cancel?', 'This expense will not be saved', () => navigation.goBack())} customStyle={{width: "90%", maxWidth: "400px"}}/>
            </View>
            <View style={styles.buttonContainer}>
              <DefaultButton description='Add' onPress = {() => ConfirmationButton('Are you sure you want to add this expense?', 'OK to confirm',() => handleAddExpense())} customStyle={{width: "90%", maxWidth: "400px"}} buttonColor={"#45B097"}/>
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
  imageInput: {
    width:'100%',
    height: "400px",
    color: "#6A6A6A",
    borderWidth: "1px",
    borderRadius: "12px",
    padding: "15px",
    borderColor: "#DADADA",
    position:"absolute", 
    backgroundColor:'#F4F4F4', 
    zIndex:-1,
    justifyContent:'center',
    alignItems:'center'
  },
  receiptImage: {
    width:'100%',
    height: "400px",
    borderRadius:'12px',
    borderWidth:'1px',
    borderColor:'#DADADA' 
  },
  inputContainer: {
    paddingVertical:'5px',
    width:'90%',
    maxWidth: '450px'
  },
  buttonContainer: {
    width:"50%",
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