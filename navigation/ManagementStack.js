import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ManagementScreen from '../screens/management/ManagementScreen';
import ViewManagedClaimsScreen from '../screens/management/ViewManagedClaimsScreen';
import ViewManagedMonthlyExpenseScreen from '../screens/management/ViewManagedMonthlyExpenseScreen';
import ViewManagedTravelExpenseScreen from '../screens/management/ViewManagedTravelExpenseScreen';

const Stack = createStackNavigator();


export default function ManagementStack() {

    return (
        <Stack.Navigator initialRouteName="ManagementScreen">
            <Stack.Screen name="ManagementScreen" component={ManagementScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="ViewManagedClaimsScreen" component={ViewManagedClaimsScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="ViewManagedMonthlyExpenseScreen" component={ViewManagedMonthlyExpenseScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="ViewManagedTravelExpenseScreen" component={ViewManagedTravelExpenseScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
