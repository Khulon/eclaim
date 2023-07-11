import { StyleSheet, Text, View, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import BackButton from '../../components/BackButton';
import DefaultButton from '../../components/DefaultButton';
import { ScrollView } from 'react-native-web';


export default function RegistrationScreen({ navigation }) {

  const {createUser} = useAuth();
  const [loginDetails, setLoginDetails] = useState({companyEmail: '', password: '', confirmPassword: ''})
  const [validationResults, setValidationResults] = useState([]);

  function register() {
    try{
      if(loginDetails.password != loginDetails.confirmPassword) {
        alert("Passwords do not match");
        throw new Error("Passwords do not match");
      } 
      if (!validationResults.every(result => result.color == 'green')) {
        alert("Password must pass all conditions in red")
        throw new Error("Password must pass all conditions in red");
      }
      createUser(loginDetails);
    } catch (error) {
      console.log(error);
    }
  }

  const validatePassword = (input) => {
    setLoginDetails({...loginDetails, password: input})
    const results = [];

    // Check password length
    if (input.length < 8) {
      results.push({
        text: "- At least 8 characters",
        color: "red"
      });
    } else {
      results.push({
        text: "- At least 8 characters",
        color: "green"
      });
    }

    // Check for At least one numeric digit
    if (!/\d/.test(input)) {
      results.push({
        text: "- At least one numeric digit",
        color: "red"
      });
    } else {
      results.push({
        text: "- At least one numeric digit",
        color: "green"
      });
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(input)) {
      results.push({
        text: "- At least one lowercase letter",
        color: "red"
      });
    } else {
      results.push({
        text: "- At least one lowercase letter",
        color: "green"
      });
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(input)) {
      results.push({
        text: "- At least one uppercase letter",
        color: "red"
      });
    } else {
      results.push({
        text: "- At least one uppercase letter",
        color: "green"
      });
    }

    // Check for at least one special character
    if (!/[^a-zA-Z0-9]/.test(input)) {
      results.push({
        text: "- At least one special character",
        color: "red"
      });
    } else {
      results.push({
        text: "- At least one special character",
        color: "green"
      });
    }

    setValidationResults(results);
  };

  
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{width:'100%',height:'0px'}} showsVerticalScrollIndicator={false}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
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
              onChangeText={validatePassword}
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

          <View style={{height:'130px', justifyContent:'center', width:'90%', maxWidth:'450px'}}>
              {validationResults.map((result, index) => (
                <Text
                  key={index}
                  style={[styles.validationText, { color: result.color, fontWeight:500 }]}
                >
                  {result.text}
                </Text>
              ))}
            </View>
            </View>
            </ScrollView>
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
      height:'100px',
      paddingVertical:'5px',
      width:'90%',
      maxWidth: '450px'
    },
  });

