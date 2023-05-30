import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "react-native-vector-icons";
import React, {useRef, useState} from 'react'
import { MoveNegAnimation, MovePosAnimation } from '../assets/animation/AllAnimations';



export default function BottomNavigaton({navigation}) {

    const styles = StyleSheet.create({
        navigationBar: {
            height: "100%",
            width: "100%",
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "Arial",
            borderTopWidth:'1px'
        },
        iconContainer: {
            width:'60px',
            alignItems:'center'
        }

    
      });
    
    return(
        <View style={styles.navigationBar}>
        <View style={{width:'100%', height:'100%', flexDirection:'row', alignItems:'center', justifyContent:'center',paddingBottom:'20px' }}>
        <View style={{width:'300px', height:'50px', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>


            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeStack')} >
                <Ionicons name="home-outline" color="#444" size='25px'/>
            </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ManagementStack')} >
                <Ionicons name="file-tray-full-outline" color="#444" size='25px'/>
            </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('AddClaimStack')} >
                <Ionicons name="duplicate-outline" color="#444" size='25px'/>
            </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('MyClaimsStack')} >
                <Ionicons name="document-text-outline" color="#444" size='25px'/>
            </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileStack')} >
                <Ionicons name="people-outline" color="#444" size='25px'/>
            </TouchableOpacity>
            </View>


        </View>
        </View>  
        </View>
    )

}


