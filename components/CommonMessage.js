import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'

const CommonMessage = ({
    id, img, message, displayName, viewContStyle, avatarContStyle, textStyle, senderStyle
}) => {
    return (
        <View key={id} style={[styles.commonText, styles[viewContStyle]]}>
            <Avatar
                rounded
                size={30}
                containerStyle={{
                    position: 'absolute',
                    bottom: -15,
                    ...avatarContStyle
                }}
                source={{ uri: img }}
            />
            <Text style={styles[textStyle]}>{message}</Text>
            {Boolean(displayName) && <Text style={styles[senderStyle]}>{displayName}</Text>}
        </View>
    )
}

export default CommonMessage

const styles = StyleSheet.create({
    commonText: {
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    receiver: {
        backgroundColor: '#ececec',
        alignSelf: 'flex-end',
        marginRight: 15,
    },
    sender: {
        backgroundColor: '#2b68e6',
        alignSelf: 'flex-start',
        marginLeft: 15,
    },
    receiverText: {
        color: '#000',
        fontWeight: '500',
        marginRight: 10,
    },
    senderText: {
        color: '#fff',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 5,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: '#fff'
    }
})
