import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useState} from "react";
import useAuth from '../../hooks/useAuth';


export default function AddClaimScreen({ navigation }) {

        


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

        <Text style={styles.text}>Add Claim</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>Go Back</TouchableOpacity>

      </View>
    </View>
    
  );
}


