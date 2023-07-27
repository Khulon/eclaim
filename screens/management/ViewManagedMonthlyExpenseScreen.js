import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState } from "react";
import FullScreenImage from '../../components/FullScreenImage';
import BackButton from '../../components/BackButton';

export default function ViewManagedMonthlyExpenseScreen({ navigation, route }) {        
  const [isExpand, setIsExpand] = useState(false)
  const expenseDetails = route.params.expense
  const date = new Date(expenseDetails.date_of_expense).toLocaleDateString("en-UK");
  const [expense, setNewExpense] = useState({id: expenseDetails.id, claimee: expenseDetails.email,
    item_number: expenseDetails.item_number, type: expenseDetails.expense_type, otherType: null, date: date, 
    place: expenseDetails.place, customer: expenseDetails.customer_name, company: expenseDetails.company_name,
    with_GST: expenseDetails.total_amount, without_GST: expenseDetails.amount_without_gst, gst_amount: expenseDetails.gst_amount,
    description: expenseDetails.description, receipt: expenseDetails.receipt});

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
                    <Text style={styles.bigText}>Monthly</Text>
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
                <Text style={styles.normalBoldText}>Amount without GST</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. 20.34" 
                  value={expense.without_GST} 
                  onChangeText={(amount) => setNewExpense({...expense, without_GST: amount})}
                  autoCapitalize="none" 
                  autoCorrect={false} 
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Amount with GST</Text>
                <TextInput style={styles.textInput}
                  placeholder="eg. 25.00" 
                  value={expense.with_GST} 
                  onChangeText={(amount) => setNewExpense({...expense, with_GST: amount})}
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
                <TouchableOpacity onPress={()=>isExpand ? setIsExpand(false) : setIsExpand(true)}>
                  <Image style={styles.receiptImage}
                      source={expense.receipt}
                    />
                </TouchableOpacity>
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
});