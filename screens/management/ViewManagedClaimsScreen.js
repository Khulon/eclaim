import { Animated, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, FlatList, ActivityIndicator, Touchable} from 'react-native';
import React, { useRef, useState, useEffect, useContext, createContext } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations'; 
import { Ionicons, Feather } from "react-native-vector-icons";
import filter from "lodash.filter"
import ConfirmationButton from '../../components/ConfirmationButton';
import { useIsFocused } from "@react-navigation/native";
import { parseDate, parseDatePeriod } from '../../functions/Parsers';


export default function ViewManagedClaimsScreen({ navigation, route}) {
  const isFocused = useIsFocused();
  const [claim] = useState(route.params.props);    
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  
  const userDetails = JSON.parse(window.localStorage.getItem('details'))

  const SubmitButtonHover = useRef(new Animated.Value(0)).current;
  const AddButtonHover = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true)
      fetchData()
    }
    
  }, [isFocused]);

  async function fetchData() {
    try {
      const id = claim.id;
      const user = claim.form_creator;
      await fetch(`http://localhost:5000/getExpenses/${user}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFullData(data);
        setData(data)
      });

      setIsLoading(false)
    } catch (error) {
      alert("Failed to load. Please check your internet connection!")
      setIsLoading(false)
    }

  } 

  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const [selectedId, setSelectedId] = useState({emailAndItemNumber: []});
  const [search, setSearch] = useState('')

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
    loadingPage: {
      position:'absolute',
      height:'100%',
      width:'100%',
      zIndex: isLoading ? 999 : -1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'black',
      opacity: isLoading ? '50%' : '0%'
    },
    pageDefault: {
      width: "100%",
      height: "90%",
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: "column",
      
    },
    topCard: {
      height: "130px",
      width:"100%",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "column",
      borderBottomWidth: "2px",
      borderColor: "#DADADA"
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
      height: ((userDetails.approver == "Yes" && claim.status == "Approved") || claim.status == "Processed") ? "70px" : "100px",
      width:"100%",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "column",
      borderTopWidth: "2px",
      borderColor: "#DADADA",
      backgroundColor: "white",
    },
    buttonContainer: {
        width:"50%",
        justifyContent:"center",
        alignItems:"center"
    },

    text: {
      fontSize: "17px",
      fontWeight: "700",
      fontFamily: "inherit",
    },
    textInput: {
      height: "35px",
      width:'100%',
      color: "#6A6A6A",
      backgroundColor: "#D9D9D9",
      borderWidth: "1px",
      borderRadius: "12px",
      padding: "10px",
      borderColor: "#DADADA",
    },

    content: {
      width:"95%",
      flex:"1",
    },

    inputContainer: {
      paddingVertical:'5px',
      width:'85%',
      paddingBottom: "15px",
      flexDirection:'row-reverse'
    },
    defaultButton: {
      backgroundColor: "#E04F4F",
      border: "none",
      
      height: "40px",
      borderRadius: "14px",
  
      cursor: "pointer"
    },
    buttonText: {
      fontFamily: "inherit",
      padding: "10px",
      color: "white",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "700",
    },

    userCard: {
      backgroundColor: 'white',
      height:"80px",
      padding: "10px",
      borderBottomWidth: "0.5px",
      borderTopWidth: "0.5px",
      borderColor: "#DADADA",
      flexDirection: "row",
      alignItems:"center"
    },

  });

  function totalAmount () {
    if (userDetails.email == claim.form_creator) {
      return '$' + (claim.total_amount)
    } else {
      var amount = 0
      if(fullData != null){
        for (var i = 0; i < fullData.length; i++) {
          amount += (fullData[i].total_amount)
        }
      }
      return '$' + amount
    }
  }


  function handleViewExpense(item) {
    console.log(item)
    
    if(claim.form_type == 'Travelling') {
      navigation.navigate("ViewManagedTravelExpenseScreen", {expense: item, claimStatus: claim.status})
    } else {
      navigation.navigate('ViewManagedMonthlyExpenseScreen', {expense: item, claimStatus: claim.status})
    } 
  }


  function handleSearch (search) {
    setSearch(search)
    const formattedQuery = search.toLowerCase();
    const filteredData = filter(fullData, (expense)=> {
      return contains(expense, formattedQuery)
    })
    setData(filteredData)
    //console.log(filteredData)
  }

  const contains = ({name, expense_type}, query) => {
    name = name.toLowerCase()
    expense_type = expense_type.toLowerCase()
    if (name.includes(query) || expense_type.includes(query)) {
      return true
    }
    return false
  }


  const Item = ({receipt, checked, date, name, type, amount , backgroundColor, transform, onPress, onMouseEnter, onMouseLeave}) => (
    <TouchableOpacity onPress={onPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={[styles.userCard,{backgroundColor},{transform}]}>
      <View style={{height:"100%", width:"10%", minWidth:"30px", alignItems: "center", justifyContent: "center"}}>
        <Text>
        {type=='Transport'?(
          <Ionicons  name="car-outline" color="#444" size="25px"/>
        ):type=='Entertainment'?(
          <Ionicons  name="gift-outline" color="#444" size="25px"/>
        ):type=='Mobile'?(
          <Ionicons  name="call-outline" color="#444" size="25px"/>
        ):type=='Fuel'?(
          <Ionicons  name="color-fill-outline" color="#444" size="25px"/>
        ):type=='Vehicle_repair'?(
          <Ionicons  name="construct-outline" color="#444" size="25pxe"/>
        ):type=='Medical'?(
          <Ionicons  name="medkit-outline" color="#444" size="25px"/>
        ):(
          <Ionicons  name="reader-outline" color="#444" size="25px"/>
        )}
      </Text>
      </View>

      <View style={{height:"100%", width:"50%", minWidth:"200px", justifyContent:"center"}}>
        <Text style={{fontSize: "13px", fontWeight:"700"}}>{date}</Text>
        <Text style={{color:"#444444", fontSize: "11px", marginLeft:"25px"}}>Name: {name}</Text>
        <Text style={{color:"#444444", fontSize: "11px", marginLeft:"25px"}}>Type: {type}</Text>
        <Text style={{color:"#444444", fontSize: "11px", marginLeft:"25px"}}>Cost: ${amount}</Text>
      </View>
      
        <View style={{flexGrow:1, height:'100%', flexDirection:'row-reverse'}}>
            <View style={{width:'15%', height:'100%'}}></View>

            {checked == 'No' ? (
                <View style={{width:'30px', flexDirection:'row-reverse'}}>
                <Text><Ionicons name="alert-circle-outline" color="#E04F4F" size="22px"></Ionicons></Text>
                </View>
            ):(
                <View></View>
            )}
            
            {receipt != null ? (
                <Text><Ionicons name="document-attach-outline" color="#444" size="20px"></Ionicons></Text>
            ):(
                <View></View>
            )}
        
        </View>
      
    </TouchableOpacity>
  );


  const renderItem = ({item}) => {

    const backgroundColor = item.email == selectedId.emailAndItemNumber[0] ? item.item_number == selectedId.emailAndItemNumber[1] ? '#EEEEEE' : 'white' : 'white';
    const transform = item.email == selectedId.emailAndItemNumber[0] ? item.item_number == selectedId.emailAndItemNumber[1] ? [{translateX: 2 }] : [{translateX: 0 }] : [{translateX: 0 }];
    

    return (
      <Item 
        email = {item.email}
        item_number = {item.item_number}
        receipt = {item.receipt}
        date = {parseDate(item.date_of_expense)}
        checked = {item.checked}
        name = {item.name} 
        type = {item.expense_type}
        amount = {item.total_amount}

        onMouseEnter={() => setSelectedId({...selectedId, emailAndItemNumber: [item.email, item.item_number]})}
        onMouseLeave={() => setSelectedId({...selectedId, emailAndItemNumber: []})}

        onPress={() => handleViewExpense(item)}
        backgroundColor={backgroundColor}
        transform={transform}
      />
    )
  }

  const monthlyPeriod = parseDatePeriod(claim.pay_period_from, claim.pay_period_to)
  const travellingPeriod = parseDatePeriod(claim.period_from, claim.period_to)


  return (
    <View style={styles.page}>
      <View style={styles.loadingPage}>
        <ActivityIndicator size='large' color="#E04F4F" />
      </View>

      <View style={styles.pageDefault}>
      <View style={styles.topCard}>
        <View style={{width:'100%', flexDirection:'row',paddingBottom:"10px"}}>

          <View style={{width:'100%', position:'absolute',zIndex:999, justifyContent:'space-between', flexDirection:'row'}}>
          <View style={{width:'23%', alignItems:'center'}}>
            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
            <Text><Ionicons name="chevron-back-outline" color="#444"/></Text>
            </View>
            </TouchableOpacity>
          </View>
          </View>


            <View style={{width:'100%', alignItems:"center"}}>
            <Text style={{fontSize:'16px', fontWeight:'600'}}>{claim.form_type == 'Travelling' ? travellingPeriod : monthlyPeriod}</Text>
            <Text style={{fontSize:'12px'}}>Creator: {claim.form_creator}</Text>
            </View>
          </View>
        <Text style={{fontFamily:"inherit", fontSize: "26px", fontWeight:"700"}}>{claim.form_type} Claim</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput}
            placeholder="Search" 
            value={search} 
            onChangeText={(search) => handleSearch(search)} 
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          <View style={{height:'35px', width:'35px', position:'absolute', alignItems:'center', justifyContent:'center'}}>
          <Text style={{paddingRight:'10px'}}><Ionicons name="search-outline" color="#444" size='large'/></Text>
          </View>

        </View>
      </View>


      <View style={styles.content}>
      <FlatList
        style={{height:"0px"}}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>



      <View style={styles.bottomCard}>
        <View style={{position:'absolute', width:'100%', height:'100%', flexDirection:'row-reverse'}}>
            <Text style={{paddingTop:'5px', paddingRight:'10px'}}>ID: {claim.id}</Text>
        </View>
        <Text style={{paddingTop:"15px"}}>Total:</Text>
        <Text style={{paddingBottom: "10px", fontFamily:"inherit", fontSize: "20px", fontWeight:"700"}}>{totalAmount()}</Text>

        {userDetails.approver == 'Yes' ? (
          claim.status == "Submitted" ? (
          <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <View style={styles.buttonContainer}>
          <Animated.View onMouseEnter={() => MoveNegAnimation(SubmitButtonHover)} onMouseLeave={() => MovePosAnimation(SubmitButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: SubmitButtonHover }]}}>
          <TouchableOpacity style={[styles.defaultButton,{backgroundColor:"#45B097"}]} onPress = {() => ConfirmationButton('Are you sure you want to approve?', 'You will still be able to view status under Management', () => console.log('approve'))}> <Text style={styles.buttonText}>Approve</Text> </TouchableOpacity>
          </Animated.View>
          </View>
  
          <View style={styles.buttonContainer}>
          <Animated.View onMouseEnter={() => MoveNegAnimation(AddButtonHover)} onMouseLeave={() => MovePosAnimation(AddButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: AddButtonHover }]}}>
          <TouchableOpacity onPress={() => ConfirmationButton('Are you sure you want to reject?', 'You will no longer see this in claim until submitted again', () => console.log('reject'))} style={styles.defaultButton} > <Text style={styles.buttonText}>Reject</Text> </TouchableOpacity>
          
          </Animated.View>
          </View>
          </View>
          ) : (
            <View></View>
          )
          
        ):(
          //Processor
          userDetails.processor == 'Yes' && claim.status == "Approved" ? (
            <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <View style={styles.buttonContainer}>
            <Animated.View onMouseEnter={() => MoveNegAnimation(SubmitButtonHover)} onMouseLeave={() => MovePosAnimation(SubmitButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: SubmitButtonHover }]}}>
            <TouchableOpacity style={[styles.defaultButton,{backgroundColor:"#45B097"}]} onPress = {() => ConfirmationButton('Are you sure you want to process?', 'The form creator will be notified', () => console.log('approve'))}> <Text style={styles.buttonText}>process</Text> </TouchableOpacity>
            </Animated.View>
            </View>
    
            <View style={styles.buttonContainer}>
            <Animated.View onMouseEnter={() => MoveNegAnimation(AddButtonHover)} onMouseLeave={() => MovePosAnimation(AddButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: AddButtonHover }]}}>
            <TouchableOpacity onPress={() => ConfirmationButton('Are you sure you want to reject?', 'You will no longer see this in claim until approved again', () => console.log('reject'))} style={styles.defaultButton} > <Text style={styles.buttonText}>Reject</Text>  </TouchableOpacity>
            
            </Animated.View>
            </View>
            </View>
            ) : (
                <View></View>
          )
        )}

      

      </View>


      </View>

    </View>
    


    
  );
}

