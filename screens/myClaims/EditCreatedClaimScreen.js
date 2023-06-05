import { Animated, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations'; 
import { Ionicons } from "react-native-vector-icons";
import ConfirmationButton from '../../components/ConfirmationButton';



export default function EditCreatedClaimScreen({ navigation, route }) {
  const [claim] = useState(route.params.props);    
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  

  const SubmitButtonHover = useRef(new Animated.Value(0)).current;
  const AddButtonHover = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    //setIsLoading(true)
    const id = claim.id;
    const type = claim.form_type;
    fetch(`http://localhost:5000/getExpenses/${type}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setFullData(data);
      setData(data)
    });
    
  }, []);
  

  const FULLDATA = [
    {
        email: 'karenlim@gmail.com',
        email: 'karenlim@gmail.com',
        name: 'Karen Lim',
        company_prefix: 'EKCA',
        department: ['EKA','EGK'],
        supervisor: '0',
        approver: '0',
        processor: '1',
        checked: 'Yes',
        receipt: 'something'
    },
    {
        email: 'karentan@gmail.com',
        email: 'karentan@gmail.com',
        name: 'Karen Tan',
        company_prefix: 'EKCA',
        department: ['EKA','EGK','EEE'],
        supervisor: '0',
        approver: '0',
        processor: '1',
        checked: 'No',
        receipt: 'something'
    },
    {
        email: 'weijietan@gmail.com',
        email: 'weijietan@gmail.com',
        name: 'Wei Jie Tan',
        company_prefix: 'EKCA',
        department: ['EKA','EGK','EEE'],
        supervisor: '0',
        approver: '0',
        processor: '1',
        checked: 'No',
        receipt: null
    },
  ]; 


  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const [selectedId, setSelectedId] = useState({email: ''});
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
      height: "100px",
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

  function handleAddExpense () {
    navigation.navigate("AddExpenseScreen")
  }


  function handleSearch (search) {
    setSearch(search)
    const formattedQuery = search.toLowerCase();
    const filteredData = filter(fullData, (person)=> {
      return contains(person, formattedQuery)
    })
    setData(filteredData)
    console.log(filteredData)
  }

  const contains = ({name,email}, query) => {
    if (name.includes(query) || email.includes(query)) {
      return true
    }
    return false
  }


  const Item = ({receipt, checked, date, name, type, amount , backgroundColor, transform, onPress, onMouseEnter, onMouseLeave}) => (
    <TouchableOpacity onPress={onPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={[styles.userCard,{backgroundColor},{transform}]}>
      <View style={{height:"100%", width:"10%", minWidth:"30px", alignItems: "center", justifyContent: "center"}}>
      <Text><Ionicons  name="person-outline" color="#444" size="large"/></Text>
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

    const backgroundColor = item.email === selectedId.email ? '#EEEEEE' : 'white';
    const transform = item.email === selectedId.email ? [{translateX: 2 }] : [{translateX: 0 }];
    
    return (
      <Item 
        receipt = {item.receipt}
        date = {claim.form_type == 'Travelling' ? convertDate(item.date) : convertDate(item.date_of_expense)}
        checked = {item.checked}
        name = {item.name} 
        type = {item.expense_type}
        amount = {item.amount}

        onMouseEnter={() => setSelectedId({...selectedId, email: item.email})}
        onMouseLeave={() => setSelectedId({...selectedId, email: null})}

        onPress={() => console.log(handleEditUser(selectedId))}
        backgroundColor={backgroundColor}
        transform={transform}
      />
    )
  }


  const monthlyPeriod = convertDate(claim.pay_period_from) + " - " + convertDate(claim.pay_period_to)
  const travellingPeriod = convertDate(claim.period_from) + " - " + convertDate(claim.period_to)

  function convertDate(date) {
    const newDate = new Date(date).toLocaleDateString("en-UK")
    return newDate
  }

  return (
    <View style={styles.page}>
      <View style={styles.loadingPage}>
        <ActivityIndicator size='large' color="#E04F4F" />
      </View>

      <View style={styles.pageDefault}>
      <View style={styles.topCard}>
        <View style={{width:'100%', flexDirection:'row',paddingBottom:"10px"}}>
          <View style={{width:'23%', position:'absolute', alignItems:'center', zIndex:999}}>
            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
            <Text><Ionicons name="chevron-back-outline" color="#444"/></Text>
            </View>
            </TouchableOpacity>
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
        <Text style={{paddingBottom: "10px", fontFamily:"inherit", fontSize: "20px", fontWeight:"700"}}>${claim.total_amount}</Text>
        
        <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(SubmitButtonHover)} onMouseLeave={() => MovePosAnimation(SubmitButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: SubmitButtonHover }]}}>
        <TouchableOpacity style={[styles.defaultButton,{backgroundColor:"#45B097"}]} onPress = {() => ConfirmationButton('Are you sure you want to submit?', 'You will no longer be able to edit your expenses', () => deleteUser(userDetails))}> Submit </TouchableOpacity>
        </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(AddButtonHover)} onMouseLeave={() => MovePosAnimation(AddButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: AddButtonHover }]}}>
        <TouchableOpacity onPress={() => handleAddExpense()} style={styles.defaultButton} > Add </TouchableOpacity>
        </Animated.View>
        </View>
        </View>

      </View>


      </View>
    </View>
    
  );
}


