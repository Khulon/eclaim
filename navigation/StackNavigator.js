import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './AuthenticationStack';
import HomeStack from './HomeStack';

const Stack = createStackNavigator();
    

export default function StackNavigator() {
    const [user, setUser] = useState(false);

    return (
        <Stack.Navigator>
        {user ? (
            <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/> 
        ):(
            <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} options={{headerShown: false}}/> 
        )}
        </Stack.Navigator>
    );
}





