import { Animated, TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { MoveNegAnimation, MovePosAnimation } from '../../assets/animation/AllAnimations'; 
import { Ionicons } from "react-native-vector-icons";
import { SelectList } from 'react-native-dropdown-select-list'
import ConfirmationButton from '../../components/ConfirmationButton';
import * as ImagePicker from 'expo-image-picker';



export default function AddMonthlyExpenseScreen({ navigation }) {        


  
  const [isBackButtonHover, setIsBackButtonHover] = useState(false);
  const CancelButtonHover = useRef(new Animated.Value(0)).current;
  const SaveButtonHover = useRef(new Animated.Value(0)).current;


  const expenseTypeDropdown = [
    {key:'0', value:'Entertainment and Gifts'},
    {key:'1', value:'Taxi, C/park, ERP'},
    {key:'2', value:'Fuel'},
    {key:'3', value:'Vehical Repair'},
    {key:'4', value:'Medical'},
    {key:'5', value:'Others'},
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

    imageInput: {
    width:'100%',
    height: "100px",
    color: "#6A6A6A",
    borderWidth: "1px",
    borderRadius: "12px",
    padding: "15px",
    borderColor: "#DADADA",
    position:"absolute", 
    backgroundColor:'#F4F4F4', 
    zIndex:-1,
    justifyContent:'center',
    alignItems:'center'
    },

    recieptImage: {
      width:'100%',
      height: "400px",
      borderRadius:'12px',
      borderWidth:'1px',
      borderColor:'#DADADA' 
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

  const image = window.localStorage.getItem('image')
  const [userDepartments, setDepartments] = React.useState([]);
  const [newUser, setNewUser] = useState({name:null, email:null, 
  company:null, department:null, isSupervisor: null, isApprover: null, isProcessor: null});

  useEffect(() => {
    setNewUser({...newUser, department: userDepartments});
  }, [userDepartments]);


  function addUser (){
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    console.log(userDepartments);
    console.log(newUser);
    fetch('http://localhost:5000/admin/addUser', {
      method: 'POST', 
      headers: header,
      body: JSON.stringify(newUser)})
      .then((response) => response.json())
      .then((resp) => { 
        console.log(resp);
        if(resp.message == 'User Added!') {
          alert('User Added!');
          window.location.reload(false);
        } else {
          alert('Failed to add user!');
        }
      });
  }; 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.canceled) {
      window.localStorage.setItem('image', result.uri);
    }
}



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
          <Text style={styles.bigText}>Expense</Text>
        </View>
        </View>
        </View>
  
      <View style={{padding:"15px",width:'100%', flex:"1", alignItems:'center', justifyContent:'center'}}>
      <View style={[styles.inputContainer,{zIndex:5}]}>
        <Text style={styles.normalBoldText}>Expense Type</Text>
        <SelectList
                dropdownStyles={styles.dropdownStyles}
                dropdownItemStyles={styles.dropdownItemStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                boxStyles={styles.boxStyles}
                inputStyles={styles.inputStyles} 
                setSelected={(company) => setNewUser({...newUser, company:company})}
                data={expenseTypeDropdown} 
                save="value"
                showsVerticalScrollIndicator = {false}
                search = {false}
            />  
        </View>
        
        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>If others, state type</Text>
        <TextInput style={styles.textInput}
          placeholder="eg. overtime meal" 
          value={newUser.name} 
          onChangeText={(name) => setNewUser({...newUser, name:name})} 
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Date</Text>
        <TextInput style={styles.textInput}
          placeholder="dd/mm/yy" 
          value={newUser.name} 
          onChangeText={(name) => setNewUser({...newUser, name:name})} 
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        </View>

        
        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Amount before GST</Text>
        <TextInput style={styles.textInput}
          placeholder="eg. 20.34" 
          value={newUser.email} 
          onChangeText={(email) => setNewUser({...newUser, email: email})}
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Amount after GST</Text>
        <TextInput style={styles.textInput}
          placeholder="eg. 23.00" 
          value={newUser.email} 
          onChangeText={(email) => setNewUser({...newUser, email: email})}
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        </View>

        {newUser.company == 'Entertainment and Gifts' ? (
        <View style={{width:'100%', alignItems:'center'}}>

        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Place</Text>
        <TextInput style={styles.textInput}
          placeholder="eg. 23.00" 
          value={newUser.email} 
          onChangeText={(email) => setNewUser({...newUser, email: email})}
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Customer Name</Text>
        <TextInput style={styles.textInput}
          placeholder="eg. 23.00" 
          value={newUser.email} 
          onChangeText={(email) => setNewUser({...newUser, email: email})}
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Company</Text>
        <TextInput style={styles.textInput}
          placeholder="eg. 23.00" 
          value={newUser.email} 
          onChangeText={(email) => setNewUser({...newUser, email: email})}
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        </View>

            </View>

        ):(
            <View></View>
        )}

        

        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Description</Text>
        <TextInput style={[styles.textInput,{height:'100px'}]}
          placeholder="Desciption of expense" 
          value={newUser.email} 
          multiline={true}
          onChangeText={(email) => setNewUser({...newUser, email: email})}
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        </View>
        
        <View style={styles.inputContainer}>
        <Text style={styles.normalBoldText}>Reciept</Text>
        <TouchableOpacity onPress={()=> pickImage()}>
          <Image style={styles.recieptImage}
            source={image}
          />
          <View style={[styles.imageInput]}>
          <Text><Ionicons name="images-outline" color="#444444" size='25px'/></Text>
          </View>
          </TouchableOpacity>

        </View>


      </View>

      </ScrollView>
    
      </View>



      <View style={styles.bottomCard}>
        <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(CancelButtonHover)} onMouseLeave={() => MovePosAnimation(CancelButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: CancelButtonHover }]}}>
        <TouchableOpacity onPress={() => ConfirmationButton('Are you sure you want to leave?', 'User information will not be saved', () => navigation.goBack())} style={styles.defaultButton} > Delete </TouchableOpacity>
        </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
        <Animated.View onMouseEnter={() => MoveNegAnimation(SaveButtonHover)} onMouseLeave={() => MovePosAnimation(SaveButtonHover)} style={{maxWidth: "400px", width: "90%", transform: [{translateY: SaveButtonHover }]}}>
        <TouchableOpacity style={[styles.defaultButton,{backgroundColor:"#45B097"}]} onPress = {() => ConfirmationButton('Confirm user creation?', 'User details can still be updated once created', () => addUser())}> Save </TouchableOpacity>
        </Animated.View>
        </View>
        </View>

      </View>


      </View>
    </View>
    
  );
}

