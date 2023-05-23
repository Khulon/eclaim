import { Animated, TextInput, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackgroundComponent} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations'; 



export default function AdminHomeScreen({ navigation }) {        


  const DATA = [
    {
      id: 'a@gmail.com',
      title: 'a',
      position: 'employee'
    },
    {
      id: 'b@gmail.com',
      title: 'b',
      position: 'employee'
    },
    {
      id: 'c@gmail.com',
      title: 'c',
      position: 'employee'
    },
    {
      id: 'd@gmail.com',
      title: 'd',
      position: 'employee'
    },
    {
      id: 'e@gmail.com',
      title: 'e',
      position: 'employee'
    },
    {
      id: 'f@gmail.com',
      title: 'f',
      position: 'employee'
    },
    {
      id: 'g@gmail.com',
      title: 'g',
      position: 'employee'
    },
    {
      id: 'h@gmail.com',
      title: 'h',
      position: 'employee'
    },

  ];


  const AddButtonHover = useRef(new Animated.Value(0)).current;

  const [search, setSearch] = useState('')

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
    pageDefault: {
      width: "90%",
      height: "90%",
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: "column",
      
    },
    topCard: {
      height: "130px",
      width:"100%",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "column",
      borderBottomWidth: "2px",
      borderColor: "#DADADA"
    },

    bottomCard: {
      bottom: "0",
      height: "100px",
      width:"100%",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "column",
      borderTopWidth: "2px",
      borderColor: "#DADADA",
      backgroundColor: "white",

      
    },

    text: {
      fontSize: "17px",
      fontWeight: "700",
      fontFamily: "inherit",
    },
    textInput: {
      height: "35px",
      color: "#6A6A6A",
      backgroundColor: "#D9D9D9",
      borderWidth: "1px",
      borderRadius: "12px",
      padding: "10px",
      borderColor: "#DADADA",
    },

    content: {
      width:"90%",
      flex:"1",
    },

    inputContainer: {
      paddingVertical:'5px',
      width:'90%',
      maxWidth: '450px',
      paddingBottom: "15px",
    },
    defaultButton: {
      fontFamily: "inherit",
      backgroundColor: "#E04F4F",
      border: "none",
  
      padding: "10px",
      color: "white",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "700",
      
      height: "40px",
      borderRadius: "14px",
  
      cursor: "pointer"
    },
    userCard: {
      backgroundColor: 'white',
      height:"80px",
      padding: "10px",
      borderBottomWidth: "0.5px",
      borderTopWidth: "0.5px",
      borderColor: "#DADADA",
    },

  });

  const Item = ({title, backgroundColor, transform, onMouseEnter, onMouseLeave}) => (
    <Animated.View>
    <TouchableOpacity onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={[styles.userCard,{backgroundColor},{transform}]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    </Animated.View>
  );

  const [selectedId, setSelectedId] = useState();
  
  const renderItem = ({item}) => {

    const backgroundColor = item.id === selectedId ? '#EEEEEE' : 'white';
    const transform = item.id === selectedId ? [{translateX: 2 }] : [{translateX: 0 }];
    
    return (
      <Item 
        title={item.title} 
        onMouseEnter={() => setSelectedId(item.id)} 
        onMouseLeave={() => setSelectedId(null)}
        backgroundColor={backgroundColor}
        transform={transform}
      />
    )
  }


  return (
    <View style={styles.page}>
      <View style={styles.pageDefault}>
      <View style={styles.topCard}>
        <Text style={{paddingBottom:"15px"}}>Admin Home</Text>
        <Text style={{fontFamily:"inherit", fontSize: "25px", fontWeight:"700"}}>User Accounts</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput}
            placeholder="Search" 
            value={search} 
            onChangeText={(search) => setSearch(search)} 
            autoCapitalize="none" 
            autoCorrect={false} 
          />
        </View>
      </View>


      <View style={styles.content}>
      <FlatList
        style={{height:"0px"}}
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>



      <View style={styles.bottomCard}>
        <Text style={{paddingTop:"15px"}}>Total Employees:</Text>
        <Text style={{paddingBottom: "10px", fontFamily:"inherit", fontSize: "20px", fontWeight:"700"}}>3</Text>
        
        <Animated.View onMouseEnter={() => MoveNegAnimation(AddButtonHover)} onMouseLeave={() => MovePosAnimation(AddButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: AddButtonHover }]}}>
        <TouchableOpacity style={styles.defaultButton} > Add </TouchableOpacity>
        </Animated.View>

      </View>


      </View>
    </View>
    
  );
}

