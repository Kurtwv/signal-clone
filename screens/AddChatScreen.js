import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {

    //Adding the input to collection named chats and field named chatName in firebase

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input,
        }).then(() =>  {
            navigation.goBack()
        }).catch((error) => alert(error));
        
    }

    const [input, setInput] = useState('');
    const [text, setText] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
        title: 'Add a new Chat',
        headerBackTitle: "Chats",
        // headerStyle : {backgroundColor: '#fff'},
        headerTitleStyle: {color: 'black'}}
        )
    },[navigation])
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            

            <Input placeholder = "Enter a chat name" 
            value={input} 
            onChangeText={(e) =>setInput(e)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black"></Icon>
            }
            ></Input>
            <Button onPress={createChat} title="Create new Chat"></Button>
            



          
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})
