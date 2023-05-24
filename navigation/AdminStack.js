import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen'
import AdminAddUserScreen from '../screens/admin/AdminAddUserScreen'


const Stack = createStackNavigator();


export default function AdminStack() {
    return (
        <Stack.Navigator initialRouteName="AdminHomeScreen">
            <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="AdminAddUserScreen" component={AdminAddUserScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
