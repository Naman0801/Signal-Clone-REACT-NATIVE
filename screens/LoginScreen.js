import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [state, setState] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home')
            }
        })
    }, [])

    const handleValueChange = (name, text) => setState({ ...state, [name]: text })

    const signIn = () => {
        setLoading(true);
        auth.signInWithEmailAndPassword(state.email, state.password)
            .catch(err => alert(err.message))
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.cont}>
            <StatusBar style='light' />
            <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/150px-Signal-Logo.svg.png' }}
                style={{ height: 175, width: 175, borderRadius: 5, marginBottom: 10 }}
            />
            <View style={styles.inputCont}>
                <Input placeholder='Email' type='email' autoFocus containerStyle={styles.input}
                    onChangeText={(text) => handleValueChange('email', text)} value={state.email}
                />
                <Input placeholder='Password' type='password' secureTextEntry containerStyle={styles.input}
                    onChangeText={(text) => handleValueChange('password', text)} value={state.password}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.btn} onPress={signIn} disabled={loading} loading={loading}
                disabledStyle={styles.disable} title='Login' />

            <Button containerStyle={styles.btn} title='Register' type='outline'
                onPress={() => navigation.navigate('Register')} disabled={loading}
            />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    inputCont: {
        width: '100%',
        maxWidth: 300,
    },
    input: {
        marginBottom: -10
    },
    btn: {
        width: 200,
        marginTop: 10
    },
    disable: {
        backgroundColor: '#999',
    }
})
