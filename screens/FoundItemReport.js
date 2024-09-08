//FoundItemReport.js
import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { collection, addDoc, doc, setDoc, getFirestore } from 'firebase/firestore'; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Updated import
import { storage } from '../firebase'; // Import Firebase Storage instance
import { db } from '../firebase'; // Import Firebase Firestore instance
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import nlp from 'compromise'; // Import compromise
import { useAuth } from '../context/AuthContext';

//import * as ImAageManipulator from 'expo-image-manipulator';
//import { db } from '../firebase'; // Import Firebase Firestore instance

const FoundItemReport = ({navigation}) => {
  const { currentUser } = useAuth();
  const [Username, setUsername] = useState('');
  const [Branch, setBranch] = useState('');
  const [Year, setYear] = useState('');
  const [Contact, setContact] = useState('');
  const [Email, setEmail] = useState(currentUser?.email || '');
  const [ItemFound, setItemFound] = useState('');
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');
  const [FoundLocation, setFoundLocation] = useState('');

  const [DateofFound, setDateofFound] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Updated state variable name


  useEffect(() => {
    if (Email) {
      fetchUserData(Email);
    }
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [Email]);
  const fetchUserData = async (email) => {
    try {
      const userDocRef = doc(db, 'Users', email);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUsername(userData.Username || '');
        setBranch(userData.Branch || '');
        setYear(userData.Year || '');
        setContact(userData.Contact || '');
        setEmail(userData.Email || '');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Camera roll permissions not granted');
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('Image picker result:', result);
  
      if (result.cancelled) {
        throw new Error('Image selection cancelled');
      }
  
      if (!result.assets || !result.assets.length || !result.assets[0].uri) {
        throw new Error('Selected image URI is undefined');
      }
  
      const selectedImageUri = result.assets[0].uri;
      console.log('Selected image URI:', selectedImageUri);
      setSelectedImage(selectedImageUri); // Updated state variable name
    } catch (error) {
      console.error('Error selecting image: ', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };
  const extractKeywords = (description) => {
    const doc = nlp(description);
    const nouns = doc.nouns().out('array');
    const adjectives = doc.adjectives().out('array');
    const keywords = [...new Set([...nouns, ...adjectives])];
    return keywords;
  };
  const handleReport = async () => {
    try {
      // Add user data to 'Users' collection
      const userDocRef = doc(db, 'Users', Email);
      await setDoc(userDocRef, {
        Username,
        Branch,
        Year,
        Contact,
        Email
      });

      // Add lost item data to 'LostReports' subcollection
      const foundReportsCollectionRef = collection(userDocRef, 'FoundReports');
      let imageUrl = ''; // Initialize imageUrl variable
  
      if (selectedImage) {
        console.log('Uploading image:', selectedImage);
        let imageFileName = '';
        if (typeof selectedImage === 'string') {
          const parts = selectedImage.split('/');
          if (parts.length > 0) {
            imageFileName = '${Date.now()}_${parts.pop()}';
          }
        }
        const imageRef = ref(storage,'${Email}/${imageFileName}' );
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);}
      const keywords = extractKeywords(Description);
      await addDoc(foundReportsCollectionRef, {
        ItemFound,
        Category,
        Description,
        FoundLocation,
        DateofFound,
        imageUrl,
        keywords
      });

      // Redirect to successful report page or any other page
      console.log("Successfully submitted your report");
      Alert.alert(
        'Success',
        'Found item reported successfully',
        [
          { text: 'OK', onPress: () => navigation.navigate('HomeScreen') } // Navigate back to home screen
        ]
      );
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to report lost item. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="Username"
            value={Username}
            onChangeText={setUsername}
            style={[styles.input, { width: '47%' }]} // Adjust width for Username
          />
          <TextInput
            placeholder="Branch"
            value={Branch}
            onChangeText={setBranch}
            style={[styles.input, { width: '47%' }]} // Adjust width for Branch
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Year"
            value={Year}
            onChangeText={setYear}
            style={[styles.input, { width: '47%' }]} // Adjust width for Year
          />
          <TextInput
            placeholder="Contact"
            value={Contact}
            onChangeText={setContact}
            style={[styles.input, { width: '47%' }]} // Adjust width for Contact
          />
        </View>
        <TextInput
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          style={styles.input}
          //editable={false}
        />
        <View style={styles.horizontalLine}></View>
        <TextInput
          placeholder="Found Item"
          value={ItemFound}
          onChangeText={setItemFound}
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={Category}
          onChangeText={setCategory}
          style={styles.input}
        />
        <TextInput
          placeholder="Found Location"
          value={FoundLocation}
          onChangeText={setFoundLocation}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text>{DateofFound.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={DateofFound || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateofFound(selectedDate);
              }
            }}
          />
        )}

        <TextInput
          placeholder="Description"
          value={Description}
          onChangeText={setDescription}
          style={[styles.input, styles.descriptionInput]} // Increase height for multiline input
          multiline
        />
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
        <TouchableOpacity onPress={handleReport} style={styles.button}>
          <Text style={styles.buttonText}>Report Found Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FoundItemReport;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
    width: '90%', // Default width
  },
  horizontalLine: {
    width: '90%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 20,
  },
  descriptionInput: {
    height: 100,
  },
  button: {
    backgroundColor: 'black',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
});