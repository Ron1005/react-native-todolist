import {View,StyleSheet,Text,Pressable,Button} from 'react-native'
import { Link } from 'expo-router'
export default function ToDo({title,note,id,onDelete}){

    const styles = StyleSheet.create({
        container: {
          backgroundColor: '#ffffff',
          borderRadius: 10,
          padding: 15,
          marginBottom: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        label: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 5,
        },
        content: {
          fontSize: 16,
          color: '#555',
          marginBottom: 10,
        },
        buttonContainer: {
          marginTop: 10,
          borderRadius: 5,
          overflow: 'hidden',
          marginBottom:10
        },
      });
    return(
        <View style={styles.container} id={id}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.content}>{title}</Text>
        <Text style={styles.label}>Note:</Text>
        <Text style={styles.content}>{note}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Mark Completed"
            color="#841584"
            onPress={() => onDelete(id)}
          />
        </View>
        <Link href={{
            pathname:'/editToDo',
            params:{
                id:id,
                title:title,
                note:note
            }
          }} as asChild>
            <Button title='Edit'>
            </Button>
          </Link>
      </View>
    )
}