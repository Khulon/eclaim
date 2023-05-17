import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegistrationScreen from '../screens/authentication/RegistrationScreen';


const Stack = createStackNavigator();


const StackNavigator = () =>{

    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}

export default StackNavigator;




