import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon library
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State to hold the username

  // Fetch the user's email from AsyncStorage on component mount
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (userEmail) {
          setUserName(userEmail); // Set the username from AsyncStorage
        }
      } catch (error) {
        console.log('Error fetching user email:', error);
      }
    };
    fetchUserEmail();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFeedback = () => {
    navigation.navigate('FeedbackScreen');
  };

  const handleContactUs = () => {
    navigation.navigate('ContactusScreen');
  };

  const handleFAQ = () => {
    navigation.navigate('FAQ');
  };

  const handleReportLost = () => {
    navigation.navigate('LostItemReport');
  };

  const handleReportFound = () => {
    navigation.navigate('FoundItemReport');
  };

  const handleMyItems = () => {
    navigation.navigate('MyItems');
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userEmail'); // Clear user session
      navigation.navigate('LoginScreen'); // Navigate to LoginScreen
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>
      {menuOpen && (
        <View style={styles.menu}>
          <View style={styles.userInfo}>
            <Text style={[styles.userInfoText, { backgroundColor: 'black', color: 'white' }]}>
              {userName}
            </Text>
          </View>
          <TouchableOpacity style={styles.menuItem} onPress={handleFeedback}>
          <View style={styles.menuItemContent}>
          <AntDesign name="message1" size={15} color="black" style={styles.icon} />
            <Text style={styles.menuItemText}>Feedback</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleContactUs}>
          <View style={styles.menuItemContent}>
          <AntDesign name="contacts" size={15} color="black" style={styles.icon} />
            <Text style={styles.menuItemText}>Contact us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleFAQ}>
          <View style={styles.menuItemContent}>
          <AntDesign name="questioncircleo" size={15} color="black" style={styles.icon} />
            <Text style={styles.menuItemText}>FAQ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutContainer} onPress={handleSignOut}>
  <View style={styles.menuItemContent}>
    <AntDesign name="logout" size={15} color="white" style={styles.icon} />
    <Text style={styles.logoutText}>Logout</Text>
  </View>
</TouchableOpacity>

        </View>
      )}
      <Text style={styles.title}>AU TRACE QUEST</Text>
      <TouchableOpacity style={styles.button} onPress={handleReportLost}>
        <AntDesign name="exclamationcircleo" size={30} color="white" />
        <Text style={styles.buttonText}>Lost Items Report</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleReportFound}>
        <AntDesign name="eye" size={30} color="white" />
        <Text style={styles.buttonText}>Found Items Report</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleMyItems}>
        <AntDesign name="bars" size={30} color="white" />
        <Text style={styles.buttonText}>My Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
    alignItems: 'center',
    paddingLeft:30,
  },
  menuButton: {
    paddingHorizontal: 10,
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  menuButtonText: {
    fontSize: 24,
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  menuItem: {
    marginBottom: 10,
  },
  icon: {
    marginRight: 10, // Add space between the icon and text
  },
  menuItemText: {
    fontSize: 16,
  },
  menuItemContent: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Align items vertically
  },

  button: {
    backgroundColor: 'black',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    paddingTop: 30,
    paddingBottom:30,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'black',
    //paddingVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom: 5,
    color: 'white',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;