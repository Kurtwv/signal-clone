import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
//import * as firebase from "firebase";
import firebase from 'firebase/app'
import { db, auth } from '../firebase'
import { separateMessageFromStack } from 'jest-message-util'

const ChatScreen = (info) => {
    const [input, setInput] = useState("")
    const [message, setMessage] = useState([]);

    const sendMessage = () =>{
        Keyboard.dismiss();
        db.collection('chats').doc(info.route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            chatMessage: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });
        setInput('');
        
        };
    console.log("info: ", info)

    useLayoutEffect(() =>{
        info.navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style = {styles.headerTitle}>
                    <Avatar source={{uri:"http://www.connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png"}} rounded></Avatar>
                    <Text style={{color: "white", marginLeft: 10, fontWeight: "700"}}>{info.route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity>
                    <AntDesign onPress={info.navigation.goBack} name="arrowleft" size={24} color="white"></AntDesign>

                </TouchableOpacity>
            ),
            headerRight:() =>(
                <View style = {styles.right}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[info.navigation]);

    useLayoutEffect(()=>{
        console.log("NOT SURE :",db.collection('chats').doc(info.route.params.id))
        const unsubscribe = db
        .collection('chats').doc(info.route.params.id).collection('message').orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setMessage(
            snapshot.docs.map((doc) => {console.log("DOC ID: ",doc.id)
            return(
                ({
                id: doc.id,
                data: doc.data(),
            }))
        })));
        return unsubscribe;
    },[info.route]);
    
    return (
        
        <SafeAreaView style = {styles.view}>
            <StatusBar style="light" />        
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticleOffset={90}>
           
            <TouchableWithoutFeedback>
            <>
                
                <ScrollView>
                {console.log("firebase: ",firebase.firestore)}
                <Text>{console.log("infor for chat",info)}</Text>
                <Text>{console.log("ideconstruct message",message)}</Text>
                <Text>{message.map(({id, data}) =>
                data.email === auth.currentUser.email ? (
                <View key={id} style = {styles.reciever}>
                    <Avatar rounded size={30} source={{uri: data.photoURL}}/>
                    <Text style={styles.reciever}>{data.message}</Text>
                </View>

            ) : (

                <View key={id} style = {styles.sender}>
                    <Avatar rounded size={30} source={{uri: data.photoURL}}/>
                    <Text style={styles.sender}>{data.message}</Text>
                </View>
            ))}

            </Text>
            </ScrollView>
           

            <View style={styles.footer}>
            <TextInput value = {input} onChangeText = {(e)=>setInput(e)} 
            placeholder="Signal Message" 
            style={styles.textInput}
            onSubmitEditing={sendMessage}
            />
            
            <TouchableOpacity 
            onPress={sendMessage} 
            activate={0.5}>
            <Ionicons name="send" size = {24} color="#2B68E6"/>
            </TouchableOpacity >
            </View>
            </>
            </TouchableWithoutFeedback>
            
            </KeyboardAvoidingView>
        </SafeAreaView>
        
    );
};

export default ChatScreen

const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor:"white"
    },
    headerTitle:{
        flexDirection: "row",
        alignItems: "center",
    },
    right:{
        flexDirection:"row",
        justifyContent:"space-between",
        width: 80,
        marginRight: 20 
    },
    container:{
        flex: 1,
    },
    footer:{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput:{
        bottom:0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})
