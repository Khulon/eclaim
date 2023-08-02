import React, { useEffect, useState} from "react";
import { View, ActivityIndicator} from 'react-native';


export default function FilterScreen({ navigation }) {     
    
    const stackScreen = window.localStorage.getItem('stackScreen')
    
    useEffect(() => {
        switch(stackScreen) {
            case 'Home':
                navigation.navigate('HomeStack')
            break;
            case 'Management':
                navigation.navigate('ManagementStack')
            break;
            case 'MyClaims':
                navigation.navigate('MyClaimsStack')
            break;
            case 'Profile':
                navigation.navigate('ProfileStack')
            break;
            default:
                navigation.navigate('HomeStack')
        }
      }, []);


    return (
        <View style={{width:'100%', height:'100%', justifyContent:'center'}}>
            <ActivityIndicator size='large' color="#E04F4F" />
        </View>
    )

}