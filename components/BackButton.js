import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useState } from "react";
import { Ionicons } from "react-native-vector-icons";

/**
 * BackButton Component
 *
 * A reusable component that represents a back button with an optional text label.
 *
 * @param {function} onPress - The callback function to be called when the button is pressed.
 * @param {boolean} hideText - Determines whether to hide the text label of the button. ("Go Back")
 */

export default function BackButton({onPress, hideText}) {
    const [isBackButtonHover, setIsBackButtonHover] = useState(false);

    const styles = StyleSheet.create({
        backButton: {
            fontFamily: "Arial",
            backgroundColor: "#D9D9D9",
            border: "none",
        
            alignItems: 'center',
            justifyContent: 'center',
            
            width: isBackButtonHover ? "43px" :"40px",
            height: isBackButtonHover ? "43px" :"40px",
            borderRadius: "14px",
        
            cursor: "pointer"
          },
    })

    return (
        <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress={onPress}>
          <View style={styles.backButton}>
            <Text><Ionicons name="chevron-back-outline" color="#444"/></Text>
          </View>

          {hideText ? (
            <View/>
          ) : (
            <View style={{paddingHorizontal:'20px'}}>
                <Text style={{fontSize: "20px",fontWeight: "500",color: "#6A6A6A",fontFamily: "inherit"}}>Go Back</Text>
            </View>
          )}
        </TouchableOpacity>
    )
}