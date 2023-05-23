import { StyleSheet, Text, View, Image, TouchableOpacity, Animated} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations';


export default function StartScreen({ navigation }) {

  const loginButtonHover = useRef(new Animated.Value(0)).current;

  /*
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    fetch("http://localhost:5000")
    .then((res) => res.json())
    .then((data) => setMessage(data))

  }, []);

  <div>
    {message &&
      message.map((msg) => (
      <div>
        Email:{msg.email} <div>Password:{msg.passwords}</div>
    </div>
    ))}
  </div> */
        

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
        

        </View>

        <View style={{width: "100%", height: "30%", alignItems: 'center',justifyContent: 'center'}}>
          <Animated.View onMouseEnter={() => MoveNegAnimation(loginButtonHover)} onMouseLeave={() => MovePosAnimation(loginButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: loginButtonHover }]}}>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}  style={styles.defaultButton} > Login </TouchableOpacity>
          </Animated.View>
          <View style={{flexDirection: "row" , paddingTop: "10px"}}>
            <Text > Don't have an account?</Text>
            <Text style={styles.textLink} onPress={() => navigation.navigate("RegistrationScreen")}> Register Now!</Text>
          </View>
        </View>

      </View>
    </View>
    
  );
}


