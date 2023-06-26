

import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from "react";
import { Ionicons } from "react-native-vector-icons";




export default function pdf({route}) { 
    const [options, setOptions] = useState(0)
    const [hide, setHide] = useState(false)
    const lol = route.params.data
    const fullData = [
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
        {receipt: lol[0].receipt},
    ]

 

    const presets = [
        {receiptsPerPage: 1, numColumns: 1, height:'1045px', width:'100%', layout:'potrait'}, 
        {receiptsPerPage: 2, numColumns: 2, height:'715px', width:'50%', layout:'landscape'}, 
        {receiptsPerPage: 3, numColumns: 3, height:'715px', width:'33%', layout:'landscape'}, 
        {receiptsPerPage: 4, numColumns: 2, height:'522.5px', width:'50%', layout:'potrait'}, 
        {receiptsPerPage: 6, numColumns: 3, height:'357.5px', width:'33%', layout:'landscape'}, 
        {receiptsPerPage: 8, numColumns: 4, height:'357.5px', width:'25%', layout:'landscape'}, 
        {receiptsPerPage: 9, numColumns: 3, height:'348.33px', width:'33%', layout:'potrait'}, 
    ]

    
    const renderItem = ({item}) => {
        return (
            <View style={{height:(presets[options].height), width:(presets[options].width)}}>
                <Image style={{flex:1, resizeMode:'contain'}}
                    source={item.receipt}
                />
            </View>
        )
    }

    useEffect(() => {
        if (hide) {
          print()
          setHide(false)
        }
        
      }, [hide]);
    

    function handlePrint() {
        setHide(true)
    }

    return (
        <View style={{width:'100%', flexGrow:1, alignItems:'center'}}>
                {hide ? (
                    <View>
                    </View>
                ) : (
                    <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', height:'200px', borderWidth:'3px', borderColor:'black', width:'450px', borderRadius:'20px', position:'absolute', opacity:'0.5', backgroundColor:'white', zIndex:999}}>
                    <TouchableOpacity onPress={()=>options != 0 ? setOptions(options-1) : 0} style={{paddingHorizontal:'20px'}}>
                        <Text> <Text><Ionicons name="chevron-back-outline" color="#444" size='30px'/></Text> </Text>
                    </TouchableOpacity>
                    <View style={{width:'200px', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight:600, fontSize:'25px'}}>{presets[options].receiptsPerPage} per page</Text>
                        <Text style={{fontWeight:400, fontSize:'20px'}}>Click print, or ctrl-P, </Text>
                        <Text style={{fontWeight:400, fontSize:'20px'}}>then select layout </Text>
                        <Text style={{fontWeight:400, fontSize:'20px'}}>options ({presets[options].layout})</Text>
                        <TouchableOpacity style={{alignItems:'center'}} onPress={()=> handlePrint()}>
                            <Text> <Text><Ionicons name="print-outline" color="#444" size='30px'/></Text> </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>options != 6 ? setOptions(options+1) : 6} style={{paddingHorizontal:'20px'}}>
                        <Text> <Text><Ionicons name="chevron-forward-outline" color="#444" size='30px'/></Text> </Text>
                    </TouchableOpacity>
                    </View>
                )}


            {options == 0 ? (
                <FlatList
                key={'0'}
                style={{width:'100%', height:'100%'}}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                data={fullData}
                renderItem={renderItem}
            />
            ) : options == 1 ? (
                <FlatList
                key={'1'}
                style={{width:'100%', height:'100%'}}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={fullData}
                renderItem={renderItem}
            />
            ) : options == 2 ? (
                <FlatList
                key={'2'}
                style={{width:'100%', height:'100%'}}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={fullData}
                renderItem={renderItem}
            />
            ) : options == 3 ? (
                <FlatList
                key={'3'}
                style={{width:'100%', height:'100%'}}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={fullData}
                renderItem={renderItem}
            />
            ) : options == 4 ? (
                <FlatList
                key={'4'}
                style={{width:'100%', height:'100%'}}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={fullData}
                renderItem={renderItem}
            />
            ) : options == 5 ? (
                <FlatList
                key={'5'}
                style={{width:'100%', height:'100%'}}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                data={fullData}
                renderItem={renderItem}
            />
            ) : (
                <FlatList
                key={'6'}
                style={{width:'100%', height:'100%'}}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={fullData}
                renderItem={renderItem}
            />
            )}
            
        </View>
    )
}