import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AddClaimScreen from '../screens/addClaim/AddClaimScreen';
import MonthlyExpenseForm from '../screens/addClaim/MonthlyExpenseForm';
import TravellingExpenseForm from '../screens/addClaim/TravellingExpenseForm';

const Stack = createStackNavigator();


export default function AddClaimStack() {

    return (
        <Stack.Navigator initialRouteName="AddClaimScreen">
            <Stack.Screen name="AddClaimScreen" component={AddClaimScreen} options={{headerShown: false}}/>
            <Stack.Screen name="MonthlyExpenseForm" component={MonthlyExpenseForm} options={{headerShown: false}}/> 
            <Stack.Screen name="TravellingExpenseForm" component={TravellingExpenseForm} options={{headerShown: false}}/>  
        </Stack.Navigator>
    );
}
