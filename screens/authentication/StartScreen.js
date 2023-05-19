import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from "react";


export default function StartScreen({ navigation }) {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000")
    .then((res) => res.json())
    .then((data) => setMessage(data))

  }, []);
        

  const [isLoginButtonHover, setIsLoginButtonHover] = useState(false);



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
    width: "90%",
    height: "90%",
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: "column",
    
  },
  text: {
    fontSize: "17px",
    fontWeight: "700",
    fontFamily: "inherit",
  },

  textLink: {
    fontWeight: "700",
    textDecorationLine: 'underline',
    color: '#E04F4F'
  },

  defaultButton: {
    fontFamily: "inherit",
        backgroundColor: isLoginButtonHover? "#E35D5D" :"#E04F4F",
        border: "none",
    
        padding: isLoginButtonHover? "11px" :"10px",
        color: "white",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "700",
        
        width: "90%",
        maxWidth: "400px",
        height: "40px",
        borderRadius: "14px",
    
        cursor: "pointer"
  },

});


  return (
    <View style={styles.page}>
      <View style={styles.pageLogin}>

        <View style={{alignItems: 'center', justifyContent: 'center', height: "70%"}}>
        <Image 
          style={{width: 120, height: 120}}
          source={require('../../assets/engkong_logo.png')}
          resizeMode={'contain'}  
        />
        <Text style={styles.text}>Eng Kong Holdings</Text>
        <Text style={styles.text}>Pte Ltd</Text>
        
        <div>
          {message &&
            message.map((msg) => (
            <div>
              Email:{msg.email} <div>Password:{msg.passwords}</div>
          </div>
          ))}
        </div> 

        </View>

        <View style={{width: "100%", height: "30%", alignItems: 'center',justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} onMouseEnter={() => setIsLoginButtonHover(true)} onMouseLeave={() => setIsLoginButtonHover(false)} style={styles.defaultButton} > Login </TouchableOpacity>
          <View style={{flexDirection: "row" , paddingTop: "10px"}}>
            <Text > Don't have an account?</Text>
            <Text style={styles.textLink} onPress={() => navigation.navigate("RegistrationScreen")}> Register Now!</Text>
          </View>
        </View>

      </View>
    </View>
    
  );
}


