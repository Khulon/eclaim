
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import React from "react";

export default function LoadingPage({isLoading}) {

    const styles = StyleSheet.create({
        loadingPage: {
            position:'absolute',
            height:'100%',
            width:'100%',
            zIndex: isLoading ? 999 : -1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'black',
            opacity: isLoading ? '50%' : '0%'
          },
    })

    return (
        <View style={styles.loadingPage}>
            <ActivityIndicator size='large' color="#E04F4F" />
        </View>
    )
}