import React, {useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
//import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword function from firebase/auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from '../firebase'; 
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Get the navigation object

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        navigation.replace('LoginScreen');
        Alert.alert('Registered successfully'); // Use Alert from react-native
      })
      .catch(error => alert(error.message));
  };

const handleLogin = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
      AsyncStorage.setItem('userEmail', user.email)
        .then(() => {
          console.log('User email stored in AsyncStorage.');
          navigation.replace('HomeScreen');
        })
        .catch(error => console.log('Error storing user email:', error));
    })
    .catch(error => alert(error.message));
};
  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.contentContainer}>
        <Text style={styles.title}>AU TRACE QUEST</Text>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Set background color
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'black',
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonOutlineText: {
    color: 'white',
  },
});
//login.js

















