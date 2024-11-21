import { Text, View,FlatList,StyleSheet,Button } from "react-native";
import ToDo from '@/components/ToDo';
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';
export default function Index() {
  interface ToDoItem {
    id: string;
    title: string;
    note:string;
  }
  const [todolist,settodolist]= useState<ToDoItem[]>([])
  const isFocused = useIsFocused();

  const marktodoascompleted = async (id:string) =>{
    alert(`The id for this todo is ${id}`)
    const response = await fetch('http://192.168.1.43:3001/deletetodo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      })
    })
    const res = await response.json()
    if(response.status==200 && res.status=="success"){
      setvaluesfortodolist()
    }

}

  const setvaluesfortodolist = async () =>{
    try{
    const res = await fetch('http://192.168.1.43:3001/gettodos',{
      method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    const todolistfetched  = await res.json()
    if(res.status==200){
    console.log(todolistfetched)
    settodolist(todolistfetched)
    }
  }
  catch(error){
    console.log(error)
}
  }

  useEffect(()=>{
    if(isFocused)
    { 
    setvaluesfortodolist()
    }
  },[isFocused])

  const styles = StyleSheet.create({
    container:{
      flex:1
    },
    button:{
      width:200,
      height:50,
      alignSelf:'center',
      borderRadius:20,
      margin:12,
      paddingTop:15
  }
  })
  return (
   <View style={styles.container}>
    <FlatList data={todolist}
    renderItem={({item}) => 
    <ToDo title={item.title} note={item.note} id={item.id} onDelete={marktodoascompleted}/>}>
    </FlatList>
   </View>
  );
}

