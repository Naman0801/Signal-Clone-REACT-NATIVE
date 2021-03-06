import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();
export default function App() {
  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2c6bed' },
    headerTitleStyle: { color: '#fff' },
    headerTintColor: '#fff'
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={globalScreenOptions} >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} options={{ headerTitle: 'Add a new Chat', headerBackTitle: 'Chats' }} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
