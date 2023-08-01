import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from "react";
import FullScreenImage from '../../components/FullScreenImage';
import BackButton from '../../components/BackButton';
import FilePicker from '../../components/FilePicker';

export default function ViewManagedTravelExpenseScreen({ navigation, route }) {        
  const [isExpand, setIsExpand] = useState(false)
  const expenseDetails = route.params.expense
  const date = new Date(expenseDetails.date_of_expense).toLocaleDateString("en-UK");
  const uint8Array = new Uint8Array(expenseDetails.receipt.data);
  // Convert the Uint8Array to a UTF-8 string using TextDecoder
  const utf8String = new TextDecoder().decode(uint8Array);
  const [expense, setNewExpense] = useState({id: expenseDetails.id, claimee: expenseDetails.email,
    item_number: expenseDetails.item_number, type: expenseDetails.expense_type, otherType: null, date: date,
    amount: expenseDetails.total_amount.toFixed(2), description: expenseDetails.description, receipt: expenseDetails.receipt,
    place: expenseDetails.place, customer: expenseDetails.customer_name, company: expenseDetails.company_name, file_data: utf8String, file_name: expenseDetails.file_name});

  return (
    <View style={styles.page}>
      <FullScreenImage image={expense.receipt} myFunction={()=>{isExpand ? setIsExpand(false) : setIsExpand(true)}} show={isExpand}/>
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
                    <Text style={styles.bigText}>Travel</Text>
                  </View>
                  <View style={{paddingHorizontal: '7px'}}>
                    <Text style={styles.bigText}>Expense</Text>
                  </View>
                </View>
              </View>
              <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Expense Type</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. Overtime meal"
                  value={expense.type}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={false}
                  />
              </View>
              {expense.type == 'Others' ? (
                <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>If others, state type</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. Overtime meal"
                  onChangeText={(type) => setNewExpense({...expense, otherType: type})}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={false}
                />
                </View>
              ) : (
                <View/>
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Date</Text>
                <TextInput style={styles.textInput}
                  placeholder="dd/mm/yyyy"
                  value={expense.date}
                  onChangeText={(date) => setNewExpense({...expense, date: date})}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Amount</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. 20.34"
                  value={expense.amount}
                  onChangeText={(amount) => setNewExpense({...expense, amount: amount})}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={false}
                />
              </View>
              {expense.type == 'Entertainment and Gifts' ? (
                <View style={{width:'100%', alignItems:'center'}}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.normalBoldText}>Place</Text>
                    <TextInput style={styles.textInput}
                      placeholder="Place" 
                      value={expense.place} 
                      onChangeText={(place) => setNewExpense({...expense, place: place})}
                      autoCapitalize="none" 
                      autoCorrect={false} 
                      editable={false}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.normalBoldText}>Customer Name</Text>
                    <TextInput style={styles.textInput}
                      placeholder="eg. Tom Liu, Jane Tan" 
                      value={expense.customer} 
                      onChangeText={(customer) => setNewExpense({...expense, customer: customer})}
                      autoCapitalize="none" 
                      autoCorrect={false} 
                      editable={false}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.normalBoldText}>Company</Text>
                    <TextInput style={styles.textInput}
                      placeholder="eg. Yang Ming" 
                      value={expense.company} 
                      onChangeText={(company) => setNewExpense({...expense, company: company})}
                      autoCapitalize="none" 
                      autoCorrect={false} 
                      editable={false}
                    />
                  </View>
                </View>
              ):(
                <View/>
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Description</Text>
                <TextInput style={[styles.textInput,{height:'100px'}]}
                  placeholder="Desciption of expense"
                  value={expense.description}
                  multiline={true}
                  onChangeText={(description) => setNewExpense({...expense, description: description})}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={false}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Receipt</Text>
                <FilePicker 
                  file_data={expense.file_data} 
                  file_name={expense.file_name} 
                  editable={false}
                />
              </View>
            </View>
          </ScrollView>
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
      flexDirection:'row',
      justifyContent:'space-between'
  },

  deleteButton: {
    width:'40px',
    height:'40px',
    alignItems: 'center',
    justifyContent: 'center',
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

});


