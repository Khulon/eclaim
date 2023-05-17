import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.page}>
      <View style={styles.pageLogin}>

        <View style={{alignItems: 'center', justifyContent: 'center', height: "70%"}}>
        <Image 
          style={{width: 120, height: 120}}
          source={require('../../assets/engkong_logo.png')}
          resizeMode={'contain'}  
        />
        <Text style={styles.text}>Eng Kong Holdings</Text>
        <Text style={styles.text}>Pte Ltd</Text>
        </View>

        <View style={{width: "100%", height: "30%", alignItems: 'center',justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate("RegistrationScreen")} style={styles.defaultButton} > Login </TouchableOpacity>
          <View style={{flexDirection: "row" , paddingTop: "10px"}}>
            <Text > Don't have an account?</Text>
            <Text style={styles.textLink} onPress={() => navigation.navigate("RegistrationScreen")}> Register Now!</Text>
          </View>
          <StatusBar style="auto" />
        </View>

      </View>
    </View>
    
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
