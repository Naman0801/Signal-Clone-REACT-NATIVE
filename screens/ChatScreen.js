import React, { useLayoutEffect, useState } from 'react'
import {
    KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar rounded source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/220px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg' }} />
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
    }, [])

    console.log(route);
    return (
        <SafeAreaView>
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.cont}
                keyboardVerticalOffset={90}
            >
                <>
                    <ScrollView>
                        {/* Chat goes here */}
                    </ScrollView>
                    <View style={styles.footer} >
                        <TextInput placeholder='Signal Message' style={styles.textInput} value={input}
                            onChangeText={(text) => setInput(text)} />
                    </View>
                </>
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

    },
    footer: {},
    textInput: {},
})
