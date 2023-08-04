import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, { useState, useRef} from 'react';
import DefaultButton from '../../components/DefaultButton';
import CloseButton from '../../components/CloseButton'

export default function ChangePasswordModal({ closeModal }) {

  const [validationResults, setValidationResults] = useState([]);
  const password = useRef()
  const confirmPassword = useRef()


  function changePassword() {
    try{
      console.log(password.current)
      console.log(confirmPassword.current)
      if(password.current != confirmPassword.current) {
        alert("Passwords do not match!");
        throw new Error("Passwords do not match!");
      }
      if (!validationResults.every(result => result.color == 'green')) {
        alert("Password must pass all conditions in red!")
        throw new Error("Password must pass all conditions in red!");
      }
      handleChangePassword(password.current)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangePassword(password) {
    const header = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const user = window.localStorage.getItem('session')
    const oldPassword = JSON.parse(window.localStorage.getItem('details')).password
    //sends a POST request to the server to change password of user account
    await fetch('http://10.0.1.28:5000/changePassword', {
      method: 'POST',
      headers: header,
      body: JSON.stringify({user: user, oldPassword: oldPassword, newPassword: password})
    }).then((response) => response.json())
    .then((data) => {
      if(data.message == 'Success!') {
        alert("Password changed successfully!")
        const item = JSON.parse(window.localStorage.getItem('details'))
        item.password = password
        window.localStorage.setItem('details', JSON.stringify(item))
        window.localStorage.setItem('token', data.token)
        window.location.reload(false)
      } else if(data.error == "known") {
        alert(data.message)
      } else {
        console.log(data.message)
        alert('Failed to update password!')
      }
    })
    
  }

  const validatePassword = (input) => {
    
    password.current = input;
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

  function test (input) {
    console.log(input)
    confirmPassword.current = input;
    console.log(confirmPassword.current)
  }
  
  return (
    <View style={styles.page}>
      <View style={styles.defaultPage}>

        <View style={styles.topBar}>
          <CloseButton onPress={closeModal} hideText={true} />
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{width:'100%',height:'0px'}} showsVerticalScrollIndicator={false}>
            <View style={{height: '64%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                <View style={styles.headerBar}>
                    <View style={{paddingHorizontal: '7px'}}>
                        <Text style={styles.bigText}>Change</Text>
                    </View>
                    <View style={{padding: '7px'}}>
                        <Text style={styles.bigText}>Password</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.normalBoldText}>New Password</Text>
                    <TextInput style={styles.textInput}
                        placeholder="......." 
                        autoCapitalize="none" 
                        onChangeText = {(value) => validatePassword(value)}
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.normalBoldText}>Confirm New Password</Text>
                    <TextInput style={styles.textInput}
                        placeholder="......." 
                        autoCapitalize="none"
                        onChangeText = {(value) => test(value)}
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
            
        <View style={{ width: '100%', height:'60px', justifyContent:'center', alignItems: 'center'}}>
          <DefaultButton description='Confirm' onPress={() => changePassword()} customStyle={{width: "90%", maxWidth: "400px"}}/>
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
      fontSize: "25px",
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
    },
  });

