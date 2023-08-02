import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './AuthenticationStack';
import HomeStack from './HomeStack';
import AdminStack from './AdminStack';
import ManagementStack from './ManagementStack';
import AddClaimStack from './AddClaimStack';
import MyClaimsStack from './MyClaimsStack';
import ProfileStack from './ProfileStack';
import StackFilter from './StackFilter';


const Stack = createStackNavigator();


export default function StackNavigator() {
    
    const session = window.localStorage.getItem('session');
    const sessionType = window.localStorage.getItem('sessionType');
    const token = window.localStorage.getItem('token');

    return (
        <Stack.Navigator>
        {session != null && token != null ? (
            sessionType == 'Admin' ? (
                <Stack.Screen name="AdminStack" component={AdminStack} options={{headerShown: false}}/> 
            ):(
                <Stack.Group screenOptions={{ headerShown: false, presentation: 'fullScreenModal'}}>
                    <Stack.Screen name="StackFilter" component={StackFilter}/>
                    <Stack.Screen name="HomeStack" component={HomeStack}/> 
                    <Stack.Screen name="ManagementStack" component={ManagementStack}/> 
                    <Stack.Screen name="AddClaimStack" component={AddClaimStack}/> 
                    <Stack.Screen name="MyClaimsStack" component={MyClaimsStack}/> 
                    <Stack.Screen name="ProfileStack" component={ProfileStack}/>
                </Stack.Group>
            )
        ):(
            <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} options={{headerShown: false}}/> 
        )}
        </Stack.Navigator>
    );
    
};
