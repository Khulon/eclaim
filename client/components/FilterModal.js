import { StyleSheet, Text, View, ScrollView} from 'react-native';
import React, { useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import DefaultButton from './DefaultButton';
import CloseButton from './CloseButton';

/**
 * FilterModal Component
 *
 * A modal component for filtering data with date inputs.
 *
 * @param {function} closeModal - The callback function to be called when the modal is closed.
 * @param {function} applyFilter - The callback function to be called when the "Apply" button is pressed. It receives two parameters: `startDate` (Date), which is the selected start date, and `endDate` (Date), which is the selected end date.
 * @param {object} filterDate - An object containing the `startDate` (Date) and `endDate` (Date) to pre-fill the date inputs. If no pre-selected dates are provided, the current date is used.
 */
export default function FilterModal({ closeModal, applyFilter, filterDate }) {

    const [startDate, setStartDate ] = useState(new Date())
    const [endDate, setEndDate ] = useState(new Date())

    useEffect(() => {
      if (filterDate.startDate == null || filterDate.endDate == null) {
        const today = new Date();
        setStartDate(new Date(today.setHours(0, 0, 0, 0)));
        setEndDate(new Date(today.setHours(23, 59, 59)));
      }
      else {
        setStartDate(filterDate.startDate)
        setEndDate(filterDate.endDate)
      }
    }, [])

    return (
        <View style={styles.page}>
            <View style={styles.defaultPage}>
                {console.log(startDate, endDate)}
                <View style={styles.topBar}>
                <CloseButton onPress={closeModal} hideText={true} />
                </View>

                <View style={styles.headerBar}>
                    <View style={{paddingHorizontal: '7px'}}>
                        <Text style={styles.bigText}>Filter</Text>
                    </View>
                    <View style={{padding: '7px'}}>
                        <Text style={styles.bigText}>Inputs</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{width:'100%',height:'0px'}} showsVerticalScrollIndicator={false}>
                    <View style={{ width:'100%', alignItems:'center', justifyContent:'center'}}>
                        <View style={[styles.inputContainer, {zIndex:99}]}>
                            <Text style={styles.normalBoldText}>Date - From</Text>
                            <DatePicker className="custom-input" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                        </View>
                        <View style={[styles.inputContainer, {zIndex:98}]}>
                            <Text style={styles.normalBoldText}>Date - To</Text>
                            <DatePicker className="custom-input" selected={endDate} onChange={(date) =>  setEndDate(date)} dateFormat="dd/MM/yyyy" />
                        </View>
                    </View>
                </ScrollView>
                    
                <View style={{ width: '100%', height:'60px', justifyContent:'center', alignItems: 'center'}}>
                <DefaultButton description='Apply' onPress={() => applyFilter(startDate, endDate)} customStyle={{width: "90%", maxWidth: "400px"}}/>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create(
    {
      page: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
      },
      defaultPage: {
        height: "90%",
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Arial",
      },
      topBar: {
        height: "50px",
        width:"90%",
        alignItems: "center",
        flexDirection: "row",
      },
      headerBar: {
        height: '50px',
        width:'90%',
        flexWrap:'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
      },
      bigText: {
        fontSize: "25px",
        fontWeight: "900",
        fontFamily: "inherit",
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
        padding: "10px",
        borderColor: "#DADADA",
      },
      inputContainer: {
        height:'100px',
        paddingVertical:'5px',
        width:'90%',
      },
    });
  
  