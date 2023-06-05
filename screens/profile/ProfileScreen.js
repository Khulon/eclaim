import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useState} from "react";
import useAuth from '../../hooks/useAuth';
import ConfirmationButton from '../../components/ConfirmationButton';
import BottomNavigator from '../../components/BottomNavigation';
import { Ionicons } from "react-native-vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {

  window.localStorage.setItem('stackScreen', 'Profile');

  const [isBackButtonHover, setIsBackButtonHover] = useState(false);


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
      justifyContent:'center',
      alignItems:'center'
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
      justifyContent:'center',
    },
    circle: {
      height:'170px',
      width:'170px',
      borderRadius:'85px',
      justifyContent:'center',
      alignItems:'center'
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
    } catch (error) {
      console.log(error);
    }
  }

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  

  return (
    <View style={styles.page}>
      <View style={styles.pageLogin}>

      <View style={{width:'100%', height:'100px', justifyContent:'flex-end', alignItems:'center'}}>
        <View style={{width:'84%', flexDirection:'row', height:'50px', alignItems:'center', justifyContent:'space-between'}}>
        <Text style={{fontSize:'35px', fontWeight:'800', fontFamily:'inherit'}}>My Profile</Text>
          <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress = {() => ConfirmationButton('Alert!', 'Are you sure you want to log out?', ()=>handleLogOut())}>
            <View style={styles.backButton}>
              <Text><Ionicons name="log-out-outline" color="#444" size='large'/></Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth:'1px', borderBottomColor:'#D9D9D9', width:'95%', height:'5px'}}></View>
      </View>

        
      <View style={styles.content}>
        <View style={styles.displayContainer}>
          <View style={styles.circle}>
          <TouchableOpacity onPress={()=> pickImage()}>
          <Image style={{width: 170, height: 170, borderRadius:85 }}
            source={{uri:image}}
          />
          <View style={[styles.circle, {position:"absolute", backgroundColor:'#D9D9D9', zIndex:-1}]}>
          <Text><Ionicons name="images-outline" color="#444444" size='25px'/></Text>
          </View>
          </TouchableOpacity>
          


          </View>
          <Text style={styles.nameText}>Name</Text>
        </View>

        <View style={styles.infomationContainer}>
          <Text style={styles.boldInfoText}>Email</Text>
          <Text style={styles.normalInfoText}>cleon@gmail.com</Text>
        </View>
        <View style={styles.infomationContainer}>
          <Text style={styles.boldInfoText}>Processor</Text>
          <Text style={styles.normalInfoText}>Jane Liu</Text>
        </View>
        <View style={styles.infomationContainer}>
          <Text style={styles.boldInfoText}>Approver</Text>
          <Text style={styles.normalInfoText}>Karen Chan</Text>
        </View>
        <View style={styles.infomationContainer}>
          <Text style={styles.boldInfoText}>Password</Text>
          <Text style={styles.normalInfoText}>........</Text>
        </View>
        
      </View>
        

      </View>

      <View style={styles.bottomNavigation}>
      <BottomNavigator navigation={navigation} />
      </View>
    </View>
    
  );
}


