import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { db } from '../firebase'
import firebase from 'firebase'

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const createChat = async () => {
        if (!Boolean(input)) return alert('Please Add a Channel Name');
        setLoading(true);
        await db.collection('chats')
            .add({ chatName: input, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
            .then(() => {
                setLoading(false);
                navigation.goBack();
            })
            .catch((err) => {
                setLoading(false);
                alert(err.message);
            })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.cont}>
                <StatusBar style='light' />
                <Input
                    autoFocus
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholder='Enter a chat name'
                    onSubmitEditing={createChat}
                    leftIcon={<Icon name='wechat' type='antdesign' style={{ marginRight: 5 }} size={24} color='#000' />}
                />
                <Button title='Create New Chat' onPress={createChat} disabled={loading} loading={loading}
                    disabledStyle={styles.disable} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    cont: {
        padding: 20,
        backgroundColor: '#fff',
        height: '100%',
    },
    disable: {
        backgroundColor: '#999',
    }
})
