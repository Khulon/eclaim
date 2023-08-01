import { TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from "react";
import { Ionicons } from "react-native-vector-icons";
import filter from "lodash.filter"
import DefaultButton from '../../components/DefaultButton';
import LogoutButton from '../../components/LogoutButton';
import LoadingPage from '../../components/LoadingPage';

export default function AdminHomeScreen({ navigation }) {        
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('')
  const [userDepartments, setUserDepartments] = useState([]);
  const [approvingDepartments, setApprovingDepartments] = useState([]);
  const [isSettingsHover, setIsSettingsButtonHover] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, []);

  async function fetchData() {
    try {
      const token = window.localStorage.getItem('token')
      fetch(`http://10.0.1.28:5000/admin/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.message == "Token expired!") {
          throw new Error("Token expired!")
        }
        setFullData(data.users);
        setData(data.users);
        for(let i = 0; i < data.departments.length; i++) {
          data.departments[i] = {value: data.departments[i].department_name}
        }
        setDepartments(data.departments)
        for(let i = 0; i < data.companies.length; i++) {
          data.companies[i] = {value: data.companies[i].prefix}
        }
        setCompanies(data.companies)
      })
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
  
  useEffect(() => {
    if(data != null){
      for (var i = 0; i < data.length; i++) {
        if (data[i].email == selectedId) {
          console.log(userDepartments)
          console.log(approvingDepartments)
          navigation.navigate("AdminEditUserScreen", { props: data[i], dpts: userDepartments, allDpts: departments, appDpts: approvingDepartments, allComps: companies})
        }
      }
    }
  }, [userDepartments, approvingDepartments]);

  async function handleEditUser (selectedId) {
    const email = selectedId
    const token = window.localStorage.getItem('token')
    try {
      await fetch(`http://10.0.1.28:5000/admin/editUser/${email}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.message == "Token expired!") {
          throw new Error("Token expired!")
        }
        setUserDepartments(data.dpts);
        setApprovingDepartments(data.appDpts);
      })
    } catch (error) {
      if(error.message == "Token expired!") {
        window.localStorage.clear()
        window.location.reload(false)
        alert("Session expired! Please login again.")
      } else {
        alert("Error loading user data!")
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

  const Item = ({name, email, approver, processor, backgroundColor, transform, onPress, onMouseEnter, onMouseLeave}) => (
    <TouchableOpacity onPress={onPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={[styles.userCard,{backgroundColor},{transform}]}>
      <View style={{height:"100%", width:"10%", minWidth:"30px", alignItems: "center", justifyContent: "center"}}>
        <Text><Ionicons  name="person-outline" color="#444" size="large"/></Text>
      </View>
      <View style={{height:"100%", width:"100%", minWidth:"200px", justifyContent:"center"}}>
        <Text style={{fontSize: "13px", fontWeight:"700"}}>{name}</Text>
        <Text style={{color:"#444444", fontSize: "11px", marginLeft:"25px"}}>Email: {email}</Text>
        <Text style={{color:"#444444", fontSize: "11px", marginLeft:"25px"}}>Approver: {approver}</Text>
        <Text style={{color:"#444444", fontSize: "11px", marginLeft:"25px"}}>Processor: {processor}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.email === selectedId ? '#EEEEEE' : 'white';
    const transform = item.email === selectedId ? [{translateX: 2 }] : [{translateX: 0 }];
    return (
      <Item 
        name={item.name} 
        email = {item.email}
        approver = {item.approver_name != null ? item.approver_name : 'None'}
        processor = {item.processor_email != null ? item.processor_email : 'None'}
        onMouseEnter={() => setSelectedId(item.email)}
        onMouseLeave={() => setSelectedId(null)}
        onPress={() => handleEditUser(selectedId)}
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
          <View style={{width:'100%', flexDirection:'row',paddingBottom:"15px"}}>
            <View style={{width:'23%', position:'absolute', alignItems:'center'}}>
              <LogoutButton/>
            </View>
            <View style={{width:'100%', position:'absolute', alignItems:'center', flexDirection:'row-reverse'}}>
              <View style={{width:'23%', justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsSettingsButtonHover(true)} onMouseLeave={() => setIsSettingsButtonHover(false)} onPress = {() => navigation.navigate('AdminSettingsScreen')}>
                  <View style={{alignItems: 'center', justifyContent: 'center',  cursor: "pointer", height:'30px', width:'30px', backgroundColor:'gray'}}>
                    <Text><Ionicons name="log-out-outline" color="#444" size={isSettingsHover ? '20px' : '18px'}/></Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{width:'100%', alignItems:"center"}}>
              <Text>Admin Home</Text>
            </View>
          </View>
          <Text style={{fontFamily:"inherit", fontSize: "25px", fontWeight:"700"}}>User Accounts</Text>
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
            keyExtractor={item => item.email}
          />
        </View>

        <View style={styles.bottomCard}>
          <Text style={{paddingTop:"15px"}}>Total Employees:</Text>
          <Text style={{paddingBottom: "10px", fontFamily:"inherit", fontSize: "20px", fontWeight:"700"}}>{fullData != null ? fullData.length : 0}</Text>
          <DefaultButton description='Add' onPress={() => navigation.navigate("AdminAddUserScreen", {allDpts: departments, allComps: companies})} customStyle={{width: "90%", maxWidth: "400px"}}/>
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
    height: "130px",
    width:"100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    borderBottomWidth: "2px",
    borderColor: "#DADADA"
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
    height:"80px",
    padding: "10px",
    borderBottomWidth: "0.5px",
    borderTopWidth: "0.5px",
    borderColor: "#DADADA",
    flexDirection: "row",
    alignItems:"center"
  },
});