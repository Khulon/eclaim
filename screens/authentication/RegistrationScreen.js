import { StyleSheet, Text, View, TextInput} from 'react-native';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import BackButton from '../../components/BackButton';
import DefaultButton from '../../components/DefaultButton';


export default function RegistrationScreen({ navigation }) {

  const {createUser} = useAuth();
  const [loginDetails, setLoginDetails] = useState({companyEmail: '', password: '', confirmPassword: ''})

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
      <View style={styles.defaultPage}>

        <View style={styles.topBar}>
          <BackButton onPress={() => navigation.goBack()}/>
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
          <DefaultButton description='Register' onPress={() => register()} customStyle={{width: "90%", maxWidth: "400px"}}/>
        </View>
      </View>

    </View>
  );
}

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
    defaultPage: {
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
  });

