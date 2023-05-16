import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image 
        style={{width: 500, height: 500}}
        source={require('./assets/engkong_logo.png')}
        resizeMode={'contain'} />
        <Text>Welcome to Eng Kong's Web Eclaim App!</Text>
        <TouchableOpacity onPress={() => alert('Not implemented yet!')}> Login </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Not implemented yet!')}> Create Account </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // flex: 1 = 100% of the screen
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
