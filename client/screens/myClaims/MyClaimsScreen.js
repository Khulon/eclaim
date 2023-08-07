import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useState, useEffect } from "react";
import { Ionicons, Feather } from "react-native-vector-icons";
import filter from "lodash.filter"
import BottomNavigator from '../../components/BottomNavigation';
import { parseDatePeriod } from '../../functions/Parsers';
import Tooltip from '../../components/Tooltip';
import LogoutButton from '../../components/LogoutButton';
import LoadingPage from '../../components/LoadingPage';
import FilterModal from '../../components/FilterModal';

export default function MyClaimsScreen({ navigation }) {        
  window.localStorage.setItem('stackScreen', 'MyClaims');
  const [modalVisible, setModalVisible] = useState(false);
  const userDetails = JSON.parse(window.localStorage.getItem('details'))
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('')
  const [filterDate, setFilterDate] = useState({startDate:null, endDate:null})

  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, []);

  async function fetchData() {
    const email = window.localStorage.getItem('session');
    const token = window.localStorage.getItem('token');
    try {
      //get all claims that user is involved in from the database
      await fetch(`http://10.0.1.28:5000/myClaims/${email}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.message == "Token expired!") {
          throw new Error("Token expired!")
        }
        setFullData(data);
        setData(data);
        console.log(data)
      });
      setIsLoading(false);
    } catch (error){
      if(error.message == "Token expired!") {
        window.localStorage.clear()
        window.location.reload(false)
        alert("Session expired! Please login again.")
      } else {
        alert("Error loading page. If error persists, log out and try again")
      }
      setIsLoading(false)
    }
  }

  async function handleEditClaim () {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == selectedId) {
        console.log(data[i].id)
        navigation.navigate("EditClaimScreen", { props: data[i]})
      }
    }
  }

  function handleSearch (search) {
    setSearch(search)
    const formattedQuery = search.toLowerCase();
    const filteredData = filter(fullData, (claim)=> {
      return contains(claim, formattedQuery)
    })
    setData(filteredData)
    //console.log(filteredData)
  }

  const contains = ({form_creator, id, form_type, pay_period_from, pay_period_to, period_from, period_to}, query) => {
    id = id.toLowerCase()
    form_creator = form_creator.toLowerCase()

    if (filterDate.startDate != null && filterDate.endDate != null) {
      const startDate = filterDate.startDate.toISOString()
      const endDate = filterDate.endDate.toISOString()
      
      if (form_type == "Travelling") {
        
        if (period_from <= startDate || period_to > endDate) {
          return false
        }
      }
      if (form_type == "Monthly" && (pay_period_from <= startDate || pay_period_to > endDate)) {
        return false
      }
    }
    if (form_creator.includes(query) || id.includes(query)) {
      return true
    }
    return false
  }

  function applyFilter (startDate, endDate) {
    setFilterDate((filterDate) => ({
      ...filterDate,
      startDate: startDate,
      endDate: endDate,
    }));
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    handleSearch(search)
  }, [filterDate]);
  
  const Item = ({date, creator_Name, total, claimees, status, claimId, form_type, backgroundColor, transform, onPress, onMouseEnter, onMouseLeave}) => (
    <TouchableOpacity onPress={onPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={[styles.userCard,{backgroundColor},{transform}]}>
      <View style={{height:"100%", width:"10%", minWidth:"45px", alignItems: "center", justifyContent: "center"}}>
        {form_type == 'Travelling' ? (
          <Tooltip text={'Travel claim'}> 
            <Ionicons  name="airplane-outline" color="#444" size="25px"/>
          </Tooltip>
        ):(
          <Tooltip text={'Monthly Claim'}>
            <Ionicons  name="calendar-outline" color="#444" size="25px"/>
          </Tooltip>
        )}
      </View>

      <View style={{height:"100%", flexGrow:1, minWidth:"180px", justifyContent:"center"}}>
        <Text style={{fontSize: "16px", fontWeight:"700"}}>{date}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Creator: {creator_Name}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Claimees: {claimees}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Total: {total}</Text> 
      </View>

      <View style={{width:'105%', height:'100%', position:'absolute', alignItems:'center', flexDirection:'row-reverse' }}>
        <View style={{width:"10%", height:'80%'}}/>
        <View style={{width:'130px', height:'80%', flexDirection:'row', backgroundColor:backgroundColor,}}>
          <View style={{ alignItems:'flex-end', justifyContent:'space-between', height:'100%', width:'100%'}}>
            <Text style={{textAlign:'right', fontWeight:'500', fontSize: "15px", color:status=='In Progress' ? "#7B7B7B" : status=='Submitted' ? "#D18225" : status == 'Pending Next Approver' ? "#D18225" : status=='Approved' ? "green" : status=='Rejected' ? '#B82626' : '#4BA7C5'}}>{status}</Text>
            <Text style={{fontWeight:'600', color:"#444444", fontSize: "16px"}} >ID: {claimId}</Text>
          </View>
        </View>
        <View style={{width:"4%", height:'80%', backgroundColor:backgroundColor, opacity:0.5}}/>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#EEEEEE' : 'white';
    const transform = item.id === selectedId ? [{translateX: 2 }] : [{translateX: 0 }];
    const monthlyPeriod = parseDatePeriod(item.pay_period_from, item.pay_period_to)
    const travellingPeriod = parseDatePeriod(item.period_from, item.period_to)
    return (
      <Item 
        date={item.form_type == 'Travelling' ? travellingPeriod : monthlyPeriod} 
        creator_Name = {item.form_creator}
        total = {userDetails.email == item.form_creator ? '$' + (item.total_amount) : ('Hidden')}
        claimees = {item.claimees}
        status = {item.status}
        claimId = {item.id}
        form_type = {item.form_type}
        onMouseEnter={() => setSelectedId(item.id)}
        onMouseLeave={() => setSelectedId('')}
        onPress={() => handleEditClaim()}
        backgroundColor={backgroundColor}
        transform={transform}
      />
    )
  }

  return (
    <View style={styles.page}>
      {modalVisible && (
        <Modal transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <FilterModal closeModal={()=>setModalVisible(!modalVisible)} applyFilter={(startDate, endDate)=>applyFilter(startDate, endDate)} filterDate={filterDate}/>
            </View>
          </View>
        </Modal>)}
      <LoadingPage isLoading={isLoading}/>
      
      <View style={styles.pageDefault}>
        <View style={{height:'5%'}}/>
        <View style={styles.topCard}>
          <View style={{width:'84%', flexGrow:1, flexDirection:'row', alignItems:'center', justifyContent: 'space-between'}}>
            <Text style={{fontFamily:"inherit", fontSize: "38px", fontWeight:"700"}}>My Claims</Text>
            <LogoutButton/>
          </View>
          <View style={{width:'85%', height:'35px', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingBottom:'30px'}}>
            <View style={{height:'35px', flexGrow:1, flexDirection:'row-reverse', paddingRight:'10px'}}>
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
            <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)} style={{width:'8%', height:'35px', backgroundColor:'#E3E3E3', borderRadius:'20px', padding:'10px', minWidth:'100px', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
              <Feather name="filter" color="#5F5F5F" size="16px"/>
              <Text style={{color:'#5F5F5F', fontWeight:600, fontSize:'14px'}}> Filter</Text>
            </TouchableOpacity>
            
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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    height:'70%',
    minHeight:'400px',
    width:'25%',
    minWidth:'320px'
  },
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
    flexGrow:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: "column",
  },
  bottomNavigation: {
    width:'100%',
    height: '80px'
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
    flexGrow:1,
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