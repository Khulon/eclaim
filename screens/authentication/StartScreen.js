import { StyleSheet, Text, View, Image} from 'react-native';
import React from "react";
import DefaultButton from '../../components/DefaultButton';

export default function StartScreen({ navigation }) {

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
          <DefaultButton description='Login' onPress={() => navigation.navigate("LoginScreen")} customStyle={{width: "90%", maxWidth: "400px"}}/>
          <View style={{flexDirection: "row" , paddingTop: "10px"}}>
            <Text > Don't have an account?</Text>
            <Text style={styles.textLink} onPress={() => navigation.navigate("RegistrationScreen")}> Register Now!</Text>
          </View>
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
});
