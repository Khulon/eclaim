import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState} from "react";
import BottomNavigator from '../../components/BottomNavigation';
import { Ionicons } from "react-native-vector-icons";
import * as ImagePicker from 'expo-image-picker';
import LogoutButton from '../../components/LogoutButton';

export default function ProfileScreen({ navigation }) {

  window.localStorage.setItem('stackScreen', 'Profile');

  const [ showPassword, setShowPassword ] = useState(false)
  const [ isEyeHover, setIsEyeHover ] = useState(false)
  const userDetails = JSON.parse(window.localStorage.getItem('details'))
  const image = window.localStorage.getItem('image')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      window.localStorage.setItem('image', result.uri);
    }

    fetch('http://10.0.1.28:5000/uploadImage', {
      method: 'POST',
      headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
      body: JSON.stringify({email: userDetails.email, image: result.uri})
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.error == true) {
        alert(data.message)
      } else {
        alert(data.message)
        window.location.reload(false)
      }
    }
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.defaultPage}>

        <View style={{width:'100%', height:'100px', justifyContent:'flex-end', alignItems:'center'}}>
          <View style={{width:'84%', flexDirection:'row', height:'50px', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={{fontSize:'35px', fontWeight:'800', fontFamily:'inherit'}}>
              My Profile
            </Text>
            <LogoutButton/>
          </View>
          <View style={{borderBottomWidth:'1px', borderBottomColor:'#D9D9D9', width:'95%', height:'5px'}}></View>
        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} style={{height:'0px', width:'100%'}}>

            <View style={{height:'50px'}}></View>
            <View style={styles.displayContainer}>
              <View style={styles.circle}>
                <TouchableOpacity onPress={()=> pickImage()}>
                  <Image style={{width: 170, height: 170, borderRadius:85, borderWidth:'1px', borderColor:'#444' }} source={image}/>
                  <View style={[styles.circle, {position:"absolute", backgroundColor:'#D9D9D9', zIndex:-1}]}>
                    <Text><Ionicons name="images-outline" color="#444444" size='25px'/></Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.nameText}>{userDetails.name}</Text>
            </View>
            <View style={{height:'10px'}}></View>

            <View style={styles.infomationContainer}>
              <Text style={styles.boldInfoText}>Email</Text>
              <Text style={styles.normalInfoText}>{userDetails.email}</Text>
            </View>

            <View style={styles.infomationContainer}>
              <Text style={styles.boldInfoText}>Processor</Text>
              <Text style={styles.normalInfoText}>{userDetails.processor_email}</Text>
            </View>

            <View style={styles.infomationContainer}>
              <Text style={styles.boldInfoText}>Approver</Text>
              <Text style={styles.normalInfoText}>{userDetails.approver_name}</Text>
            </View>

            {showPassword ? (
              <View style={styles.infomationContainer}>
                <View>
                  <Text style={styles.boldInfoText}>Password</Text>
                  <TouchableOpacity onPress={()=>setShowPassword(false)} onMouseEnter={()=> setIsEyeHover(true)} onMouseLeave={()=> setIsEyeHover(false)} style={{position:'absolute', width:'30px', height:'30px', left:'90px', justifyContent:'center', alignItems:'center'}}>
                    {isEyeHover ? (
                      <Text><Ionicons name="eye-off-outline" color="black" size='20px'/></Text>
                    ) : (
                      <Text><Ionicons name="eye-outline" color="black" size='20px'/></Text>
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={styles.normalInfoText}>{userDetails.password}</Text>
              </View>
            ) : (
              <View style={styles.infomationContainer}>
                <View>
                  <Text style={styles.boldInfoText}>Password</Text>
                  <TouchableOpacity onPress={()=>setShowPassword(true)} onMouseEnter={()=> setIsEyeHover(true)} onMouseLeave={()=> setIsEyeHover(false)} style={{position:'absolute', width:'30px', height:'30px', left:'90px', justifyContent:'center', alignItems:'center'}}>
                  {isEyeHover ? (
                      <Text><Ionicons name="eye-outline" color="black" size='20px'/></Text>
                    ) : (
                      <Text><Ionicons name="eye-off-outline" color="black" size='20px'/></Text>
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={styles.normalInfoText}>....</Text>
              </View>
            )}
        
          </ScrollView>
        </View>
      </View>
      <View style={styles.bottomNavigation}>
        <BottomNavigator navigation={navigation} />
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
  defaultPage: {
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
    height:'90px',
    minHeight:'60px',
    justifyContent:'center',
    alignItems:'center',
  },
  boldInfoText: {
    padding:'5px',
    fontWeight:'700',
    fontSize:'17px'
  },
  normalInfoText: {
    padding:'5px',
    color:'#444',
    fontSize:'15px'
  },
});