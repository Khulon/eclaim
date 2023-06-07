import { Animated, TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations';
import { Ionicons } from "react-native-vector-icons";
import { SelectList } from 'react-native-dropdown-select-list'
import ConfirmationButton from '../../components/ConfirmationButton';
import * as ImagePicker from 'expo-image-picker';






export default function EditTravelExpenseScreen({ navigation, route }) {        


 
  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const CancelButtonHover = useRef(new Animated.Value(0)).current;
  const SaveButtonHover = useRef(new Animated.Value(0)).current;






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


    backButton: {
        fontFamily: "inherit",
        backgroundColor: "#D9D9D9",
        border: "none",


        alignItems: 'center',
        justifyContent: 'center',
       
        width: isBackButtonHover ? "43px" :"40px",
        height: isBackButtonHover ? "43px" :"40px",
        borderRadius: "14px",


        cursor: "pointer"
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
   
    defaultButton: {
      fontFamily: "inherit",
      backgroundColor: "#E04F4F",
      border: "none",
 
      padding: "10px",
      color: "white",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "700",
     
      height: "40px",
      borderRadius: "14px",
 
      cursor: "pointer"
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
    height: "100px",
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


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    console.log(result.uri);


    if (!result.canceled) {
      setNewExpense({...expense, receipt: result.uri})
    }
}




function updateExpense(expense) {
  const header = {'Content-Type': 'application/json' };
  fetch('http://localhost:5000/editTravellingExpense', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(expense)})
      .then(response => response.json())
      .then(data => {
          console.log(data);
          if(data.message == "Expense updated!") {
            alert("Expense updated!")
            navigation.goBack();
          } else {
            alert("Failed to update expense!")
          }
          })


}


function deleteExpense(expense) {
  const header = {'Content-Type': 'application/json' };
  fetch('http://localhost:5000/deleteTravellingExpense', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(expense)})
      .then(response => response.json())
      .then(data => {
          console.log(data);
          if(data.message == "Expense deleted!") {
            alert("Expense deleted!")
            navigation.goBack();
          } else {
            alert("Failed to delete expense!")
          }
          })
}


const expenseDetails = route.params.expense
const date = new Date(expenseDetails.date).toLocaleDateString("en-UK");
const expenseTypeDropdown = route.params.travellingExpenseTypes
const [expense, setNewExpense] = useState({id: expenseDetails.id, claimee: expenseDetails.email,
  item_number: expenseDetails.item_number, type: expenseDetails.expense_type, otherType: null, date: date,
   amount: expenseDetails.amount, description: expenseDetails.description, receipt: expenseDetails.receipt});

  return (
    <View style={styles.page}>
      <View style={styles.pageDefault}>
      <View style={styles.topCard}>
       
      <View style={styles.backButtonBar}>
      <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress={() => navigation.goBack()}>
        <View style={styles.backButton}>
          <Text><Ionicons name="chevron-back-outline" color="#444"/></Text>
        </View>
        <View style={{paddingHorizontal:'20px'}}>
          <Text style={styles.mediumText}>Go Back</Text>
        </View>
      </TouchableOpacity>
      </View>
      </View>


      <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false} style={{height:"0px"}}>
        <View style={{width:"100%", alignItems:"center"}}>
        <View style={styles.headerBar}>
        <View style={{paddingHorizontal: '7px'}}>
          <Text style={styles.bigText}>Edit</Text>
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
                setSelected={(type) => setNewExpense({...expense, type: type})}
                data={expenseTypeDropdown}
                placeholder = {expense.type}
                save="value"
                showsVerticalScrollIndicator = {false}
                search = {false}
            />  
        </View>
       
        {expense.type == 'Others' ? (
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>If others, state type</Text>
          <TextInput style={styles.textInput}
            placeholder="eg. Overtime meal"
            //value={expense.type}
            onChangeText={(type) => setNewExpense({...expense, otherType: type})}
            autoCapitalize="none"
            autoCorrect={false}
          />
          </View>
        ) : (
          <View></View>
        )}

        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Date</Text>
        <TextInput style={styles.textInput}
          placeholder="dd/mm/yyyy"
          value={expense.date}
          onChangeText={(date) => setNewExpense({...expense, date: date})}
          autoCapitalize="none"
          autoCorrect={false}
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
        />
        </View>
       

        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Description</Text>
        <TextInput style={[styles.textInput,{height:'100px'}]}
          placeholder="Desciption of expense"
          value={expense.description}
          multiline={true}
          onChangeText={(description) => setNewExpense({...expense, description: description})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        </View>
       
        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Receipt</Text>
        <TouchableOpacity onPress={()=> pickImage()}>
          <Image style={styles.receiptImage}
            source={expense.receipt}
          />
          <View style={[styles.imageInput]}>
          <Text><Ionicons name="images-outline" color="#444444" size='25px'/></Text>
          </View>
          </TouchableOpacity>

        </View>


      </View>

      </ScrollView>
   
      </View>


      <View style={styles.bottomCard}>
        <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(CancelButtonHover)} onMouseLeave={() => MovePosAnimation(CancelButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: CancelButtonHover }]}}>
        <TouchableOpacity onPress={() => ConfirmationButton('Are you sure you want to delete this expense?', 'Click ok to confirm deletion.', () => deleteExpense(expense))} style={styles.defaultButton} > Delete </TouchableOpacity>
        </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(SaveButtonHover)} onMouseLeave={() => MovePosAnimation(SaveButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: SaveButtonHover }]}}>
        <TouchableOpacity style={[styles.defaultButton,{backgroundColor:"#45B097"}]} onPress = {() => ConfirmationButton('Are you sure you want to save these changes?', 'Expense details will be updated', () => updateExpense(expense))}> Save </TouchableOpacity>
        </Animated.View>
        </View>
        </View>

      </View>


      </View>
    </View>
   
  );
}


