//rnfes
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-elements';
// import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase';
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import { useEffect } from 'react';

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);
    

    const signOutUser = () =>{
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    //mapping to database id and data

    useEffect(() =>{
        const unsubscribe = db.collection('chats').onSnapshot(snapshot =>(
            setChats(snapshot.docs.map(doc => {console.log(doc.data());
            return{
                //({
                id: doc.id,
                data: doc.data(),
            }
        }
            // })
            ))
        ))
        return unsubscribe;
    },[])

    {console.log("Set Chats: ",setChats)}

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle : {backgroundColor: '#fff'},
            headerTitleStyle: {color: 'black'},
            headerLeft: () => (
            <View style={{marginLeft: 20}}>
                <TouchableOpacity activeOpacity= {0.5}>
                <Avatar onPress={signOutUser} rounded source={{uri: auth?.currentUser?.photoURL}}/>
                </TouchableOpacity>
                

            </View>),
            headerRight: () =>(
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                    }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons onPress={()=>navigation.navigate("AddChat")} name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                    
                </View>
            
            )
        });
        
        
    }, [navigation])

    //Navigate, passing id and chatName

    const enterChat = (id, chatName) =>{
        navigation.navigate("Chat", {
            id: id,
            chatName: chatName,
        })
    }

    return (
                //Chat prop destructor
                //Passing through enterChat function as a prop
        <SafeAreaView>
            <ScrollView styles={styles.container}>
                


                {/* {chats.map(({id, data: {chatName} }) =>(
                        <CustomListItem key={id}
                         id={id}
                          chatName={chatName}
                          enterChat={enterChat}/>
                ))} */}
                 {chats.map(chats =>{console.log("Chats: ",chats.id, chats.data.chatName);
                 return(
                        <CustomListItem key={chats.id}
                            id={chats.id}
                            chatName={chats.data.chatName}
                            enterChat={enterChat}/>
                 )})}

                <CustomListItem></CustomListItem>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    continue:{
        height: '100%'
    }
})
