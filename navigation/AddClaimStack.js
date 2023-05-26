import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AddClaimScreen from '../screens/addClaim/AddClaimScreen';

const Stack = createStackNavigator();


export default function AddClaimStack() {

    return (
        <Stack.Navigator initialRouteName="AddClaimScreen">
            <Stack.Screen name="AddClaimScreen" component={AddClaimScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
