import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
// ICONs
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: '#000' },
            headerTintColor: '#000',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOut} >
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={22} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')} >
                        <SimpleLineIcons name='pencil' size={22} color='black' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const signOut = () => auth.signOut().then(() => navigation.replace('Login')).catch(err => alert(err.message));

    const enterChat = (id, chatName) => navigation.navigate('Chat', { id, chatName })

    return (
        <SafeAreaView>
            <ScrollView style={styles.cont}>
                {chats?.map(({ id, data: { chatName } }) => (
                    <CustomListItem id={id} chatName={chatName} key={id} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 65,
        marginRight: 20,
    },
    cont: {
        height: '100%'
    }
})
