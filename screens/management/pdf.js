

import { View, Image } from 'react-native';
import React from "react";





export default function pdf({route}) { 
    const image = route.params.image
    return (
        <View style={{ flexWrap:'wrap', width:'100%', flexGrow:1, flexDirection:'row'}}>

           <View style={{height:'50%', width:'340px'}}>
            <Image style={{flex:1, resizeMode:'contain'}}
            source={route.params.image}
            />
            </View>
            <View style={{height:'50%', width:'340px'}}>
            <Image style={{flex:1, resizeMode:'contain'}}
            source={route.params.image}
            />
            </View>
            <View style={{height:'50%', width:'340px'}}>
            <Image style={{flex:1, resizeMode:'contain'}}
            source={route.params.image}
            />
            </View>
            <View style={{height:'50%', width:'340px'}}>
            <Image style={{flex:1, resizeMode:'contain'}}
            source={route.params.image}
            />
            </View>
            <View style={{height:'50%', width:'340px'}}>
            <Image style={{flex:1, resizeMode:'contain'}}
            source={route.params.image}
            />
            </View>
            <View style={{height:'50%', width:'340px'}}>
            <Image style={{flex:1, resizeMode:'contain'}}
            source={route.params.image}
            />
            </View>
            <View style={{height:'50%', width:'340px'}}>
            <Image style={{flex:1, resizeMode:'contain'}}
            source={route.params.image}
            />
            </View>
            <View style={{height:'50%', width:'340px'}}>
            <Image style={{flex:1, resizeMode:'contain'}}
            source={route.params.image}
            />
            </View>




           
        </View>
    )
}