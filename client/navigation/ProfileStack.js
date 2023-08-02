import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createStackNavigator();


export default function ProfileStack() {

    return (
        <Stack.Navigator initialRouteName="ProfileScreen">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
