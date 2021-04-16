import React, { useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
    const [state, setState] = useState({ name: '', email: '', password: '', imageUrl: '' });
    const [loading, setLoading] = useState(false);

    const handleValueChange = (name, text) => setState({ ...state, [name]: text })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login' // Just for Reference
        })
    }, [navigation])

    const register = () => {
        setLoading(true);
        auth.createUserWithEmailAndPassword(state.email, state.password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: state.name,
                    photoURL: state.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzrhEGJMxxJStyJZKnSMJIK97Vr98ofdmbLg&usqp=CAU'
                });
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                alert(err.message)
            })
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.cont}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 30 }} >Create a Signal Account</Text>

            <View style={styles.inputCont}>
                <Input placeholder='Full Name' type='text' autoFocus containerStyle={styles.input}
                    onChangeText={(text) => handleValueChange('name', text)} value={state.name}
                />

                <Input placeholder='Email' type='email' containerStyle={styles.input}
                    onChangeText={(text) => handleValueChange('email', text)} value={state.email}
                />

                <Input placeholder='Password' type='password' secureTextEntry containerStyle={styles.input}
                    onChangeText={(text) => handleValueChange('password', text)} value={state.password}
                />

                <Input placeholder='Profile Picture URL (optional)' type='text' containerStyle={styles.input}
                    onChangeText={(text) => handleValueChange('imageUrl', text)} value={state.imageUrl}
                    onSubmitEditing={register}
                />
            </View>

            <Button containerStyle={styles.btn} raised onPress={register} loading={loading}
                disabled={loading} disabledStyle={styles.disable} title='Register'
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
        marginTop: 10,
        width: 200
    },
    disable: {
        backgroundColor: '#999',
    }
})
