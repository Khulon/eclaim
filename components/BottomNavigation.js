import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Animated } from 'react-native'
import { Ionicons } from "react-native-vector-icons";
import React, {useRef, useState, useEffect} from 'react'
import { MoveNegAnimation, MovePosAnimation } from '../assets/animation/AllAnimations';



export default function BottomNavigaton({navigation}) {

    const buttonHover = useRef(new Animated.Value(0)).current;
    const buttonFade = useRef(new Animated.Value(0)).current;
    const [ buttonNumber, setButtonNumber ] = useState(null)
    const [ showHover, setShowHover ] = useState(false)
    const [ iconUnderline, setIconUnderline ] = useState(null)

    const stackScreen = window.localStorage.getItem('stackScreen')

    
    useEffect(() => {
        switch(stackScreen) {
            case 'Home':
                setIconUnderline(0)
            break;
            case 'Management':
                setIconUnderline(1)
            break;
            case 'MyClaims':
                setIconUnderline(3)
            break;
            case 'Profile':
                setIconUnderline(4)
            break;
            default:
                setIconUnderline(0)
        }
      }, []);


    useEffect(() => {
        HoverTransition(buttonHover)
      }, [buttonNumber]);

    useEffect(() => {
        HoverFade(buttonFade)
        HoverSet(buttonHover)
    }, [showHover]);



    function HoverTransition (translation) {
        Animated.spring(translation, {
            toValue: buttonNumber*60,
            speed:30,
            bounciness:5,
            useNativeDriver: true
        }).start();
    }

    function HoverSet (translation) {
        Animated.timing(translation, {
            toValue: buttonNumber*60,
            duration:0,
            useNativeDriver: true
        }).start();
    }

    function HoverFade (fade) {
        Animated.timing(fade, {
            toValue: showHover ? 1 : 0,
            duration: showHover ? 500 : 200,
            useNativeDriver: true,
          }).start();
    }

    const styles = StyleSheet.create({
        navigationBar: {
            height: "100%",
            width: "100%",
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "Arial",
            borderTopWidth:'1px',
            borderColor:'#D9D9D9'
        },
        iconContainer: {
            width:'60px',
            height:'50px',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:'12px'
        },
        button: {
            width:'100%',
            height:'100%',
            justifyContent:'center',
            alignItems:'center'
        },
        buttonHover: {
            width:'60px',
            height:'50px',
            backgroundColor: 'black',
            opacity:'10%',
            borderRadius:'10px'
        }

    
      });
    
    return(
        <View style={styles.navigationBar}>
        <View style={{width:'100%', height:'100%', flexDirection:'row', alignItems:'center', justifyContent:'center',paddingBottom:'19px' }}>
        <View style={{width:'300px', height:'50px', flexDirection:'row', alignItems:'center', justifyContent:'center'}} onMouseEnter={() => setShowHover(true)} onMouseLeave={() => setShowHover(false)}>

            <Animated.View style={{position:'absolute', width:'100%', height:'100%'}}>
            <Animated.View style={[{width:'60px', height:'50px', alignItems:'center'}, {transform: [{translateX: (iconUnderline*60) }]}]}>
                <View style={{height:'98%', width:'45%', borderColor:'#444444', borderBottomWidth:'2px'}}></View>
            </Animated.View>
            </Animated.View>

            <Animated.View style={{position:'absolute', width:'100%', height:'100%',opacity: buttonFade,}}>
            <Animated.View style={[styles.buttonHover, {transform: [{translateX: (buttonHover) }]}]}>
            </Animated.View>
            </Animated.View>

            <Animated.View style={styles.iconContainer} onMouseEnter={() => setButtonNumber(0)}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeStack') } >
                <Ionicons name="home-outline" color="#444" size='25px'/>
            </TouchableOpacity>
            </Animated.View>

            <Animated.View style={styles.iconContainer} onMouseEnter={() => setButtonNumber(1)}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManagementStack')} >
                <Ionicons name="file-tray-full-outline" color="#444" size='26px'/>
            </TouchableOpacity>
            </Animated.View>

            <Animated.View style={styles.iconContainer} onMouseEnter={() => setButtonNumber(2)}>
            <TouchableOpacity style={[styles.button, {height:'45px', paddingBottom:'5px'}]} onPress={() => navigation.navigate('AddClaimStack')} >
                <Ionicons name="duplicate-outline" color="#9C2424" size='30px'/>
            </TouchableOpacity>
            </Animated.View>

            <Animated.View style={styles.iconContainer} onMouseEnter={() => setButtonNumber(3)}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyClaimsStack')} >
                <Ionicons name="document-text-outline" color="#444" size='25px'/>
            </TouchableOpacity>
            </Animated.View>

            <Animated.View style={styles.iconContainer} onMouseEnter={() => setButtonNumber(4)}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileStack')} >
                <Ionicons name="people-outline" color="#444" size='25px'/>
            </TouchableOpacity>
            </Animated.View>


        </View>
        </View>  
        </View>
    )

}


