import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import FilterScreen from '../screens/filter/FilterScreen';

const Stack = createStackNavigator();



export default function StackFilter() {
    return (
        <Stack.Navigator initialRouteName="FilterScreen">
            <Stack.Screen name="FilterScreen" component={FilterScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
