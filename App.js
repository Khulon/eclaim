


import { StyleSheet} from 'react-native';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';



export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <StackNavigator/> 
      </Stack.Navigator>
    </NavigationContainer>

  );
}



const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    minWidth: "330px",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "Arial",
  },

  pageLogin: {
    width: "80%",
    height: "80%",
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: "column",
    
  },
  text: {
    fontSize: "17px",
    fontWeight: "700",
    fontFamily: "inherit",
  },

  textLink: {
    fontWeight: "700",
    textDecorationLine: 'underline',
    color: '#E04F4F'
  },

  defaultButton: {
    fontFamily: "inherit",
    backgroundColor: "#E04F4F",
    border: "none",

    padding: "10px",
    color: "white",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "700",
    
    width: "80%",
    maxWidth: "400px",
    height: "40px",
    borderRadius: "14px",

    cursor: "pointer"
  },

});

