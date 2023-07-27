import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal} from 'react-native';


export default function FilePicker({file_data, file_name, onChangeFile}) {
    const [fileName, setFileName] = useState(file_name)
    const [fileData, setFileData] = useState(file_data)

    async function pickAndUploadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '*/*';
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
        <View>
            {console.log(fileName)}
                {console.log(fileData)}
            <TouchableOpacity onPress={()=>pickAndUploadFile()}>
                Upload
            </TouchableOpacity>
            {(fileName != null && fileData != null) ? (
                <View>
                    <TouchableOpacity onPress={()=>downloadFile(fileName, fileData)}>
                        {fileName}
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
      )

}