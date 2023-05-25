import { Animated, TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations'; 
import { Ionicons } from "react-native-vector-icons";
import { createBoxShadowValue } from 'react-native-web/dist/cjs/exports/StyleSheet/preprocess';


export default function AdminEditUserScreen({ navigation, route }) {        

  const selectedId = route.data;
    


  console.log(selectedId);

  
  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const DeleteButtonHover = useRef(new Animated.Value(0)).current;
  const SaveButtonHover = useRef(new Animated.Value(0)).current;

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
      width: "100%",
      height: "90%",
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: "column",
      
    },
    topCard: {
      height: "70px",
      width:"100%",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",

    },
    headerBar: {
        height: '95px',
        width:'60%',
        flexWrap:'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent:'center',
      },
  
    bigText: {
        fontSize: "35px",
        fontWeight: "900",
        fontFamily: "inherit",
    },
    mediumText: {
        fontSize: "20px",
        fontWeight: "500",
        color: "#6A6A6A",
        fontFamily: "inherit",
    },
    backButtonBar: {
        width:"90%",
    },

    backButton: {
        fontFamily: "inherit",
        backgroundColor: "#D9D9D9",
        border: "none",

        alignItems: 'center',
        justifyContent: 'center',
        
        width: isBackButtonHover ? "43px" :"40px",
        height: isBackButtonHover ? "43px" :"40px",
        borderRadius: "14px",

        cursor: "pointer"
    },

    bottomCard: {
      bottom: "0",
      height: "70px",
      width:"100%",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "column",
      borderTopWidth: "1px",
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
      width:'85%',
      paddingBottom: "20px",
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
    normalBoldText: {
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "inherit",
        paddingVertical:'10px'
      },
      textInput: {
        height: "45px",
        color: "#6A6A6A",
        borderWidth: "1px",
        borderRadius: "12px",
        padding: "15px",
        borderColor: "#DADADA",
      },
  
      inputContainer: {
        paddingVertical:'5px',
        width:'90%',
        maxWidth: '450px'
      },

      buttonContainer: {
        width:"50%",
        justifyContent:"center",
        alignItems:"center"
      }

  });

  
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [companyEmail, setCompanyEmail] = useState(selectedId != null ? (selectedId):(''));
  const [department, setDepatment] = useState('');
  const [isSupervisor, setIsSupervisor] = useState('');
  const [isApprover, setIsApprover] = useState('');
  const [isProcessor, setIsProccessor] = useState('');

  return (
    <View style={styles.page}>
      <View style={styles.pageDefault}>
      <View style={styles.topCard}>
        
      <View style={styles.backButtonBar}>
      <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsBackButtonHover(true)} onMouseLeave={() => setIsBackButtonHover(false)} onPress={() => navigation.goBack()}>
        <View style={styles.backButton}>
          <Text><Ionicons name="chevron-back-outline" color="#444"/></Text>
        </View>
        <View style={{paddingHorizontal:'20px'}}>
          <Text style={styles.mediumText}>Go Back</Text>
        </View>
      </TouchableOpacity>
      </View>
      </View>


      <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false} style={{height:"0px"}}>
        <View style={{width:"100%", alignItems:"center"}}>
        <View style={styles.headerBar}>
        <View style={{paddingHorizontal: '7px'}}>
          <Text style={styles.bigText}>Edit</Text>
        </View>
        <View style={{paddingHorizontal: '7px'}}>
          <Text style={styles.bigText}>User</Text>
        </View>
        </View>
        </View>
  

        <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Name</Text>
          <TextInput style={styles.textInput}
            placeholder="Eg. Paul Lim" 
            value={name} 
            onChangeText={(name) => setName(name)} 
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Company</Text>
          <TextInput style={styles.textInput}
            placeholder="Company" 
            value={company} 
            onChangeText={(company) => setCompany(company)}
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Department</Text>
          <TextInput style={styles.textInput}
            placeholder="Department" 
            value={department} 
            onChangeText={(department) => setDepatment(department)}
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Company Email</Text>
          <TextInput style={styles.textInput}
            placeholder="example@gmail.com" 
            value={companyEmail} 
            onChangeText={(companyEmail) => setCompanyEmail(companyEmail)}
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Is a Supervisor?</Text>
          <TextInput style={styles.textInput}
            placeholder="Choose" 
            value={isSupervisor} 
            onChangeText={(isSupervisor) => setIsSupervisor(isSupervisor)}
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Is a Approver?</Text>
          <TextInput style={styles.textInput}
            placeholder="Choose" 
            value={isApprover} 
            onChangeText={(isApprover) => setIsApprover(isApprover)}
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.normalBoldText}>Is a Processor</Text>
          <TextInput style={styles.textInput}
            placeholder="Choose" 
            value={isProcessor} 
            onChangeText={(isProcessor) => setIsProccessor(isProcessor)}
            autoCapitalize="none" 
            autoCorrect={false} 
          />
          </View>
        </View>




      </ScrollView>
    
      </View>



      <View style={styles.bottomCard}>
        <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(DeleteButtonHover)} onMouseLeave={() => MovePosAnimation(DeleteButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: DeleteButtonHover }]}}>
        <TouchableOpacity style={styles.defaultButton} > Delete </TouchableOpacity>
        </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(SaveButtonHover)} onMouseLeave={() => MovePosAnimation(SaveButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: SaveButtonHover }]}}>
        <TouchableOpacity style={[styles.defaultButton,{backgroundColor:"#45B097"}]} > Save </TouchableOpacity>
        </Animated.View>
        </View>
        </View>

      </View>


      </View>
    </View>
    
  );
}


