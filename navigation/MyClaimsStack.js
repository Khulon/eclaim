import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EditJoinedClaimScreen from '../screens/myClaims/EditJoinedClaimScreen';
import EditCreatedClaimScreen from '../screens/myClaims/EditCreatedClaimScreen';
import MyClaimsScreen from '../screens/myClaims/MyClaimsScreen';
import AddMonthlyExpenseScreen from '../screens/myClaims/AddMonthlyExpenseScreen';
import EditMonthlyExpenseScreen from '../screens/myClaims/EditMonthlyExpenseScreen';
import AddTravelExpenseScreen from '../screens/myClaims/AddTravelExpenseScreen';
import EditTravelExpenseScreen from '../screens/myClaims/EditTravelExpenseScreen';


const Stack = createStackNavigator();


export default function MyClaimsStack() {

    return (
        <Stack.Navigator initialRouteName="MyClaimScreen">
            <Stack.Screen name="MyClaimsScreen" component={MyClaimsScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="EditJoinedClaimScreen" component={EditJoinedClaimScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="EditCreatedClaimScreen" component={EditCreatedClaimScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AddMonthlyExpenseScreen" component={AddMonthlyExpenseScreen} options={{headerShown: false}}/>
            <Stack.Screen name="EditMonthlyExpenseScreen" component={EditMonthlyExpenseScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AddTravelExpenseScreen" component={AddTravelExpenseScreen} options={{headerShown: false}}/>
            <Stack.Screen name="EditTravelExpenseScreen" component={EditTravelExpenseScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}
