import { View, Image, TouchableOpacity } from 'react-native';
import React from "react";

/**
 * FullScreenImage Component
 *
 * A component that displays an image in full-screen mode with a translucent overlay.
 *
 * @param {object} image - The source of the image to be displayed.
 * @param {function} myFunction - The callback function to be called when the image is pressed.
 * @param {boolean} show - Determines whether to show or hide the full-screen image component.
 */
export default function FullScreenImage ({image, myFunction, show}) {
    
    const handleButtonPress = () => {
        myFunction();
      };

    if (show == true) {
        return (
            <TouchableOpacity onPress={handleButtonPress} style={{width:'100%', height:'100%', position:'absolute', zIndex:998,justifyContent:'center', alignItems:'center'}}>
            <View style={{width:'100%', height:'100%', backgroundColor:'black', opacity:'0.4', position:'absolute'}}></View>
            <View style={{height:'90%', width:'90%', justifyContent:'center'}}>
            <Image style={{ flex:1, resizeMode:'contain'}}
                    source={image}
                    />
            </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <View></View>
        )
    }
}
