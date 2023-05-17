
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createStackNavigator();


function MyStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}}/> 
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default MyStack;