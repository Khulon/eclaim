import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState, useEffect } from "react";
import ConfirmationButton from '../../components/ConfirmationButton';
import BackButton from '../../components/BackButton';
import DefaultButton from '../../components/DefaultButton';
import "react-datepicker/dist/react-datepicker.css";
import "../../components/custom-datepicker.css";

export default function AdminSettingsScreen({ navigation}) {        
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState(null);

  /**
   * getGST Function
   *
   * Get current gst rate stored in database.
   *
   */
  useEffect(() => {
    fetch('http://dw.engkong.com:5000/getGST')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setSettings(data.gst)
    })
  }, [isEditing])

  function handleToggleEdit () {
    if (isEditing) {
      setSettings(null)
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  /**
   * updateSettings Function
   * 
   * Updates the gst rate stored in database.
   * 
   * @param {string} settings - gst rate
   */
  function updateSettings() {
    fetch('http://dw.engkong.com:5000/updateGST', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({gst: settings})
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.message == "Success!") {
        alert("Expense updated!")
        navigation.goBack();
      } else {
        console.log(data.message)
        alert("Error updating GST rate!")
      }
    })
    
  }

  return (
    <View style={styles.page}>
      
        <View style={styles.pageDefault}>
          <View style={styles.topCard}>
            <View style={styles.backButtonBar}>
              <BackButton onPress={() => navigation.goBack()}/>
            </View>
          </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} style={{height:"0px"}}>
          <View style={{width:"100%", alignItems:"center"}}>
            <View style={styles.headerBar}>
              <View style={{paddingHorizontal: '7px'}}>
                <Text style={styles.bigText}>Admin</Text>
              </View>
              <View style={{paddingHorizontal: '7px'}}>
                <Text style={styles.bigText}>Settings</Text>
              </View>
            </View>
          </View>
          <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
          
            <View style={styles.inputContainer}>
              <Text style={styles.normalBoldText}>GST rate</Text>
              <TextInput style={styles.textInput}
                placeholder="eg. 8"
                value={settings}
                onChangeText={(amount) => setSettings(amount)}
                autoCapitalize="none"
                autoCorrect={false}
                editable={isEditing}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      
        <View style={styles.bottomCard}>
          {isEditing ? (
            <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
              <View style={styles.buttonContainer}>
                <DefaultButton description='Cancel' onPress = {() => ConfirmationButton('Are you sure you want to cancel?', 'Changes will be reverted', handleToggleEdit())} customStyle={{width: "90%", maxWidth: "400px"}}/>
              </View>
              <View style={styles.buttonContainer}>
                <DefaultButton description='Save' onPress = {() => ConfirmationButton('Are you sure you want to save these changes?', 'Expense details will be updated', () => updateSettings())} customStyle={{width: "90%", maxWidth: "400px"}} buttonColor={"#45B097"}/>
              </View>
            </View>
          ) : (
            <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
              <View style={[styles.buttonContainer,{width:'100%'}]}>
                <DefaultButton description='Edit' onPress = {() => handleToggleEdit()} customStyle={{width: "90%", maxWidth: "400px"}} buttonColor={"#45B097"}/>
              </View>
            </View>
          )}
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
  pageDefault: {
    width: "100%",
    height: "90%",
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: "column",
  },
  topCard: {
    height: "70px",
    width:"100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  headerBar: {
    height: '95px',
    width:'60%',
    flexWrap:'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:'center',
    },
  bigText: {
    fontSize: "35px",
    fontWeight: "900",
    fontFamily: "inherit",
  },
  backButtonBar: {
    width:"90%",
    flexDirection:'row',
    justifyContent:'space-between'
  },
  deleteButton: {
    width:'40px',
    height:'40px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCard: {
    bottom: "0",
    height: "70px",
    width:"100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    borderTopWidth: "1px",
    borderColor: "#DADADA",
    backgroundColor: "white",
  },
  text: {
    fontSize: "17px",
    fontWeight: "700",
    fontFamily: "inherit",
  },
  content: {
    width:"90%",
    flex:"1",
  },
  inputContainer: {
    width:'85%',
    paddingBottom: "20px",
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
    padding: "15px",
    borderColor: "#DADADA",
  },
  inputContainer: {
    paddingVertical:'5px',
    width:'90%',
    maxWidth: '450px'
  },
  buttonContainer: {
    width:"50%",
    justifyContent:"center",
    alignItems:"center"
  },
});
