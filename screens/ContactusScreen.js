import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const ContactusScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmission = () => {
    // Check if any of the fields are empty
    if (!name || !email || !message) {
      Alert.alert(
        'Error',
        'Please fill all the details',
        [{ text: 'OK' }]
      );
      return; // Prevent further execution
    }
    // Handle submission logic here, e.g., sending data to server
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    // Reset fields after submission if needed
    setName('');
    setEmail('');
    setMessage('');
    Alert.alert(
      'Message sent',
      'Thank you!',
      [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmission}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.contactInfo}>
  <Text style={styles.contact}>
    <Icon name="phone" size={24} color="red" /> Contact
  </Text>
  <Text style={styles.contactText}> +1 123 456 7890</Text>
  <Text style={styles.contactText}> +1 123 456 7891</Text>
  <Text style={styles.contact}>
    <Icon name="envelope" size={24} color="red" /> Email
  </Text>
  <Text style={styles.contactText}>example@example.com</Text>
  <Text style={styles.contact}>
    <Icon name="map-marker" size={24} color="red" /> Location
  </Text>
  <Text style={styles.contactText}> CEG campus, Anna university</Text>
</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize:16,
  },
  messageInput: {
    height: 100,
  },
  button: {
    backgroundColor: '#006400',
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contact: {
    color: 'Red',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop:10,
  },
  contactInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    marginBottom: 15,
  },
});
export default ContactusScreen;