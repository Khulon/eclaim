import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function RegistrationScreen({ navigation }) {
  return (
    <View style={styles.page}>
        <Text >Registration page</Text>
        <Text onPress={() => navigation.goBack()}>Go Back</Text>
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
  });
  

