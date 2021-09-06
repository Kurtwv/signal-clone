import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
// import { ListItem } from 'react-native-elements/dist/list/ListItem'
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        <ListItem onPress ={() =>enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar 
            rounded 
            source={{
                uri:
                "http://www.cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            }}>
            </Avatar>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                enterChatenterChatenterChatenterChatenterChatenterChatenterChat
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
