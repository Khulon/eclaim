import { TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from "react";
import { Ionicons, FontAwesome, Feather } from "react-native-vector-icons";
import filter from "lodash.filter"
import ConfirmationButton, {inputConfirmationButton} from '../../components/ConfirmationButton';
import { useIsFocused } from "@react-navigation/native";
import { parseDate, parseDatePeriod } from '../../functions/Parsers';
import excel from '../../excel/excel';
import Tooltip from '../../components/Tooltip';
import LoadingPage from '../../components/LoadingPage';
import DefaultButton from '../../components/DefaultButton';
import BackButton from '../../components/BackButton';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default function ViewManagedClaimsScreen({ navigation, route}) {
  const isFocused = useIsFocused();
  const [claim] = useState(route.params.props);    
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  
  const userDetails = JSON.parse(window.localStorage.getItem('details'))
  const [approvers, setApprovers] = useState([]);
  const [processor, setProcessor] = useState([]);
  const [table, setTable] = useState([])
  const [isDownloadExcelButtonHover, setIsDownloadExcelButtonHover] = useState(false)
  const [isDownloadPdfButtonHover, setIsDownloadPdfButtonHover] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedItemNo, setSelectedItemNo] = useState('');
  const [search, setSearch] = useState('')
  const monthlyPeriod = parseDatePeriod(claim.pay_period_from, claim.pay_period_to)
  const travellingPeriod = parseDatePeriod(claim.period_from, claim.period_to)

  
  useEffect(() => {
    if (isFocused) {
      setIsLoading(true)
      fetchData()
    }
    
  }, [isFocused]); 

  /**
   * fetchData Function
   * 
   * Fetches all expenses for the claim and claim history from database.
   * 
   * @param {string} id - claim id
   * @param {string} user - form creator of claim
   * @param {string} status - current claim status
   * @param {string} token - jwt token to verify user
   */
  async function fetchData() {
    try {
      const id = claim.id;
      const user = claim.form_creator;
      const status = claim.status;
      const token  = window.localStorage.getItem('token');
      await fetch(`http://10.0.1.28:5000/getExpenses/${user}/${id}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.message == "Token expired!") {
          throw new Error("Token expired!")
        }
        setFullData(data);
        setData(data);
        const newTable = []
        for(let i = 0; i < data.length; i++) {
          if(claim.form_type == "Travelling") {
            newTable.push({item_number: data[i].item_number, description: data[i].description, expense_type: data[i].expense_type,
              date_of_expense: parseDate(data[i].date_of_expense), total_amount: data[i].total_amount, receipt: data[i].receipt})

          } else {
            newTable.push({item_number: data[i].item_number, claimant: data[i].claimee, date_of_expense: parseDate(data[i].date_of_expense), 
              description: data[i].description, expense_type: data[i].expense_type, tax_base: data[i].amount_with_gst, gst_amount: data[i].gst_amount, 
              amount_without_gst: data[i].amount_without_gst, total_amount: data[i].total_amount, receipt: data[i].receipt,
            place: data[i].place, customers: data[i].customer_name, company: data[i].company_name})
          }
        }
        setTable(newTable)
        console.log(newTable)
      });

      fetch(`http://10.0.1.28:5000/getHistory/${id}/${status}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.message == "Token expired!") {
          throw new Error("Token expired!")
        }
        setApprovers(data.approvers);
        setProcessor(data.processor);
      });
      setIsLoading(false)
    } catch (error) {
      if(error.message == "Token expired!") {
        window.localStorage.clear()
        window.location.reload(false)
        alert("Session expired! Please login again.")
      } else {
        alert("Failed to load. Please check your internet connection!")
      }
      setIsLoading(false)
    }
  } 

  function totalAmount () {
    if (userDetails.email == claim.form_creator) {
      return '$' + (claim.total_amount)
    } else {
      var amount = 0
      if(fullData != null){
        for (var i = 0; i < fullData.length; i++) {
          amount += (fullData[i].total_amount)
        }
      }
      return '$' + amount
    }
  }

  function handleViewExpense(item) {
    console.log(item)
    if(claim.form_type == 'Travelling') {
      navigation.navigate("ViewManagedTravelExpenseScreen", {expense: item, claimStatus: claim.status})
    } else {
      navigation.navigate('ViewManagedMonthlyExpenseScreen', {expense: item, claimStatus: claim.status})
    } 
  }

  function handleSearch (search) {
    setSearch(search)
    const formattedQuery = search.toLowerCase();
    const filteredData = filter(fullData, (expense)=> {
      return contains(expense, formattedQuery)
    })
    setData(filteredData)
    //console.log(filteredData)
  }

  const contains = ({name, expense_type}, query) => {
    name = name.toLowerCase()
    expense_type = expense_type.toLowerCase()
    if (name.includes(query) || expense_type.includes(query)) {
      return true
    }
    return false
  }

  var parsedDate = ''
  if(claim.form_type == 'Travelling') {
    parsedDate = travellingPeriod
  } else {
    parsedDate = monthlyPeriod
  }

  const user = window.localStorage.getItem('session')


  /**
   * approveClaim Function
   * 
   * Sends a POST request to server to approve claim.
   * 
   * @param {object} claim - claim object with its details
   * @param {string} parsedDate - parsed date of claim
   * @param {string} user - user who is approving the claim
   */
  function approveClaim(claim) {
    fetch('http://10.0.1.28:5000/approveClaim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({claim: claim, parsedDate: parsedDate, user: user})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.message == 'Success!') {
          alert('Claim approved!')
          window.location.reload(false)
        } else {
          console.log(data.message)
          alert('Claim could not be approved!')
        }
      })
  }

  /**
   * processClaim Function
   * 
   * Sends a POST request to server to process claim.
   * 
   * @param {object} claim - claim object with its details
   * @param {string} parsedDate - parsed date of claim
   * @param {string} user - user who is processing the claim
   */
  function processClaim(claim) {
    fetch('http://10.0.1.28:5000/processClaim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({claim: claim, parsedDate: parsedDate, user: user})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.message == 'Success!') {
          alert('Claim processed!')
          window.location.reload(false)
        } else {
          console.log(data.message)
          alert('Claim could not be processed!')
        }
      })
  }

  /**
   * approverReject Function
   *
   * Sends a POST request to server for approver to reject claim.
   * 
   * @param {object} claim - claim object with its details
   * @param {string} description - description of why claim is rejected
   * @param {string} parsedDate - parsed date of claim
   * @param {string} user - user who is rejecting the claim
   */
  function approverReject(claim, description) {
    fetch('http://10.0.1.28:5000/approverRejectClaim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({claim: claim, description: description, parsedDate: parsedDate, user: user})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.message == 'Success!') {
          alert('Claim rejected!')
          window.location.reload(false)
        } else {
          console.log(data.message)
          alert('Claim could not be rejected!')
        }
      })
  }


  /**
   * processorReject Function
   * 
   * Sends a POST request to server for processor to reject claim.
   * 
   * @param {object} claim - claim object with its details
   * @param {string} description - description of why claim is rejected
   * @param {string} parsedDate - parsed date of claim
   * @param {string} user - user who is rejecting the claim
   */
  function processorReject(claim, description) {
    fetch('http://10.0.1.28:5000/processorRejectClaim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({claim: claim, description: description, parsedDate: parsedDate, user: user})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.message == 'Success!') {
          alert('Claim rejected!')
          window.location.reload(false)
        } else {
          console.log(data.message)
          alert('Claim could not be rejected!')
        }
      })
  }

  function handleDownloadPdfClaim (data) {
    try {
      console.log(data)
      const zip = new JSZip();
      var count = 0;
      
      for(var i = 0; i < data.length; i++) {
        if(data[i].receipt != null) {
          const uint8Array = new Uint8Array(data[i].receipt.data);
          // Convert the Uint8Array to a UTF-8 string using TextDecoder
          const utf8String = new TextDecoder().decode(uint8Array);
          zip.file(data[i].file_name, utf8String, {base64: true});
          count++;
        }
      }

      if(count == 0) {
        throw new Error("No receipts to download!")
      }
      
      zip.generateAsync({type: 'blob'}).then(function(content) {
        console.log(content)
        FileSaver.saveAs(content, 'Claim ' + claim.id + '.zip');
      })
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
    
  }

  const Item = ({receipt, checked, date, name, type, amount , backgroundColor, transform, onPress, onMouseEnter, onMouseLeave}) => (
    <TouchableOpacity onPress={onPress} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={[styles.userCard,{backgroundColor},{transform}]}>
      <View style={{height:"100%", width:"10%", minWidth:"30px", alignItems: "center", justifyContent: "center"}}>
        <Text>
          {type=='Transport'?(
            <Tooltip text={'Transport Expense'}>
              <Ionicons  name="car-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Entertainment and Gifts'?(
            <Tooltip text={'Entertainment Expense'}>
              <Ionicons  name="gift-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Mobile'?(
            <Tooltip text={'Mobile Expense'}>
              <Ionicons  name="call-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Fuel'?(
            <Tooltip text={'Fuel Expense'}>
              <Ionicons  name="color-fill-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Vehicle Repair'?(
            <Tooltip text={'Vehicle Repair Expense'}>
              <Ionicons  name="construct-outline" color="#444" size="25px"/>
            </Tooltip>
          ):type=='Medical'?(
            <Tooltip text={'Medical Expense'}>
              <Ionicons  name="medkit-outline" color="#444" size="25px"/>
            </Tooltip>
          ):(
            <Tooltip text={'Other Expenses'}>
              <Ionicons  name="reader-outline" color="#444" size="25px"/>
            </Tooltip>
          )}
        </Text>
      </View>

      <View style={{height:"105%", width:"90%", minWidth:"200px", justifyContent:"center"}}>
        <Text style={{fontSize: "16px", fontWeight:"700"}}>{date}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Name: {name}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Type: {type}</Text>
        <Text style={{color:"#444444", fontSize: "14px", marginLeft:"25px"}}>Cost: ${amount}</Text>
      </View>
      
      <View style={{width:'100%', height:'100%', position:'absolute', alignItems:'center', flexDirection:'row-reverse' }}>
        <View style={{width:"10%", height:'80%'}}/>
          <View style={{width:'110px', height:'80%', flexDirection:'row-reverse', backgroundColor:backgroundColor,}}>
            {checked == 'No' ? (
              <View style={{width:'30px', flexDirection:'row-reverse'}}>
                <Tooltip text={'Unchecked'}>
                  <Text><Ionicons name="alert-circle-outline" color="#E04F4F" size="25px"></Ionicons></Text>
                </Tooltip>
              </View>
            ):(
              <View></View>
            )}
              
            {receipt != null ? (
              <View>
                <Tooltip text={'Receipt'}>
                  <Text><Ionicons name="document-attach-outline" color="#444" size="25px"></Ionicons></Text>
                </Tooltip>
              </View>
            ):(
              <View></View>
            )}

          </View>
        <View style={{width:"4%", height:'80%', backgroundColor:backgroundColor, opacity:0.5}}/>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.email == selectedEmail ? item.item_number == selectedItemNo ? '#EEEEEE' : 'white' : 'white';
    const transform = item.email == selectedEmail ? item.item_number == selectedItemNo ? [{translateX: 2 }] : [{translateX: 0 }] : [{translateX: 0 }];
    function setEmailAndItemNumber (email, item_number) {
        setSelectedEmail(email)
        setSelectedItemNo(item_number)
    }
    return (
      <Item 
        email = {item.email}
        item_number = {item.item_number}
        receipt = {item.receipt}
        date = {parseDate(item.date_of_expense)}
        checked = {item.checked}
        name = {item.name} 
        type = {item.expense_type}
        amount = {item.total_amount}
        onMouseEnter={() => setEmailAndItemNumber(item.email, item.item_number)}
        onMouseLeave={() => setEmailAndItemNumber('','')}
        onPress={() => handleViewExpense(item)}
        backgroundColor={backgroundColor}
        transform={transform}
      />
    )
  }

  return (
    <View style={styles.page}>
      <LoadingPage isLoading={isLoading}/>
      <View style={styles.pageDefault}>

        <View style={styles.topCard}>
          <View style={{width:'100%', flexDirection:'row',paddingBottom:"10px"}}>
            <View style={{width:'100%', position:'absolute',zIndex:999, justifyContent:'space-between', flexDirection:'row'}}>
              <View style={{width:'23%', alignItems:'center'}}>
                <BackButton hideText={true} onPress={() => navigation.goBack()}/>
              </View>

              <View style={{width:'23%', flexDirection:'row', justifyContent:'center'}}>
                <View style={{width:'40px', alignItems:'center'}}>
                  <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsDownloadExcelButtonHover(true)} onMouseLeave={() => setIsDownloadExcelButtonHover(false)} 
                    onPress={() => excel(claim, table, approvers, processor)}>
                    <View style={styles.downloadButton}>
                      <Tooltip text={'Excel'} bottom={true}>
                        {isDownloadExcelButtonHover?(
                          <Text><FontAwesome name="file-excel-o" color="#3F9E87" size="27px"/></Text>
                        ):(
                          <Text><FontAwesome name="file-excel-o" color="#3F9E87" size="25px"/></Text>
                        )}
                      </Tooltip>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{width:'40px', alignItems:'center'}}>
                  <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onMouseEnter={() => setIsDownloadPdfButtonHover(true)} onMouseLeave={() => setIsDownloadPdfButtonHover(false)} 
                    onPress={() => handleDownloadPdfClaim(fullData)}>
                    <View style={styles.downloadButton}>
                      <Tooltip text={'Receipts'} bottom={true}>
                        {isDownloadPdfButtonHover?(
                          <Text><Feather name="download" color="#E04F4F" size="27px"/></Text>
                        ):(
                          <Text><Feather name="download" color="#E04F4F" size="25px"/></Text>
                        )}
                      </Tooltip>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{width:'100%', alignItems:"center"}}>
              <Text style={{fontSize:'16px', fontWeight:'600'}}>{claim.form_type == 'Travelling' ? travellingPeriod : monthlyPeriod}</Text>
              <Text style={{fontSize:'12px'}}>Creator: {claim.form_creator}</Text>
            </View>
          </View>

          <Text style={{fontFamily:"inherit", fontSize: "26px", fontWeight:"700"}}>{claim.form_type} Claim</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput}
              placeholder="Search" 
              value={search} 
              onChangeText={(search) => handleSearch(search)} 
              autoCapitalize="none" 
              autoCorrect={false} 
            />
            <View style={{height:'35px', width:'35px', position:'absolute', alignItems:'center', justifyContent:'center'}}>
              <Text style={{paddingRight:'10px'}}><Ionicons name="search-outline" color="#444" size='large'/></Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <FlatList
            style={{height:"0px"}}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => (item.email, item.item_number)}
          />
        </View>

        <View style={[styles.bottomCard, {height: ((userDetails.approver == "Yes" && claim.status == "Approved") || claim.status == "Processed" || claim.status == "Rejected" || claim.status == "Rejected by processor") ? "90px" : "140px"}]}>
          <View style={{position:'absolute', width:'100%', height:'100%', flexDirection:'row-reverse'}}>
            <Text style={{paddingTop:'5px', paddingRight:'10px', fontSize:'18px', fontWeight:500}}>ID: {claim.id}</Text>
          </View>
          <Text style={{paddingTop:"15px"}}>Total:</Text>
          <Text style={{paddingBottom: "10px", fontFamily:"inherit", fontSize: "20px", fontWeight:"700"}}>{totalAmount()}</Text>
          {userDetails.approver == 'Yes' ? (
            claim.status == "Submitted" || (claim.next_recipient == userDetails.email && (claim.status == "Rejected by processor" || claim.status == "Pending Next Approval" || claim.status == "Rejecting")) ? (
            <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
              <View style={styles.buttonContainer}>
                <DefaultButton description='Approve' onPress = {() => ConfirmationButton('Are you sure you want to approve?', 'You will still be able to view status under Management', () => approveClaim(claim))} customStyle={{width: "90%", maxWidth: "400px"}} buttonColor={"#45B097"}/>
              </View>
              <View style={styles.buttonContainer}>
                <DefaultButton description='Reject' onPress={() => inputConfirmationButton('Input rejection message', 'Confirm rejection with message: ', (description) => approverReject(claim, description))} customStyle={{width: "90%", maxWidth: "400px"}}/>
              </View>
            </View>
            ) : (
              <View/>
            )
          ):(
            //Processor
            userDetails.processor == 'Yes' && claim.status == "Approved" ? (
              <View style={{maxWidth:"500px" ,minWidth:"290px" ,width:"80%" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <View style={styles.buttonContainer}>
                  <DefaultButton description='Process' onPress = {() => ConfirmationButton('Are you sure you want to process?', 'The form creator will be notified', () => processClaim(claim))} customStyle={{width: "90%", maxWidth: "400px"}} buttonColor={"#45B097"}/>
                </View>
                <View style={styles.buttonContainer}>
                  <DefaultButton description='Reject' onPress={() => inputConfirmationButton('Input rejection message', 'Confirm rejection with message: ', (description) => processorReject(claim, description))} customStyle={{width: "90%", maxWidth: "400px"}}/>
                </View>
              </View>
              ) : (
              <View/>
            )
          )}
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
    justifyContent: 'flex-end',
    fontFamily: "Arial",
  },
  pageDefault: {
    width: "100%",
    height: "95%",
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
    width:"100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    borderTopWidth: "2px",
    borderColor: "#DADADA",
    backgroundColor: "white",
  },
  buttonContainer: {
      width:"50%",
      justifyContent:"center",
      alignItems:"center"
  },
  text: {
    fontSize: "17px",
    fontWeight: "700",
    fontFamily: "inherit",
  },
  textInput: {
    height: "35px",
    width:'100%',
    color: "#6A6A6A",
    backgroundColor: "#D9D9D9",
    borderWidth: "1px",
    borderRadius: "12px",
    padding: "10px",
    borderColor: "#DADADA",
  },
  content: {
    width:"95%",
    flex:"1",
  },
  inputContainer: {
    paddingVertical:'5px',
    width:'85%',
    paddingBottom: "15px",
    flexDirection:'row-reverse'
  },
  buttonText: {
    fontFamily: "inherit",
    padding: "10px",
    color: "white",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "700",
  },
  userCard: {
    backgroundColor: 'white',
    height:"100px",
    padding: "10px",
    borderBottomWidth: "0.5px",
    borderTopWidth: "0.5px",
    borderColor: "#DADADA",
    flexDirection: "row",
    alignItems:"center"
  },
  downloadButton: {
    width:'40px',
    height:'40px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});