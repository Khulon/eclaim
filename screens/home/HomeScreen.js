import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import React, { useEffect, useState} from "react";
import useAuth from '../../hooks/useAuth';
import BottomNavigator from '../../components/BottomNavigation';

export default function HomeScreen({ navigation }) {
  
  window.localStorage.setItem('stackScreen', 'Home');

  const email = window.localStorage.getItem('session')

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
    pageHome: {
      width: "90%",
      flexGrow: 1,
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


  return (
    <View style={styles.page}>
      <View style={styles.pageHome}>
      <View style={{alignItems: 'center', justifyContent: 'center', flexGrow:1}}>
        <Image 
          style={{width: 120, height: 120}}
          source={require('../../assets/engkong_logo.png')}
          resizeMode={'contain'}  
        />
        <Text style={styles.text}>Welcome</Text>
        <Text style={styles.text}>{email}</Text>
        

        </View>
      </View>
      <View style={styles.bottomNavigation}>
      <BottomNavigator navigation={navigation} />
      </View>
    </View>
    

  );
}


