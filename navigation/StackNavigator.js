import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/authentication/StartScreen';
import RegistrationScreen from '../screens/authentication/RegistrationScreen';


const Stack = createStackNavigator();


export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={StartScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}





