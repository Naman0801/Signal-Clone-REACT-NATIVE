import React, { useLayoutEffect, useRef, useState } from 'react'
import {
    KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View, TouchableWithoutFeedback, Keyboard
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase';
import { auth, db } from '../firebase';
import CommonMessage from '../components/CommonMessage';

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar rounded source={{ uri: messages[messages.length - 1]?.data?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/220px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg' }} />
                    <Text style={{ color: '#fff', marginLeft: 10, fontWeight: '700' }}>
                        {route?.params?.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={24} color='#fff' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={22} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={22} color='#fff' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])

    useLayoutEffect(() => {
        db.collection('chats').doc(route.params.id)
            .collection('messages').orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            ))
    }, [route])

    const sendMessage = () => {
        if (!Boolean(input)) return;
        db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            })
            .catch(err => alert(err.message))

        setInput('');
    }
    return (
        <SafeAreaView>
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.cont}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }} ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                        >
                            {messages?.map(({ id, data }) => {
                                const message = data.email === auth.currentUser.email;
                                return (
                                    <CommonMessage
                                        key={id}
                                        id={id}
                                        img={data.photoURL}
                                        message={data.message}
                                        displayName={message ? null : data.displayName}
                                        viewContStyle={message ? 'receiver' : 'sender'}
                                        avatarContStyle={message ? { right: -5 } : { left: -5 }}
                                        textStyle={message ? 'receiverText' : 'senderText'}
                                        senderStyle={!message && 'senderName'}
                                    />
                                )
                            })}
                        </ScrollView>

                        <View style={styles.footer} >
                            <TextInput placeholder='Signal Message' style={styles.textInput} value={input}
                                onChangeText={(text) => setInput(text)} onSubmitEditing={sendMessage} />
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name='send' size={24} color='#2B68E6' />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 65,
        marginRight: 20
    },
    cont: {
        // flex: 1,
        height: '100%',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ececec',
        padding: 10,
        color: '#333',
        borderRadius: 30,
    },
})
