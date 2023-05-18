import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './AuthenticationStack';


const Stack = createStackNavigator();


export default function StackNavigator() {

    return (
        <Stack.Navigator initialRouteName="StartScreen">
            <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}





