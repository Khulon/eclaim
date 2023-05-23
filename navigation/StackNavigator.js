import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './AuthenticationStack';
import HomeStack from './HomeStack';
import AdminStack from './AdminStack';

const Stack = createStackNavigator();
    

export default function StackNavigator() {
    const [user, setUser] = useState(false);
    const [userType, setUserType] = useState(true);

    return (
        <Stack.Navigator>
        {user ? (
            userType ? (
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





