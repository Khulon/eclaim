import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen'
import AdminAddUserScreen from '../screens/admin/AdminAddUserScreen'
import AdminEditUserScreen from '../screens/admin/AdminEditUserScreen';
import AdminSettingsScreen from '../screens/admin/AdminSettingsScreen';


const Stack = createStackNavigator();


export default function AdminStack() {
    return (
        <Stack.Navigator initialRouteName="AdminHomeScreen">
            <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="AdminAddUserScreen" component={AdminAddUserScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AdminEditUserScreen" component={AdminEditUserScreen} options={{headerShown: false}}/>  
            <Stack.Screen name="AdminSettingsScreen" component={AdminSettingsScreen} options={{headerShown: false}}/>  
        </Stack.Navigator>
    );
}
