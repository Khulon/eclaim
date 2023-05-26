import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ManagementScreen from '../screens/management/ManagementScreen';

const Stack = createStackNavigator();


export default function ManagementStack() {

    return (
        <Stack.Navigator initialRouteName="ManagementScreen">
            <Stack.Screen name="ManagementScreen" component={ManagementScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
