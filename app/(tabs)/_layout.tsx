import {Tabs} from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout(){
    return(
    <Tabs>
        <Tabs.Screen name='index' options={{title:'List of To-Do',tabBarIcon:()=>{
            return(<Feather name="list" size={24} color="black" />)
        }}}>
        </Tabs.Screen>
        <Tabs.Screen name='addToDo' options={{title:'Add To-Do',tabBarIcon:()=>{
            return(<Entypo name="add-to-list" size={24} color="black" />)
        }}}>
        </Tabs.Screen>
    </Tabs>
    )
}