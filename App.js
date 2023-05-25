import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './navigation/StackNavigator';
import React from "react";
import { AuthProvider } from './hooks/useAuth';

const Stack = createStackNavigator();

export default function MyStack() {

  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator>
        <Stack.Screen name="StackNavigator" component={StackNavigator} options={{headerShown: false}}/>
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}