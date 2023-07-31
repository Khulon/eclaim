import { TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { Ionicons, Feather } from "react-native-vector-icons";
import filter from "lodash.filter"
import ConfirmationButton from '../../components/ConfirmationButton';
import { useIsFocused } from "@react-navigation/native";
import { parseDate, parseDatePeriod } from '../../functions/Parsers';
import Tooltip from '../../components/Tooltip';
import LoadingPage from '../../components/LoadingPage';
import DefaultButton from '../../components/DefaultButton';
import BackButton from '../../components/BackButton';


export default function EditClaimScreen({ navigation, route}) {
  const isFocused = useIsFocused();
  const claim = useRef(route.params.props);  
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  
  const userDetails = JSON.parse(window.localStorage.getItem('details'))
  const [travellingExpenseTypes, setTravellingExpenseTypes] = useState([])
  const [monthlyExpenseTypes, setMonthlyExpenseTypes] = useState([])
  const [isDeleteButtonHover, setIsDeleteButtonHover] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedItemNo, setSelectedItemNo] = useState('');
  const [search, setSearch] = useState('')
  const monthlyPeriod = parseDatePeriod(claim.current.pay_period_from, claim.current.pay_period_to)
  const travellingPeriod = parseDatePeriod(claim.current.period_from, claim.current.period_to)


  useEffect(() => {
    if (isFocused) {
      setIsLoading(true)
      fetchData()
    }
    
  }, [isFocused, claim]);

  async function fetchData() {
    try {
      const id = claim.current.id;
      const user = window.localStorage.getItem('session');
      const token = window.localStorage.getItem('token');
      let [res1, res2, res3] = await Promise.all([
      fetch(`http://10.0.1.28:5000/getExpenses/${user}/${id}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.message == "Token expired!") {
          throw new Error("Token expired!")
        }
        
        setFullData(data);
        setData(data)
        claim.current.total_amount = 0
        for (var i = 0; i < data.length; i++) {
          claim.current.total_amount += (data[i].total_amount)
        }
        console.log(claim.current.total_amount)
      }),
      fetch('http://10.0.1.28:5000/getTravellingExpenseTypes')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        for(let i = 0; i < data.length; i++) {
          data[i] = {value: data[i].type}
        }
        setTravellingExpenseTypes(data)
      }),
      fetch('http://10.0.1.28:5000/getMonthlyExpenseTypes')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        for(let i = 0; i < data.length; i++) {
          data[i] = {value: data[i].type}
        }
        setMonthlyExpenseTypes(data)
      })
    ])
      setIsLoading(false)
    } catch (error) {
      if(error.message == "Token expired!") {
        window.localStorage.clear()
        window.location.reload(false)
        alert("Session expired! Please login again.")
      } else {
        alert("Failed to load. Please check your internet connection!")
      }
      setIsLoading(false)
    }
  }

  function addExpense () {  
    claim.current.form_type == 'Travelling' 
    ? navigation.navigate("AddTravelExpenseScreen",
     {props: claim, travellingExpenseTypes: travellingExpenseTypes}) 
     : navigation.navigate("AddMonthlyExpenseScreen", {props: claim, monthlyExpenseTypes: monthlyExpenseTypes}) 
  }

  function handleEditExpense(item) {
    console.log(item)
    if(claim.current.form_type == 'Travelling') {
      navigation.navigate("EditTravelExpenseScreen", {expense: item, travellingExpenseTypes: travellingExpenseTypes, claimStatus: claim.current.status})
    } else {
      if (userDetails.email == claim.current.form_creator) {
        fetch('http://10.0.1.28:5000/checkExpense', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
            })
            .then(response => response.json())
      }
      navigation.navigate('EditMonthlyExpenseScreen', {expense: item, monthlyExpenseTypes: monthlyExpenseTypes, claimStatus: claim.current.status})
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

  function handleDeleteClaim (claim) {
    console.log(claim)
    fetch('http://10.0.1.28:5000/deleteClaim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(claim)})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.message == "Claim deleted!") {
          alert(data.message)
          window.location.reload(false)
        } else {
          console.log(data.message)
          alert("Claim could not be deleted!")
        }
      })
  }

  function handleSubmit (claim) {
    var parsedDate = ''
    if(claim.current.form_type == 'Travelling') {
      parsedDate = travellingPeriod
    } else {
      parsedDate = monthlyPeriod
    }
    fetch('http://10.0.1.28:5000/submitClaim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({claim: claim, parsedDate: parsedDate})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.message == "Claim submitted!") {
          alert('Claim submitted successfully!')
          window.location.reload(false)
        } else if (data.error == "known") {
          alert(data.message)
        } else {
          alert('Claim could not be submitted!')
        }
      })
  }

  const Item = ({receipt, checked, date, item_number, name, type, amount , backgroundColor, transform, onPress, onMouseEnter, onMouseLeave}) => (
    <TouchableOpacity onPress={onPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={[styles.userCard,{backgroundColor},{transform}]}>
      <View style={{height:"100%", width:"10%", minWidth:"30px", alignItems: "center", justifyContent: "center"}}>
        <Text>
          {type=='Transport'?(
            <Tooltip text={'Transport Expense'}>
              <Ionicons  name="car-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Entertainment'?(
            <Tooltip text={'Entertainment Expense'}>
              <Ionicons  name="gift-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Mobile'?(
            <Tooltip text={'Mobile Expense'}>
              <Ionicons  name="call-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Fuel'?(
            <Tooltip text={'Fuel Expense'}>
              <Ionicons  name="color-fill-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Vehicle Repair'?(
            <Tooltip text={'Vehicle Repair Expense'}>
              <Ionicons  name="construct-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Medical'?(
            <Tooltip text={'Medical Expense'}>
              <Ionicons  name="medkit-outline" color="#444" size="25px"/>
            </Tooltip>
          ):(
            <Tooltip text={'Other Expenses'}>
              <Ionicons  name="reader-outline" color="#444" size="25px"/>
            </Tooltip>
          )}
        </Text>
      </View>

      <View style={{height:"100%", width:"90%", minWidth:"200px", justifyContent:"center"}}>
        <Text style={{fontSize: "16px", fontWeight:"700"}}>{item_number}. {date}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Name: {name}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Type: {type}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Cost: ${amount}</Text>
      </View>
      
      <View style={{flexGrow:1, height:'100%', flexDirection:'row-reverse'}}>
        <View style={{width:'15%', height:'100%'}}></View>
        {checked == 'No' ? (
          <View>
            <Tooltip text={'Pending Check'}>
              <Ionicons name="alert-circle-outline" color="#E04F4F" size="25px"></Ionicons>
            </Tooltip>
          </View>
        ):(
          <View></View>
        )}
        {receipt != null ? (
          <View>
            <Tooltip text={'Receipt'}>
              <Ionicons name="document-attach-outline" color="#444" size="23px"></Ionicons>
            </Tooltip>
          </View>
        ):(
          <View></View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.email == selectedEmail ? item.item_number == selectedItemNo ? '#EEEEEE' : 'white' : 'white';
    const transform = item.email == selectedEmail ? item.item_number == selectedItemNo ? [{translateX: 2 }] : [{translateX: 0 }] : [{translateX: 0 }];

    function setEmailAndItemNumber (email, item_number) {
      setSelectedEmail(email)
      setSelectedItemNo(item_number)
    }

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
        onMouseEnter={() => setEmailAndItemNumber(item.email, item.item_number)}
        onMouseLeave={() => setEmailAndItemNumber('','')}
        onPress={() => handleEditExpense(item)}
        backgroundColor={backgroundColor}
        transform={transform}
      />
    )
  }

  return (
    <View style={styles.page}>
      <LoadingPage isLoading={isLoading}/>
      <View style={styles.pageDefault}>

        <View style={styles.topCard}>
          <View style={{width:'100%', flexDirection:'row',paddingBottom:"10px"}}>
            <View style={{width:'100%', position:'absolute',zIndex:999, justifyContent:'space-between', flexDirection:'row'}}>
              <View style={{width:'23%', alignItems:'center'}}>
                <BackButton hideText={true} onPress={() => navigation.goBack()}/>
              </View>
              {userDetails.email == claim.current.form_creator && claim.current.status == 'In Progress' ? (
                <View style={{width:'23%', alignItems:'center'}}>
                  <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsDeleteButtonHover(true)} onMouseLeave={() => setIsDeleteButtonHover(false)} 
                    onPress={() => ConfirmationButton('Are you sure you want to delete this claim?', 'This action cannot be undone',() => handleDeleteClaim(claim))}>
                    <View style={styles.deleteButton}>
                      {isDeleteButtonHover?(
                        <Feather name="trash-2" color="#9C2424" size="27px"/>
                      ):(
                        <Feather name="trash" color="#9C2424" size="25px"/>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ):(
                <View/>
              )}
            </View>
            <View style={{width:'100%', alignItems:"center"}}>
              <Text style={{fontSize:'16px', fontWeight:'600'}}>{claim.current.form_type == 'Travelling' ? travellingPeriod : monthlyPeriod}</Text>
              <Text style={{fontSize:'12px'}}>Creator: {claim.current.form_creator}</Text>
            </View>
          </View>
          <Text style={{fontFamily:"inherit", fontSize: "26px", fontWeight:"700"}}>{claim.current.form_type} Claim</Text>
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
            //keyExtractor={item => item.id}
          />
        </View>

        <View style={[styles.bottomCard, {height: claim.current.status == 'In Progress' || claim.current.status == 'Rejected' ? "140px" : '90px'}]}>
          <View style={{position:'absolute', width:'100%', height:'100%', flexDirection:'row-reverse'}}>
            <Text style={{paddingTop:'5px', paddingRight:'10px', fontSize:'18px', fontWeight:500}}>ID: {claim.current.id}</Text>
          </View>
          <Text style={{paddingTop:"15px"}}>Total:</Text>
          <Text style={{paddingBottom: "10px", fontFamily:"inherit", fontSize: "20px", fontWeight:"700"}}>${claim.current.total_amount}</Text>
      
          {claim.current.form_creator == userDetails.email ? (
            claim.current.status == "In Progress" || claim.current.status == 'Rejected' ? (
              <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <View style={styles.buttonContainer}>
                  <DefaultButton description='Submit' onPress = {() => ConfirmationButton('Are you sure you want to submit?', 'You will no longer be able to edit your expenses', () => handleSubmit(claim))} customStyle={{width: "90%", maxWidth: "400px"}} buttonColor={"#45B097"}/>
                </View>
    
                <View style={styles.buttonContainer}>
                  <DefaultButton description='Add' onPress = {() => addExpense()} customStyle={{width: "90%", maxWidth: "400px"}}/>
                </View>
              </View>
            ) : (
              <View/>
            )
          ):(
            claim.current.status == "In Progress" || claim.current.status == 'Rejected' ? (
              <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <View style={[styles.buttonContainer,{width:'100%'}]}>
                  <DefaultButton description='Add' onPress = {() => addExpense()} customStyle={{width: "90%", maxWidth: "400px"}}/>
                </View>
              </View>
            ) : (
              <View/>
            )
          )}
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
    justifyContent: 'flex-end',
    fontFamily: "Arial",
  },
  pageDefault: {
    width: "100%",
    height: "95%",
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
  deleteButton: {
    width:'40px',
    height:'40px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCard: {
    bottom: "0",
    width:"100%",
    alignItems: "center",
    justifyContent: "flex-start",
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
  userCard: {
    backgroundColor: 'white',
    height:"100px",
    padding: "10px",
    borderBottomWidth: "0.5px",
    borderTopWidth: "0.5px",
    borderColor: "#DADADA",
    flexDirection: "row",
    alignItems:"center"
  },
});
