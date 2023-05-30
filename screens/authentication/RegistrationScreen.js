import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, Animated} from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from "react-native-vector-icons";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations';
import useAuth from '../../hooks/useAuth';


export default function RegistrationScreen({ navigation }) {

  const [isBackButtonHover, setIsBackButtonHover] = useState(false);

  const registerButtonHover = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create(
    {
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
        height: "90%",
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
      },
      topBar: {
        height: "50px",
        width:"90%",
        alignItems: "center",
        flexDirection: "row",
        
      },
      headerBar: {
        height: '95px',
        width:'80%',
        flexWrap:'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
      },
  
      bigText: {
        fontSize: "35px",
        fontWeight: "900",
        fontFamily: "inherit",
      },
      mediumText: {
        fontSize: "20px",
        fontWeight: "500",
        color: "#6A6A6A",
        fontFamily: "inherit",
      },
      normalBoldText: {
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "inherit",
        paddingVertical:'10px'
      },
      textInput: {
        height: "45px",
        color: "#6A6A6A",
        borderWidth: "1px",
        borderRadius: "12px",
        padding: "10px",
        borderColor: "#DADADA",
      },
  
      inputContainer: {
        paddingVertical:'5px',
        width:'90%',
        maxWidth: '450px'
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
  
  
    });

  const {createUser} = useAuth();
  const [loginDetails, setLoginDetails] = useState({companyEmail: null, password: null, confirmPassword: null})


  function register() {
    try{
      
      if(loginDetails.password != loginDetails.confirmPassword) {
        alert("Passwords do not match");
        throw new Error("Passwords do not match");
        
      } 
      createUser(loginDetails);
    } catch (error) {
      console.log(error);

    }
  }
  

  return (
    <View style={styles.page}>
      <View style={styles.pageLogin}>
        <View style={styles.topBar}>
        <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
          <Text><Ionicons name="chevron-back-outline" color="#444"/></Text>
          </View>
          <View style={{paddingHorizontal:'20px'}}>
          <Text style={styles.mediumText}>Go Back</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.headerBar}>
          <View style={{paddingHorizontal: '7px'}}>
          <Text style={styles.bigText}>Create</Text>
          </View>
          <View style={{padding: '7px'}}>
          <Text style={styles.bigText}>Account</Text>
          </View>
        </View>
        <View style={{height: '64%', width:'100%', alignItems:'center', justifyContent:'center'}}>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Company Email</Text>
          <TextInput style={styles.textInput}
            placeholder="example@mail.com" 
            value={loginDetails.companyEmail} 
            onChangeText={(companyEmail) => setLoginDetails({...loginDetails, companyEmail: companyEmail})} 
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Password</Text>
          <TextInput style={styles.textInput}
            placeholder="......." 
            value={loginDetails.password} 
            onChangeText={(password) => setLoginDetails({...loginDetails, password: password})}
            autoCapitalize="none" 
            autoCorrect={false} 
            secureTextEntry={true}
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Confirm Password</Text>
          <TextInput style={styles.textInput}
            placeholder="......." 
            value={loginDetails.confirmPassword} 
            onChangeText={(confirmPassword) => setLoginDetails({...loginDetails, confirmPassword: confirmPassword})} 
            autoCapitalize="none" 
            autoCorrect={false} 
            secureTextEntry={true}
          />
          </View>
          
        </View>

        <View style={{height: '15%', width: '100%', justifyContent:'center', alignItems: 'center'}}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(registerButtonHover)} onMouseLeave={() => MovePosAnimation(registerButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: registerButtonHover }]}}>
        <TouchableOpacity style={styles.defaultButton} onPress={() => register()}> Register </TouchableOpacity>
        </Animated.View>
        </View>
      </View>

    </View>
  );
}



