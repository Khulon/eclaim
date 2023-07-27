import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal} from 'react-native';


export default function FilePicker({file_data, file_name, onChangeFile, editable}) {
    const [fileName, setFileName] = useState(file_name)
    const [fileData, setFileData] = useState(file_data)

    async function pickAndUploadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, image/jpeg, image/png';
        input.addEventListener('change', async (event) => {
          const file = event.target.files[0];
          if (file) {
            try {
              const reader = new FileReader();
              reader.onload = async (e) => {
                const data = e.target.result.split(',')[1]; // Get Base64 data part after the comma
                // Now you can upload the fileData (Base64) to your server or perform other actions.
                //console.log('File Base64:', data);
                setFileData(data)
                setFileName(file.name)
                onChangeFile(data, file.name)
              };
              reader.readAsDataURL(file);
            } catch (err) {
              console.log('File reading failed:', err);
            }
          }
        });
      
        input.click();
      }
      
      // Function to handle file download in React Native Web
      function downloadFile(fileName, fileData) {
        const dataURI = `data:application/octet-stream;base64,${fileData}`;
      
        const link = document.createElement('a');
        link.href = dataURI;
        link.download = fileName;
      
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      return(
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View style={{height:'45px', flexGrow:1, borderWidth:'1px',borderColor: "#DADADA",borderRadius: "12px",padding: "15px", justifyContent:'center'}}>
            {(fileName != null && fileData != null) ? (
                <View>
                    <TouchableOpacity onPress={()=>downloadFile(fileName, fileData)}>
                      <Text style={{textDecorationLine: 'underline'}}>
                        {fileName} 
                      </Text>
                    </TouchableOpacity>
                </View>
            ):(
                <View>
                    <Text>
                        No File Selected
                    </Text>
                </View>
            ) }
          </View>

          {editable ? (
            <View style={{borderWidth:'1px', width:'100px', height:'45px',borderColor: "#DADADA",borderRadius: "8px",padding: "15px", backgroundColor:"#E3E3E3", alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>pickAndUploadFile()}>
                <Text style={{fontWeight:600, fontSize:'15px'}}>
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          ): (
            <View/>
          )}
        </View>
      )

}


const styles = StyleSheet.create({
  textInput: {
    height: "45px",
    color: "#6A6A6A",
    borderWidth: "1px",
    borderRadius: "12px",
    padding: "15px",
    borderColor: "#DADADA",
  },
})