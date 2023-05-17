import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './navigation/StackNavigator';


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

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StackNavigator" component={StackNavigator} options={{headerShown: false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

