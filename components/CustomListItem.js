import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        db.collection('chats').doc(id)
            .collection('messages').orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setChatMessages(snapshot.docs.map(doc => doc.data()))
            ))
    }, [])

    const lastMessage = chatMessages?.length - 1;
    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} >
            <Avatar
                rounded
                source={{ uri: chatMessages?.[lastMessage]?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/SpaceX_CEO_Elon_Musk_visits_N%26NC_and_AFSPC_%28190416-F-ZZ999-006%29_%28cropped%29.jpg/170px-SpaceX_CEO_Elon_Musk_visits_N%26NC_and_AFSPC_%28190416-F-ZZ999-006%29_%28cropped%29.jpg' }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
                    {chatMessages.length > 0 ?
                        `${chatMessages?.[lastMessage].displayName}: ${chatMessages?.[lastMessage]?.message}`
                        : 'Start Typing....'}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
