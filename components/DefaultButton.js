import { StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, { useRef, useState } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../assets/animation/AllAnimations';

export default function DefaultButton({description, onPress, customStyle}) {

    const buttonHover = useRef(new Animated.Value(0)).current;

    const styles = StyleSheet.create({
        defaultButton: {
            fontFamily: "inherit",
            backgroundColor: "#E04F4F",
            border: "none",
        
            padding: "10px",
            color: "white",
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "700",
            
            width: "100%",
            height: "40px",
            borderRadius: "14px",
            cursor: "pointer",
          },
    })

    return (
        <Animated.View onMouseEnter={() => MoveNegAnimation(buttonHover)} onMouseLeave={() => MovePosAnimation(buttonHover)} style={[{transform: [{translateY: buttonHover }]}, customStyle]} >
            <TouchableOpacity onPress={onPress} style={styles.defaultButton} > 
                {description} 
            </TouchableOpacity>
        </Animated.View>
    )
}