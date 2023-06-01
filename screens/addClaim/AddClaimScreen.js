import { Animated, TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations'; 
import { Ionicons } from "react-native-vector-icons";
import { SelectList} from 'react-native-dropdown-select-list'



export default function AddClaimScreen({ navigation }) {        
  
  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const AddButtonHover = useRef(new Animated.Value(0)).current;
  


  /*
  const companies = [
    {key:'0', value:'EKCA'},
    {key:'1', value:'Reefertec'},
    {key:'2', value:'PCL'},
    {key:'3', value:'SmartZ'},
    {key:'4', value:'EKH'},
    ]
 */
  const expenseTypes = [
    {key:'0', value:'Travelling'},
    {key:'1', value:'Monthly'},
    ]


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
    
    defaultButton: {
      fontFamily: "inherit",
      backgroundColor: "#E04F4F",
      border: "none",
  
      width:'100%',
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


  function handleAddClaim() {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    switch(isExistingClaim) {
      case 'Yes':
        //handleJoin() using form id
        // Insert into claimee (trigger updates claimee count on Claims table)
        
        fetch('http://localhost:5000/joinClaim', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(claim)})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.message == "Joined claim successfully!") {
            alert("Joined claim successfully!")
            window.location.reload(false)
          } else {
            alert("Error joining claim!")
          }
        });
        
        break;
      case 'No':

        if (claim.expenseType != null) {
          (claim.expenseType == 'Travelling') ? (
            navigation.navigate("TravellingExpenseForm", {props: claim })
          ) : (
            navigation.navigate("MonthlyExpenseForm", {props: claim })
          )
        }
        else {
          alert("Please fill in all relevant fields!")
        }
        break;
      default:
        alert("Please fill in all relevant fields!")
    }

  }

  
  const [isExistingClaim, setIsExistingClaim] = useState(null);
  const [claim, setClaim] = useState({creator: window.localStorage.getItem('session'), formId:null, expenseType:null});


  return (
    <View style={styles.page}>
      <View style={styles.pageDefault}>
      <View style={styles.topCard}>
        
      <View style={styles.backButtonBar}>
      <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress={() => window.location.reload(false)}>
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
          <Text style={styles.bigText}>Add</Text>
        </View>
        <View style={{paddingHorizontal: '7px'}}>
          <Text style={styles.bigText}>Claim</Text>
        </View>
        </View>
        </View>
  

      <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
      
        <View style={[styles.inputContainer,{zIndex:3}]}>
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
        {isExistingClaim == '' ? (
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
          <View style={{width:'100%', alignItems:'center'}}>
          <View style={[styles.inputContainer,{zIndex:2}]}>
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
            </View>
        )}

      </View>


      </ScrollView>
    
      </View>



      <View style={styles.bottomCard}>
        <View style={{width:"100%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(AddButtonHover)} onMouseLeave={() => MovePosAnimation(AddButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: AddButtonHover }]}}>
        <TouchableOpacity onPress={() => handleAddClaim()} style={styles.defaultButton} > Add </TouchableOpacity>
        </Animated.View>
        </View>

        
        </View>

      </View>


      </View>
    </View>
    
  );
}


