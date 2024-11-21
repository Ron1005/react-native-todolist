import { useState } from 'react'
import {View,Text,StyleSheet,TextInput, Pressable, Button} from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
export default function addToDo(){
    const [title,settitle] = useState('')
    const [note,setnote] = useState('')
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop:100,
          padding: 20,
          backgroundColor: '#f9f9f9', // Light background
        },
        label: {
          fontSize: 16,
          fontWeight: '600',
          color: '#333', // Dark text for contrast
          marginBottom: 5,
        },
        textInput: {
          height: 40,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          marginBottom: 15,
        },
        textArea: {
          height: 80, // Larger input for notes
          textAlignVertical: 'top', // Align text to the top for multiline
        },
        buttonContainer: {
          marginTop: 20,
          borderRadius: 5, // Rounded button effect
          overflow: 'hidden', // Clip to border radius
        },
      });
    const submitToDO = async () => {
        const response = await fetch('http://192.168.1.43:3001/addtodo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                title:title,
                note:note
            })
        })
        const res = await response.json()
        if(response.status==200 && res.status=="success"){
        alert(`${title} is submitted
             Thank you!!!!!`)
        }
        settitle('')
        setnote('')

    }
    return(
<SafeAreaProvider>
<SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.textInput}
        value={title}
        placeholder="Enter title"
        placeholderTextColor="#888"
        onChangeText={(text) => settitle(text)}
      />
      <Text style={styles.label}>Note:</Text>
      <TextInput
        style={[styles.textInput, styles.textArea]}
        value={note}
        placeholder="Enter note"
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setnote(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={submitToDO} color="#2196F3" />
      </View>
    </SafeAreaView>
</SafeAreaProvider>
)
}