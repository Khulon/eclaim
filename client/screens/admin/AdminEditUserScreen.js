import { TextInput, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list';
import ConfirmationButton from '../../components/ConfirmationButton';
import MultiSelect from 'react-native-multiple-select';
import DefaultButton from '../../components/DefaultButton';
import BackButton from '../../components/BackButton';
import { Ionicons } from "react-native-vector-icons";

export default function AdminEditUserScreen({ navigation, route }) {        
  const [isLockButtonHover, setIsLockButtonHover] = useState(false);
  const [userDepartments, setUserDepartments] = useState([]);
  const [approvingDepartments, setApprovingDepartments] = useState([]);
  const [userDetails, setUserDetails] = useState({name: route.params.props.name, oldEmail: route.params.props.email, newEmail: route.params.props.email,
    company: route.params.props.company_prefix, supervisor: route.params.props.supervisor,
    approver: route.params.props.approver, processor: route.params.props.processor,
    department: null, approvingDepartments: null, locked: route.params.props.locked
  });

  useEffect(() => {
    const fetchedDepartments = [];
    const fetchedAppDpts = []
    for(var i in route.params.dpts) {
      fetchedDepartments.push(route.params.dpts[i].department);
    }
    for(var i in route.params.appDpts) {
      fetchedAppDpts.push(route.params.appDpts[i].department);
    }
    setUserDepartments(fetchedDepartments)
    setApprovingDepartments(fetchedAppDpts)
  }, []);

  useEffect(() => {
    setUserDetails({...userDetails, department: userDepartments, approvingDepartments: approvingDepartments});
  }, [userDepartments, approvingDepartments]);

  function deleteUser(userDetails) {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    fetch('http://dw.engkong.com:5000/admin/deleteUser', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(userDetails)})
      .then(response => response.json())
      .then(data => {
          console.log(data);
          if(data.message == "User Deleted!") {
            alert("User deleted successfully!")
            window.location.reload(false);
          } else {
            alert("User deletion failed!")
          }
        });
      
  }

  function updateUser(userDetails) {
    console.log(userDepartments)
    console.log(userDetails)
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    fetch('http://dw.engkong.com:5000/admin/editUser/save', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(userDetails)})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.message == "User Updated!") {
              alert("User updated successfully!")
              window.location.reload(false);
            } else {
              alert("User update failed!")
            }
          })
  }

  function lockUser(email) {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    fetch('http://dw.engkong.com:5000/admin/lockUser', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({email: email})})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.message == "User Locked!") {
              alert("User account has been locked!")
              window.location.reload(false);
            } else {
              alert("Failed to lock user account!")
            }
          })
  }

  function unlockUser(email) {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    fetch('http://dw.engkong.com:5000/admin/unlockUser', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({email: email})})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.message == "User Unlocked!") {
              alert("User account has been unlocked!")
              window.location.reload(false);
            } else {
              alert("Failed to unlock user account!")
            }
          })
  }


  return (
    <View style={styles.page}>
      <View style={styles.pageDefault}>

        <View style={styles.topCard}>
          <View style={{width:'100%', position:'absolute',zIndex:999, justifyContent:'space-between', flexDirection:'row'}}>
            <View style={{width:'23%', alignItems:'center'}}>
              <BackButton hideText={true} onPress={() => navigation.goBack()}/>
            </View>
            {userDetails.locked == 'Yes' ? (
              <View style={{width:'23%', alignItems:'center'}}>
              <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsLockButtonHover(true)} onMouseLeave={() => setIsLockButtonHover(false)} 
                onPress={() => ConfirmationButton('Are you sure you want to enable this user?', 'User will be allowed to log in',() => unlockUser(userDetails.oldEmail))}>
                <View style={styles.LockButton}>
                  {isLockButtonHover?(
                    <Ionicons name="lock-open" color="#9C2424" size="33px"/>
                  ):(
                    <Ionicons name="lock-closed" color="#9C2424" size="30px"/>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            ):( userDetails.locked == null ? (
              <View/>
            ) : (
              <View style={{width:'23%', alignItems:'center'}}>
              <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsLockButtonHover(true)} onMouseLeave={() => setIsLockButtonHover(false)} 
                onPress={() => ConfirmationButton('Are you sure you want to disable this user?', 'User will no longer be able to log in',() => lockUser(userDetails.oldEmail))}>
                <View style={styles.lockButton}>
                  {isLockButtonHover?(
                    <Ionicons name="lock-closed" color="#9C2424" size="33px"/>
                  ):(
                    <Ionicons name="lock-open" color="#9C2424" size="30px"/>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            )
            )}
          </View>
        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} style={{height:"0px"}}  >
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
                  value={userDetails.name} 
                  onChangeText={(name) => setUserDetails({...userDetails, name: name})} 
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
                  setSelected={(company) => setUserDetails({...userDetails, company: company})}
                  placeholder={userDetails.company}
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
                  onSelectedItemsChange={(department) => setUserDepartments(department)}
                  selectedItems= {userDepartments}
                  selectText="Select department(s)"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={ (text)=> console.log(text)}
                  styleInputGroup={{borderBottomWidth:1, borderColor:'#DADADA'}}
                  styleSelectorContainer={{borderWidth:1, borderColor:'#DADADA', borderRadius:12}}
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
                  placeholder="example@gmail.com" 
                  value={userDetails.newEmail} 
                  onChangeText={(email) => setUserDetails({...userDetails, newEmail: email})}
                  autoCapitalize="none" 
                  autoCorrect={false} 
                  editable={false}
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
                  setSelected={(val) => setUserDetails({...userDetails, supervisor: val})}
                  placeholder={userDetails.supervisor}
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
                  setSelected={(val) => setUserDetails({...userDetails, approver: val})} 
                  placeholder={userDetails.approver}
                  data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                  save="value"
                  showsVerticalScrollIndicator = {false}
                  search = {false}
                />  
              </View>

              {userDetails.approver == 'Yes' ? (
                <View style={[styles.inputContainer,{zIndex:2}]}>
                  <Text style={styles.normalBoldText}>Approver For?</Text>
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
                <View/>
              )}
              <View style={[styles.inputContainer,{zIndex:1}]}>
                <Text style={styles.normalBoldText}>Is a Processor?</Text>
                <SelectList
                  dropdownStyles={styles.dropdownStyles}
                  dropdownItemStyles={styles.dropdownItemStyles}
                  dropdownTextStyles={styles.dropdownTextStyles}
                  boxStyles={styles.boxStyles}
                  inputStyles={styles.inputStyles}  
                  setSelected={(val) => setUserDetails({...userDetails, processor: val})}
                  placeholder={userDetails.processor} 
                  data={[{key:'0', value:'No'},{key:'1', value:'Yes'},]} 
                  save="value"
                  showsVerticalScrollIndicator = {false}
                  search = {false}
                />  
              </View>
            </View>
            <View style={{height:'70px', zIndex:-1}}/>
          </ScrollView>
        </View>

        <View style={styles.bottomCard}>
          <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <View style={styles.buttonContainer}>
              <DefaultButton description='Delete' onPress={() => ConfirmationButton('Are you sure you want to delete?', 'This action cannot be undone', () => deleteUser(userDetails))} customStyle={{width: "90%", maxWidth: "400px"}}/>
            </View>
            <View style={styles.buttonContainer}>
              <DefaultButton description='Save' onPress={() => ConfirmationButton('Confirm user edit?', 'User details will be updated', ()=> updateUser(userDetails))} customStyle={{width: "90%", maxWidth: "400px"}} buttonColor={"#45B097"}/>
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