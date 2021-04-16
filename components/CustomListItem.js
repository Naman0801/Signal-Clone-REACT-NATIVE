import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} >
            <Avatar
                rounded
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/SpaceX_CEO_Elon_Musk_visits_N%26NC_and_AFSPC_%28190416-F-ZZ999-006%29_%28cropped%29.jpg/170px-SpaceX_CEO_Elon_Musk_visits_N%26NC_and_AFSPC_%28190416-F-ZZ999-006%29_%28cropped%29.jpg' }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
                    This is a test Subtitle
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
