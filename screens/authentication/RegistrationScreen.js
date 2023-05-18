import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "react-native-vector-icons";


export default function RegistrationScreen({ navigation }) {

/*
  const onLayout=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout;    
  }


  onLayout={onLayout}
*/

  const [name, setName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  return (
    <View style={styles.page}>
      <View style={styles.pageLogin}>
        <TouchableOpacity style={styles.topBar} onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
          <Text><Ionicons name="chevron-back-outline" color="#444"/></Text>
          </View>
          <View style={{paddingHorizontal:'20px'}}>
          <Text style={styles.mediumText}>Go Back</Text>
          </View>
        </TouchableOpacity>
        <View style={{height: '13%', width:'80%', flexWrap:'wrap', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
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
            value={companyEmail} 
            onChangeText={(companyEmail) => setCompanyEmail(companyEmail)} 
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Name</Text>
          <TextInput style={styles.textInput}
            placeholder="eg. Paul Lim" 
            value={name} 
            onChangeText={(name) => setName(name)} 
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Password</Text>
          <TextInput style={styles.textInput}
            placeholder="......." 
            value={password} 
            onChangeText={(password) => setPassword(password)} 
            autoCapitalize="none" 
            autoCorrect={false} 
            secureTextEntry={true}
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Confirm Password</Text>
          <TextInput style={styles.textInput}
            placeholder="......." 
            value={confirmPassword} 
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} 
            autoCapitalize="none" 
            autoCorrect={false} 
            secureTextEntry={true}
          />
          </View>
          
        </View>

        <View style={{height: '15%', width: '100%', justifyContent:'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.defaultButton} > Register </TouchableOpacity>
        </View>
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
    pageLogin: {
      height: "90%",
      width: "90%",
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "Arial",
    },
    topBar: {
      height: "8%",
      width:"90%",
      alignItems: "center",
      flexDirection: "row",
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
  
      padding: "10px",
      color: "black",
      textAlign: "center",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "700",
      
      width: "40px",
      height: "40px",
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
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "700",
      
      width: "90%",
      maxWidth: "400px",
      height: "40px",
      borderRadius: "14px",
  
      cursor: "pointer"
    },


  });

  /*
  function checkContainerSize() {
    var container = document.getElementById("container");
    var content = document.getElementById("content");
    
    if (container.offsetHeight < content.offsetHeight || container.offsetWidth < content.offsetWidth) {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }
  */
 /*
  checkContainerSize();
  window.addEventListener("resize", checkContainerSize);
  */