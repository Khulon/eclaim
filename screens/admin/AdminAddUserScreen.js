import { TextInput, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, { useState, useEffect } from "react";
import { SelectList } from 'react-native-dropdown-select-list'
import ConfirmationButton from '../../components/ConfirmationButton';
import MultiSelect from 'react-native-multiple-select';
import BackButton from '../../components/BackButton';
import DefaultButton from '../../components/DefaultButton';

export default function AdminAddUserScreen({ navigation, route}) {        
  
  const [userDepartments, setDepartments] = React.useState([]);
  const [approvingDepartments, setApprovingDepartments] = React.useState([]);
  const [newUser, setNewUser] = useState({name:'', email:'', company:'', department:'', isSupervisor: '', isApprover: '', isProcessor: '', approving: ''});

  useEffect(() => {
    setNewUser({...newUser, department: userDepartments, approving: approvingDepartments});
  }, [userDepartments, approvingDepartments]);

  function addUser (){
    if (newUser.isApprover == "Yes" && newUser.isSupervisor == "Yes") {
      alert ("user cannot be an approver and supervisor for the same department!")
    }
    else {
      const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
      console.log(userDepartments);
      console.log(newUser);
      fetch('http://10.0.1.28:5000/admin/addUser', {
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
    }
  }; 

  return (
    <View style={styles.page}>
      <View style={styles.pageDefault}>

        <View style={styles.topCard}>
          <View style={styles.backButtonBar}>
            <BackButton onPress={() => navigation.goBack()}/>
          </View>
        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} style={{height:"0px"}}>
            <View style={{width:"100%", alignItems:"center"}}>
              <View style={styles.headerBar}>
                <View style={{paddingHorizontal: '7px'}}>
                  <Text style={styles.bigText}>Add</Text>
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
                  placeholder="eg. Paul Lim" 
                  value={newUser.name} 
                  onChangeText={(name) => setNewUser({...newUser, name:name})} 
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
              <View style={[styles.inputContainer,{zIndex:6}]}>
                <Text style={styles.normalBoldText}>Company</Text>
                <SelectList
                  dropdownStyles={styles.dropdownStyles}
                  dropdownItemStyles={styles.dropdownItemStyles}
                  dropdownTextStyles={styles.dropdownTextStyles}
                  boxStyles={styles.boxStyles}
                  inputStyles={styles.inputStyles} 
                  setSelected={(company) => setNewUser({...newUser, company:company})}
                  placeholder= "eg. EKCA"
                  data={route.params.allComps} 
                  save="value"
                  showsVerticalScrollIndicator = {false}
                  search = {false}
                />  
              </View>
              <View style={[styles.inputContainer,{zIndex:5}]}>
                <Text style={styles.normalBoldText}>Belongs to?</Text>
                <MultiSelect
                  items={route.params.allDpts}
                  uniqueKey="value"
                  onSelectedItemsChange={(department) => setDepartments(department)}
                  selectedItems= {userDepartments}
                  selectText="Select department(s)"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={ (text)=> console.log(text)}
                  styleInputGroup={{borderBottomWidth:1, borderColor:'#DADADA'}}
                  styleSelectorContainer={{borderWidth:1, borderColor:'#DADADA' , borderRadius:12}}
                  styleRowList={{padding:5, backgroundColor:'white'}}
                  styleListContainer={{height: 256}}
                  styleDropdownMenuSubsection={{borderWidth:1, borderRadius:12, height:45, borderColor:'#DADADA', paddingLeft:20}}
                  styleTextDropdown={{color:'#6A6A6A'}}
                  searchInputStyle={{height:'45px'}}
                  altFontFamily='inherit'
                  tagRemoveIconColor="#6A6A6A"
                  tagBorderColor="#6A6A6A"
                  tagTextColor="#6A6A6A"
                  selectedItemTextColor="#45B097"
                  selectedItemIconColor="#6A6A6A"
                  itemTextColor="#6A6A6A"
                  displayKey="value"
                  hideSubmitButton
                  hideDropdown
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.normalBoldText}>Company Email</Text>
                <TextInput style={styles.textInput}
                  placeholder="example@engkong.com" 
                  value={newUser.email} 
                  onChangeText={(email) => setNewUser({...newUser, email: email})}
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
              <View style={[styles.inputContainer,{zIndex:4}]}>
                <Text style={styles.normalBoldText}>Is a Supervisor?</Text>
                <SelectList
                  dropdownStyles={styles.dropdownStyles}
                  dropdownItemStyles={styles.dropdownItemStyles}
                  dropdownTextStyles={styles.dropdownTextStyles}
                  boxStyles={styles.boxStyles}
                  inputStyles={styles.inputStyles}  
                  setSelected={(val) => setNewUser({...newUser, isSupervisor:val})} 
                  data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                  save="value"
                  showsVerticalScrollIndicator = {false}
                  search = {false}
                />  
              </View>
              <View style={[styles.inputContainer,{zIndex:3}]}>
                <Text style={styles.normalBoldText}>Is an Approver?</Text>
                <SelectList
                  dropdownStyles={styles.dropdownStyles}
                  dropdownItemStyles={styles.dropdownItemStyles}
                  dropdownTextStyles={styles.dropdownTextStyles}
                  boxStyles={styles.boxStyles}
                  inputStyles={styles.inputStyles}  
                  setSelected={(val) => setNewUser({...newUser, isApprover:val})} 
                  data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                  save="value"
                  showsVerticalScrollIndicator = {false}
                  search = {false}
                />  
              </View>
              {newUser.isApprover == 'Yes' ? (
                <View style={[styles.inputContainer,{zIndex:2}]}>
                  <Text style={styles.normalBoldText}>Approver for?</Text>
                  <MultiSelect
                    items={route.params.allDpts}
                    uniqueKey="value"
                    onSelectedItemsChange={(department) => setApprovingDepartments(department)}
                    selectedItems= {approvingDepartments}
                    selectText="Select department(s)"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={ (text)=> console.log(text)}
                    styleInputGroup={{borderBottomWidth:1, borderColor:'#DADADA'}}
                    styleSelectorContainer={{borderWidth:1, borderColor:'#DADADA' , borderRadius:12}}
                    styleRowList={{padding:5, backgroundColor:'white'}}
                    styleListContainer={{height: 256}}
                    styleDropdownMenuSubsection={{borderWidth:1, borderRadius:12, height:45, borderColor:'#DADADA', paddingLeft:20}}
                    styleTextDropdown={{color:'#6A6A6A'}}
                    searchInputStyle={{height:'45px'}}
                    altFontFamily='inherit'
                    tagRemoveIconColor="#6A6A6A"
                    tagBorderColor="#6A6A6A"
                    tagTextColor="#6A6A6A"
                    selectedItemTextColor="#45B097"
                    selectedItemIconColor="#6A6A6A"
                    itemTextColor="#6A6A6A"
                    displayKey="value"
                    hideSubmitButton
                    hideDropdown
                  />
                </View>
              ):(
                <View></View>
              )}
              <View style={[styles.inputContainer,{zIndex:1}]}>
                <Text style={styles.normalBoldText}>Is a Processor?</Text>
                <SelectList
                  dropdownStyles={styles.dropdownStyles}
                  dropdownItemStyles={styles.dropdownItemStyles}
                  dropdownTextStyles={styles.dropdownTextStyles}
                  boxStyles={styles.boxStyles}
                  inputStyles={styles.inputStyles}  
                  setSelected={(val) => setNewUser({...newUser, isProcessor:val})} 
                  data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                  save="value"
                  showsVerticalScrollIndicator = {false}
                  search = {false}
                />  
              </View>
            </View>
            <View style={{height:'70px', zIndex:-1}}></View>
          </ScrollView>
        </View>

        <View style={styles.bottomCard}>
          <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <View style={styles.buttonContainer}>
              <DefaultButton description='Cancel' onPress={() => ConfirmationButton('Are you sure you want to leave?', 'User information will not be saved', () => navigation.goBack())} customStyle={{width: "90%", maxWidth: "400px"}}/>
            </View>
            <View style={styles.buttonContainer}>
              <DefaultButton description='Save' onPress={() => ConfirmationButton('Confirm user creation?', 'User details can still be updated once created', () => addUser())} customStyle={{width: "90%", maxWidth: "400px"}} buttonColor={"#45B097"}/>
            </View>
          </View>
        </View>
      </View>
    </View>
    
  );
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
