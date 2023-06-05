import { Animated, TextInput, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations'; 
import { Ionicons } from "react-native-vector-icons";
import useAuth from '../../hooks/useAuth';
import filter from "lodash.filter"
import BottomNavigator from '../../components/BottomNavigation';

export default function ManagementScreen({ navigation }) {        

  window.localStorage.setItem('stackScreen', 'Management');

  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(() => {
    //setIsLoading(true)
    //fetchData()
    setFullData(FULLDATA);
        setData(FULLDATA);
  }, []);

  async function fetchData() {
     
    try {
      await fetch("http://localhost:5000/admin")
      .then((res) => res.json())
      .then((data) => {
        setFullData(data);
        setData(data);
      })
      setIsLoading(false)
    } catch (error) {
      alert("Failed to load. Please check your internet connection!")
      setIsLoading(false)
    }

  } 
  
  
  const FULLDATA = [
    {
      claimId: '1234567',
      creator: 'Paul Lim',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'In Progress',
      expense_Type: 'Travelling'
    },
    {
      claimId: '2234567',
      creator: 'Paul Lim',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'Submitted',
      expense_type: 'Travelling'
    },
    {
      claimId: '3234567',
      creator: 'Paul Lim',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'Approved',
      expense_type: 'Travelling'
    },
    {
      claimId: '4234567',
      creator: 'Paul Lim',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'Rejected',
      expense_type: 'Monthly'
    },
    {
      claimId: '5234567',
      creator: 'Paul Lim',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'In Progress',
      expense_type: 'Monthly'
    },
    {
      claimId: '6234567',
      creator: 'Paul Toh',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'In Progress',
      expense_type: 'Monthly'
    },
    {
      claimId: '7234567',
      creator: 'Paul Chan',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'In Progress',
      expense_type: 'Monthly'
    },
    {
      claimId: '8234567',
      creator: 'Paul Goh',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'In Progress',
      expense_type: 'Monthly'
    },
    {
      claimId: '9234567',
      creator: 'Paul Liu',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'In Progress',
      expense_type: 'Monthly'
    },
    {
      claimId: '1239567',
      creator: 'Paul Tay',
      total: '43.23',
      date: '01 May 23 - 31 May 23',
      status: 'In Progress',
      expense_type: 'Monthly'
    },
  ]; 
    
  
  const [selectedId, setSelectedId] = useState({claimId: ''});
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
      flexGrow:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: "column",
    },
    bottomNavigation: {
      width:'100%',
      height: '70px'
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


  const [userDepartments, setUserDepartments] = useState([]);

  /*
  useEffect(() => {
    if(data != null){
      for (var i = 0; i < data.length; i++) {
        if (data[i].email == selectedId.email) {
          console.log(userDepartments)
          navigation.navigate("AdminEditUserScreen", { props: data[i], dpts: userDepartments})
        }
      }
    }

  }, [userDepartments]);


  
  async function handleEditUser (selectedId) {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    await fetch('http://localhost:5000/admin/editUser', {
      method: 'POST', 
      headers: header,
      body: JSON.stringify(selectedId)})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUserDepartments(data);
    })
  }
  */

  async function handleEditUser (selectedId) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].email == selectedId.email) {
        setUserDepartments(data[i].department)
        console.log(userDepartments)
        navigation.navigate("AdminEditUserScreen", { props: data[i], dpts: userDepartments})
      }
    }
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


  const Item = ({date, creator, total, status, claimId, expense_type, backgroundColor, transform, onPress, onMouseEnter, onMouseLeave}) => (
    <TouchableOpacity onPress={onPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={[styles.userCard,{backgroundColor},{transform}]}>
      <View style={{height:"100%", width:"10%", minWidth:"45px", alignItems: "center", justifyContent: "center"}}>
        {expense_type == 'Travelling' ? (
          <Text><Ionicons  name="airplane-outline" color="#444" size="large"/></Text>
        ):(
          <Text><Ionicons  name="calendar-outline" color="#444" size="large"/></Text>
        )}
      </View>

      <View style={{height:"100%", width:"50%", minWidth:"180px", justifyContent:"center"}}>
      <Text style={{fontSize: "13px", fontWeight:"700"}}>{date}</Text>
      <Text style={{color:"#444444", fontSize: "11px", marginLeft:"25px"}}>Creator: {creator}</Text>
      <Text style={{color:"#444444", fontSize: "11px", marginLeft:"25px"}}>Total: {total}</Text>
      </View>

      <View style={{flexGrow:1, height:'80%', flexDirection:'row-reverse' }}>
        <View style={{width:"20%"}}></View>
        <View style={{justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{fontWeight:'500', fontSize: "12px", color:status=='In Progress' ? "#7B7B7B" : status=='Submitted' ? "#D18225" : status=='Approved' ? "green" : '#B82626'}}>{status}</Text>
          <Text style={{fontWeight:'600', color:"#444444", fontSize: "13px"}} >ID: {claimId}</Text>
        </View>
      </View>
      
    </TouchableOpacity>
  );


  const renderItem = ({item}) => {

    const backgroundColor = item.claimId === selectedId.claimId ? '#EEEEEE' : 'white';
    const transform = item.claimId === selectedId.claimId ? [{translateX: 2 }] : [{translateX: 0 }];
    
    return (
      <Item 
        date={item.date} 
        creator = {item.creator}
        total = {item.total}
        status = {item.status}
        claimId = {item.claimId}
        expense_type = {item.expense_type}

        onMouseEnter={() => setSelectedId({...selectedId, claimId: item.claimId})}
        onMouseLeave={() => setSelectedId({...selectedId, claimId: null})}

        onPress={() => handleEditUser(selectedId)}
        backgroundColor={backgroundColor}
        transform={transform}
      />
    )
  }

  const { logoutUser } = useAuth();

  async function handleLogOut() {
    try {
      logoutUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.loadingPage}>
        <ActivityIndicator size='large' color="#E04F4F" />
      </View>

      <View style={styles.pageDefault}>
        <View style={{height:'5%'}}></View>
        <View style={styles.topCard}>
        <View style={{width:'84%', flexGrow:1, flexDirection:'row', alignItems:'center'}}>
          <Text style={{fontFamily:"inherit", fontSize: "35px", fontWeight:"700"}}>Management</Text>
        </View>
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



      


      </View>

      <View style={styles.bottomNavigation}>
        <BottomNavigator navigation={navigation} />
      </View>

    </View>
    
  );
}


