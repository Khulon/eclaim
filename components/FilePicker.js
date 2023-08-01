import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import FileViewer from 'react-file-viewer';
import CloseButton from './CloseButton'

export default function FilePicker({ file_data, file_name, onChangeFile, editable }) {
  const [fileName, setFileName] = useState(file_name);
  const [fileData, setFileData] = useState(file_data);
  const [viewerOpen, setViewerOpen] = useState(false);

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
            setFileData(data);
            setFileName(file.name);
            onChangeFile(data, file.name);
          };
          reader.readAsDataURL(file);
        } catch (err) {
          console.log('File reading failed:', err);
        }
      }
    });
    input.click();
  }

  function downloadFile(fileName, fileData) {
    const dataURI = `data:application/octet-stream;base64,${fileData}`;
    const link = document.createElement('a');
    link.href = dataURI;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function getFileExtension(fileName) {
    return fileName.split('.').pop().toLowerCase();
  }

  return (
    <View style={styles.spaceGiven}>
      <View style={styles.container}>
        {fileData ? (
          <View>
            <TouchableOpacity onPress={() => setViewerOpen(true)}>
              <Text style={{ textDecorationLine: 'underline', color: '#6A6A6A' }}>
                {fileName}
              </Text>
            </TouchableOpacity>
          </View>
          
        ) : (
          <View>
            <Text>No File Selected</Text>
          </View>
        )}
      </View>

      {editable ? (
        <View>
          <TouchableOpacity style={styles.uploadButton} onPress={pickAndUploadFile}>
            <Text style={{ fontWeight: '600', fontSize: 15 }}>Upload</Text>
          </TouchableOpacity>
        </View>
      ) : ( fileData ? (
        <View>
          <TouchableOpacity style={styles.uploadButton} onPress={()=>downloadFile(fileName, fileData)}>
            <Text style={{ fontWeight: '600', fontSize: 15 }}>Download</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View/>
      )
      )}

      {viewerOpen && fileData && (
        <Modal animationType="fade" transparent={false} visible={viewerOpen} showsVerticalScrollIndicator={false}>
          <View style={{position:'absolute',zIndex:99, padding:'50px' }}>
              <CloseButton onPress={() => setViewerOpen(false)}/>
            </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ width:'100%', height:'100%', resizeMode:'contain', justifyContent:'center'}}>

                <FileViewer
                  fileType={getFileExtension(fileName)} // Update this based on the file type you want to support
                  filePath={`data:application/octet-stream;base64,${fileData}`} // Update this based on the file type you want to support
                  style={{flex:1, borderWidth:'1px'}}
                />
              </View>

          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spaceGiven: {
    flexDirection:'row',
    alignItems:'center'
  },
  container: {
    height:'45px', 
    flexGrow:1,
    borderWidth:'1px',
    borderColor: "#DADADA",
    borderRadius: "12px",
    padding: "15px",
    justifyContent:'center'
  },
  uploadButton: {
    borderWidth:'1px',
    width:'100px',
    height:'45px',
    borderColor: "#DADADA",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor:"#E3E3E3",
    alignItems:'center',
    justifyContent:'center'
  }
})