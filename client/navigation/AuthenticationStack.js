import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/authentication/StartScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegistrationScreen from '../screens/authentication/RegistrationScreen';


const Stack = createStackNavigator();


export default function AuthenticationStack() {
    return (
        <Stack.Navigator initialRouteName="StartScreen">
            <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
