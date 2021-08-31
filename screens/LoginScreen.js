import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Image, Input } from 'react-native-elements'
import { auth } from '../firebase'
// import { KeyboardAvoidingView} from 'react-native'
const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //unsubscripe for performance

    useEffect(() => {
        const unsubscripe = auth.onAuthStateChanged((authUser) =>{
            console.log(authUser);
            if(authUser) {
                navigation.replace("Home");
            }
        })
        return () => {
            unsubscripe()
        }
    }, []);

   

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error));

        }
            
    
    // const functionfd = {
    //     text.setPassword()
    // }
    return (
        // <div>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Image 
                source={{
                uri:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/300px-Signal-Logo.svg.png",
            }}
            style = {{width: 150, height: 150, borderRadius: 10}}/>
            <View style={styles.inputContainer}>
                <Input placeholder="Email"
                autoFocus 
                type="email"
                value={email} 
                onChangeText={(text)=>setEmail(text)}
                />
                <Input className="test" 
                placeholder="Password" 
                secureTextEntry 
                autoFocus 
                type="Password" 
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
                />
                {/* <Text>{email} {password}</Text> */}
            </View>
                <Button containerStyle={styles.button} onPress={signIn}title="Login"/>
                <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register"/>
                
                <View style={{height: 100}}/>
               
        </KeyboardAvoidingView>
    //    </div>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"lightblue",
        alignItems: "center",
        justifyContent:"center",
        padding:10
    },
    inputContainer:{
        width: 300,
    },
        button:{
            width: 200,
            marginTop: 10
        
    },
});
