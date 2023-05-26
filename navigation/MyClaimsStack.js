import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyClaimsScreen from '../screens/myClaims/MyClaimsScreen';

const Stack = createStackNavigator();


export default function MyClaimsStack() {

    return (
        <Stack.Navigator initialRouteName="MyClaimScreen">
            <Stack.Screen name="MyClaimsScreen" component={MyClaimsScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
