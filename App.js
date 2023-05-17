
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from "react";

/*
export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  <Text>{message}</Text>
  */


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

