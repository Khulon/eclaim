import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './AuthenticationStack';
import HomeStack from './HomeStack';
import AdminStack from './AdminStack';


const Stack = createStackNavigator();


export default function StackNavigator() {

    const session = window.localStorage.getItem('session');
    const sessionType = window.localStorage.getItem('sessionType');

    return (
        <Stack.Navigator>
        {session != null ? (
            sessionType == 'Admin' ? (
                <Stack.Screen name="AdminStack" component={AdminStack} options={{headerShown: false}}/> 
            ):(
                <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/> 
            )
        ):(
            <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} options={{headerShown: false}}/> 
        )}
        </Stack.Navigator>
    );
};





