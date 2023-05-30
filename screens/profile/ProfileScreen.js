import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useState} from "react";
import useAuth from '../../hooks/useAuth';
import ConfirmationButton from '../../components/ConfirmationButton';
import BottomNavigator from '../../components/BottomNavigation';

export default function ProfileScreen({ navigation }) {

  window.localStorage.setItem('stackScreen', 'Profile');




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
      flexGrow:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: "column",
      
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

  });

  const { logoutUser } = useAuth();

  async function handleLogOut() {
    try {
      logoutUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.pageLogin}>

        <Text style={styles.text}>Profile Screen</Text>
        <TouchableOpacity onPress = {() => ConfirmationButton('Alert!', 'Are you sure you want to log out?', ()=>handleLogOut())}>Log Out</TouchableOpacity>

      </View>

      <View style={styles.bottomNavigation}>
      <BottomNavigator navigation={navigation} />
      </View>
    </View>
    
  );
}


