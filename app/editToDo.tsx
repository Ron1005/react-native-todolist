import {View,Text, Pressable,Button,TextInput,StyleSheet} from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
export default function editToDo(){
    const { id } = useLocalSearchParams<{ id: string }>();
    const { title } = useLocalSearchParams<{ title: string }>();
    const { note} = useLocalSearchParams<{ note: string }>();
    const [titleedit,settitle] = useState(title)
    const [noteedit,setnote] = useState(note)
    const navigation = useNavigation()

    const updateToDo = async () =>{
        const response = await fetch('http://192.168.1.43:3001/updatetodo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                id:id,
                title:titleedit,
                note:noteedit
            })
        })
        const res = await response.json()
        if(response.status==200 && res.status=="success"){
        alert(`${title} is updated
             Thank you!!!!!`)
        navigation.goBack()
        
        }
    }
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
    return(
        <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.textInput}
        value={titleedit}
        placeholder="Enter title"
        placeholderTextColor="#888"
        onChangeText={(text) => settitle(text)}
      />
      <Text style={styles.label}>Note:</Text>
      <TextInput
        style={[styles.textInput, styles.textArea]}
        value={noteedit}
        placeholder="Enter note"
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setnote(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={updateToDo} color="#2196F3" />
      </View>
    </SafeAreaView>
</SafeAreaProvider>
    )

}