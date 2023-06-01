import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EditJoinedClaimScreen from '../screens/myClaims/EditJoinedClaimScreen';
import EditCreatedClaimScreen from '../screens/myClaims/EditCreatedClaimScreen';
import MyClaimsScreen from '../screens/myClaims/MyClaimsScreen';

const Stack = createStackNavigator();


export default function MyClaimsStack() {

    return (
        <Stack.Navigator initialRouteName="MyClaimScreen">
            <Stack.Screen name="MyClaimsScreen" component={MyClaimsScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="EditJoinedClaimScreen" component={EditJoinedClaimScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="EditCreatedClaimScreen" component={EditCreatedClaimScreen} options={{headerShown: false}}/> 
        </Stack.Navigator>
    );
}
