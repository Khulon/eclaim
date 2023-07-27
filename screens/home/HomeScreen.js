import { StyleSheet, Text, View, Image } from 'react-native';
import React from "react";
import BottomNavigator from '../../components/BottomNavigation';
import LogoutButton from '../../components/LogoutButton';


export default function HomeScreen({ navigation }) {
  
  window.localStorage.setItem('stackScreen', 'Home');
  const name = window.localStorage.getItem('userName')

  return (
    <View style={styles.page}>
      <View style={styles.pageHome}>
        <View style={{width: "80%", height: 80, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <LogoutButton />
          </View>
      <View style={{alignItems: 'center', justifyContent: 'center', flexGrow:1}}>
        <Image 
          style={{width: 120, height: 120}}
          source={require('../../assets/engkong_logo.png')}
          resizeMode={'contain'}  
        />
        <Text style={styles.text}>Welcome</Text>
        <Text style={styles.text}>{name}</Text>
        </View>
      </View>
      <View style={styles.bottomNavigation}>
        <BottomNavigator navigation={navigation} />
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
  pageHome: {
    width: "90%",
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: "column",
  },
  bottomNavigation: {
    width:'100%',
    height: '80px'
  },
  text: {
    fontSize: "17px",
    fontWeight: "700",
    fontFamily: "inherit",
  },
});



