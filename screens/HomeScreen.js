//rnfes
import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-elements';
// import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase';

const HomeScreen = ({navigation}) => {

    const signOutUser = () =>{
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle : {backgroundColor: '#fff'},
            headerTitleStyle: {color: 'black'},
            headerLeft: () => 
            <View style={{marginLeft: 20}}>
                <TouchableOpacity activeOpacity= {0.5}>
                <Avatar onPress={signOutUser} rounded source={{uri: auth?.currentUser?.photoURL}}/>
                </TouchableOpacity>
                

            </View>

        });
        
        
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem></CustomListItem>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
