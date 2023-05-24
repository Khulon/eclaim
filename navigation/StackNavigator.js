import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './AuthenticationStack';
import useAuth from '../hooks/useAuth';
import HomeStack from './HomeStack';
import AdminStack from './AdminStack';

const Stack = createStackNavigator();
    

export default function StackNavigator() {
    const {user, setUser} = useAuth();
    const { userType, setUserType } = useAuth();

    return (
        <Stack.Navigator>
        {user ? (
            userType.userType == 'Admin' ? (
                <Stack.Screen name="AdminStack" component={AdminStack} options={{headerShown: false}}/> 
            ):(
                <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/> 
            )
        ):(
            <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} options={{headerShown: false}}/> 
        )}
        </Stack.Navigator>
    );
}





