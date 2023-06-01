import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState} from "react";
import useAuth from '../../hooks/useAuth';
import ConfirmationButton from '../../components/ConfirmationButton';
import BottomNavigator from '../../components/BottomNavigation';
import { Ionicons } from "react-native-vector-icons";

export default function ProfileScreen({ navigation }) {

  window.localStorage.setItem('stackScreen', 'Profile');

  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const [userProfile, setUserProfile] = useState({email: '', name: '', company: '', approver: '', processor: '', password: ''});

  
  useEffect( () => {
    const email = window.localStorage.getItem('session');
    fetch('http://localhost:5000/getProfile', {
      method: 'POST',
      headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
      body: JSON.stringify({email: email})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUserProfile({...userProfile, email: data.email, name: data.name, company: data.company_prefix,
         approver: data.approver_name, processor: data.processor_email, password: data.password})
    });
      
  }, []);

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
    pageLogin: {
      width: "100%",
      flexGrow:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: "column",
      
    },
    content: {
      width:'100%',
      flexGrow:1,
    },
    bottomNavigation: {
      width:'100%',
      height: '70px'

    },
    text: {
      fontSize: "17px",
      fontWeight: "700",
      fontFamily: "inherit",
    },
    displayContainer: {
      width:'100%',
      height:'40%',
      alignItems:'center',
      justifyContent:'center'
    },
    nameText: {
      fontWeight:'700',
      fontSize:'35px',
      paddingTop:'10px'
    },
    infomationContainer: {
      width:'100%',
      height:'13%',
      minHeight:'60px',
      justifyContent:'center',
      alignItems:'center',
    },
    
    boldInfoText: {
      padding:'5px',
      fontWeight:'700'
    },
    normalInfoText: {
      padding:'5px',
      color:'#444'
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

  });

  const { logoutUser } = useAuth();

  async function handleLogOut() {
    try {
      logoutUser();
      console.log(window.localStorage.getItem('stackScreen'));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.pageLogin}>

      <View style={{width:'100%', height:'100px', justifyContent:'flex-end', alignItems:'center'}}>
        <View style={{width:'84%', flexDirection:'row', height:'50px', alignItems:'center', justifyContent:'space-between'}}>
        <Text style={{fontSize:'35px', fontWeight:'800', fontFamily:'inherit'}}>My Profile</Text>
          <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress = {() => ConfirmationButton('Alert!', 'Are you sure you want to log out?', ()=> handleLogOut())}>
            <View style={styles.backButton}>
              <Text><Ionicons name="log-out-outline" color="#444" size='large'/></Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth:'1px', borderBottomColor:'#D9D9D9', width:'95%', height:'5px'}}></View>
      </View>

        
      <View style={styles.content}>
        <View style={styles.displayContainer}>
          <View style={{height:'140px', width:'140px', borderRadius:'70px', justifyContent:'center', alignItems:'center'}}>
          
          <Image 
          style={{width: 140, height: 140, borderRadius:70 }}
          source={require('../../assets/profile.jpeg')}
          resizeMode={'contain'}  
          />
          
          </View>
          <Text style={styles.nameText}>Name</Text>
        </View>

        <View style={styles.infomationContainer}>
          <Text style={styles.boldInfoText}>Email</Text>
          <Text style={styles.normalInfoText}>{userProfile.name}</Text>
        </View>
        <View style={styles.infomationContainer}>
          <Text style={styles.boldInfoText}>Processor</Text>
          <Text style={styles.normalInfoText}>{userProfile.processor}</Text>
        </View>
        <View style={styles.infomationContainer}>
          <Text style={styles.boldInfoText}>Approver</Text>
          <Text style={styles.normalInfoText}>{userProfile.approver}</Text>
        </View>
        <View style={styles.infomationContainer}>
          <Text style={styles.boldInfoText}>Password</Text>
          <Text style={styles.normalInfoText}>{userProfile.password}</Text>
        </View>
        
      </View>
        

      </View>

      <View style={styles.bottomNavigation}>
      <BottomNavigator navigation={navigation} />
      </View>
    </View>
    
  );
}


