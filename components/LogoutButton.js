import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useState} from "react";
import useAuth from '../hooks/useAuth';
import { Ionicons } from "react-native-vector-icons";
import ConfirmationButton from './ConfirmationButton';

/**
 * LogoutButton Component
 *
 * A button component for logging out the user.
 * Displays a confirmation dialog before logging out.
 * Uses the ConfirmationButton component for the confirmation dialog.
 */
export default function LogoutButton() {
    const { logoutUser } = useAuth();
    const [isLogoutButtonHover, setIsLogoutButtonHover] = useState(false);

    const styles = StyleSheet.create({
        LogoutButton: {
            fontFamily: "inherit",
            backgroundColor: "#D9D9D9",
            border: "none",
      
            alignItems: 'center',
            justifyContent: 'center',
            
            width: isLogoutButtonHover ? "43px" :"40px",
            height: isLogoutButtonHover ? "43px" :"40px",
            borderRadius: "14px",
      
            cursor: "pointer"
          },
    })

    return (
        <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsLogoutButtonHover(true)} onMouseLeave={() => setIsLogoutButtonHover(false)} onPress = {() => ConfirmationButton('Alert!', 'Are you sure you want to log out?', ()=> logoutUser())}>
            <View style={styles.LogoutButton}>
              <Text><Ionicons name="log-out-outline" color="#444" size='large'/></Text>
            </View>
        </TouchableOpacity>
    )
}