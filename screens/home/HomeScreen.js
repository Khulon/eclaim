import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from "react";


export default function HomeScreen({ navigation }) {

        

  const [isLoginButtonHover, setIsLoginButtonHover] = useState(false);



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

});


  return (
    <View style={styles.page}>
      <View style={styles.pageLogin}>

        <Text style={styles.text}>Home Screen</Text>

      </View>
    </View>
    
  );
}

