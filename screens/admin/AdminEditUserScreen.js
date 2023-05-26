import { Animated, TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations'; 
import { Ionicons } from "react-native-vector-icons";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'



    

export default function AdminEditUserScreen({ navigation, route }) {        
  
  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const DeleteButtonHover = useRef(new Animated.Value(0)).current;
  const SaveButtonHover = useRef(new Animated.Value(0)).current;
  
  const [selected, setSelected] = React.useState("");
  const companies = [
    {key:'0', value:'EKCA'},
    {key:'1', value:'Reefertec'},
    {key:'2', value:'PCL'},
    {key:'3', value:'SmartZ'},
    {key:'4', value:'EKH'},
    ]
const departments = [
    {key:'0', value:'EKTS'},
    {key:'1', value:'EKTU'},
    {key:'2', value:'EKTY'},
    {key:'3', value:'EKJP'},
    {key:'4', value:'EKTK'},
    {key:'5', value:'IME'},
    {key:'6', value:'Reefertec'},
    {key:'7', value:'Smartz'},
    {key:'8', value:'PCL'},
    {key:'9', value:'Finance'},
    {key:'10', value:'IT'},
    {key:'11', value:'Marketing'},
    {key:'12', value:'HR'},
    {key:'13', value:'Eddie'},
    {key:'14', value:'Paul'},
    ]


  function loadCurrentDepartmentAsString () {
    var departmentString = ''
    if (route.params.props.department.length == 0) {
        return departmentString
    }
    else {
        for (var i = 0; i < route.params.props.department.length; i++) {
            if (i == 0) {
                departmentString += route.params.props.department[i]
            }
            departmentString += ', ' + route.params.props.department[i]
        }    
    }
    return departmentString;
  }
  

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
    },
    dropdownStyles: {
        position:"absolute",
        width:"100%",
        top:35,
        zIndex:1,
        backgroundColor:"white",
        borderColor:"#DADADA"

    },
    dropdownItemStyles: {
        marginHorizontal:"5px",
        height:"40px",
    },
    dropdownTextStyles: {
        color: "#6A6A6A",
    },
    boxStyles: {
        borderColor:"#DADADA",
    },
    inputStyles: {
        color: "#6A6A6A",
    },

  });

  
  const [name, setName] = useState(route.params.props.name);
  const [company, setCompany] = useState(route.params.props.company);
  const [companyEmail, setCompanyEmail] = useState(route.params.props.email);
  const [department, setDepartment] = useState(loadCurrentDepartmentAsString());
  const [isSupervisor, setIsSupervisor] = useState(route.params.props.supervisor);
  const [isApprover, setIsApprover] = useState(route.params.props.approver);
  const [isProcessor, setIsProcessor] = useState(route.params.props.processor);

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
          <View style={[styles.inputContainer,{zIndex:5}]}>
          <Text style={styles.normalBoldText}>Company</Text>
          <SelectList
                dropdownStyles={styles.dropdownStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                boxStyles={styles.boxStyles}
                inputStyles={styles.inputStyles}  
                setSelected={(val) => setSelected(val)} 
                onSelect={() => setCompany(selected)}
                placeholder={company}
                data={companies} 
                save="value"
                showsVerticalScrollIndicator = {false}
                search = {false}
            />  
          </View>
          <View style={[styles.inputContainer,{zIndex:4}]}>
          <Text style={styles.normalBoldText}>Department</Text>
          <MultipleSelectList
                dropdownStyles={[styles.dropdownStyles, {top:45}]}
                dropdownItemStyles={styles.dropdownItemStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                boxStyles={[styles.boxStyles,{flexDirection:'column'}]}
                inputStyles={[styles.inputStyles]}
                setSelected={(val) => setSelected(val)}
                onSelect={() => setDepartment(selected)}
                placeholder={department}
                data={departments}
                save="value"
                showsVerticalScrollIndicator = {true}
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
          <View style={[styles.inputContainer,{zIndex:3}]}>
          <Text style={styles.normalBoldText}>Is a Supervisor?</Text>
          <SelectList
                dropdownStyles={styles.dropdownStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                boxStyles={styles.boxStyles}
                inputStyles={styles.inputStyles}  
                setSelected={(val) => setSelected(val)} 
                onSelect={() => setIsSupervisor(selected)}
                placeholder={isSupervisor}
                data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                save="value"
                showsVerticalScrollIndicator = {false}
                search = {false}
            />  
          </View>

          <View style={[styles.inputContainer,{zIndex:2}]}>
          <Text style={styles.normalBoldText}>Is an Approver?</Text>
          <SelectList
                dropdownStyles={styles.dropdownStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                boxStyles={styles.boxStyles}
                inputStyles={styles.inputStyles}  
                setSelected={(val) => setSelected(val)} 
                onSelect={() => setIsApprover(selected)}
                placeholder={isApprover}
                data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                save="value"
                showsVerticalScrollIndicator = {false}
                search = {false}
            />  
          </View>
          <View style={[styles.inputContainer,{zIndex:1}]}>
          <Text style={styles.normalBoldText}>Is a Processor?</Text>
          <SelectList
                dropdownStyles={styles.dropdownStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                boxStyles={styles.boxStyles}
                inputStyles={styles.inputStyles}  
                setSelected={(val) => setSelected(val)}
                onSelect={() => setIsProcessor(selected)}
                placeholder={isProcessor} 
                data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                save="value"
                showsVerticalScrollIndicator = {false}
                search = {false}
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
        <TouchableOpacity onPress={()=> console.log(department)} style={[styles.defaultButton,{backgroundColor:"#45B097"}]} > Save </TouchableOpacity>
        </Animated.View>
        </View>
        </View>

      </View>


      </View>
    </View>
    
  );
}


