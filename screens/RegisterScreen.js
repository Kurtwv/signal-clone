import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import {auth} from "../firebase";


const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const register = () => {
        
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {

            //Gives back 4 objects, one of them is the user.
            authUser.user.updateProfile({
            displayName: name,
            photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            });
        }).catch(error => alert(error.message))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
    }, [navigation]);
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom: 50}}>Create a Signal account</Text>
            <View style={styles.inputContainer}>
            <Input placeholder="Full Name" 
            autoFocus 
            type="text" 
            value = {name} 
            onChangeText={(text) => setName(text)}/>

            <Input placeholder="Email" 
            type="email" 
            value = {email} 
            onChangeText={(email) => setEmail(email)}/>

            <Input placeholder="Password" 
            secureTextEntry 
            type="password" 
            value = {password} 
            onChangeText={(password) => setPassword(password)}/>

            <Input placeholder="Profile pic URL (optional)" 
            type="text" 
            value = {imageUrl} 
            onChangeText={(text) => setimageUrl(text)}
            onSubmitEditing={register}
            />

            {/* <Button placeholder="Submit">Submit</Button> */}
            <Text>{name}</Text>

 
            </View>

            <Button 
            containerStyle={styles.button}
            raised 
            onPress={register} 
            title="Register"></Button>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },

    button:{
        width:200

    },

    inputContainer:{
        width:300,
        marginTop:10
        
    }
})
