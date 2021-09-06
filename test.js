import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
// import { getAuth } from 'firebase/auth';
import firebase from "firebase/app"
import "firebase/auth"


const test = () => {
    const auth = firebase.auth();
    const user = auth.currentUser;
    if(user !== null) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;
        console.log(email)
    }
    return (
        console.log(email)
    )
}

export default test

const styles = StyleSheet.create({})
