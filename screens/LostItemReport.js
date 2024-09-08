import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Updated import
import { storage } from '../firebase'; // Import Firebase Storage instance
import { db } from '../firebase'; // Import Firebase Firestore instance
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import DateTimePicker from '@react-native-community/datetimepicker';
import nlp from 'compromise';
import { useAuth } from '../context/AuthContext';

const LostItemReport = ({navigation}) => {
  const { currentUser } = useAuth();
  const [Username, setUsername] = useState('');
  const [Branch, setBranch] = useState('');
  const [Year, setYear] = useState('');
  const [Contact, setContact] = useState('');
  const [Email, setEmail] = useState(currentUser?.email || '');
  const [ItemLost, setItemLost] = useState('');
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');
  const [LostLocation, setLostLocation] = useState('');
  const [DateofLost, setDateofLost] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Updated state variable name
  // State variables for field validation
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [itemLostError, setItemLostError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [lostLocationError, setLostLocationError] = useState('');
  const [dateOfLostError, setDateOfLostError] = useState('');

  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [Email]);
  
  // Validation function
  const validateFields = () => {
    let isValid = true;

    // Validate Username
    if (!Username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(Email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate ItemLost
    if (!ItemLost.trim()) {
      setItemLostError('ItemLost is required');
      isValid = false;
    } else {
      setItemLostError('');
    }

    // Validate Category
    if (!Category.trim()) {
      setCategoryError('Category is required');
      isValid = false;
    } else {
      setCategoryError('');
    }

    // Validate Description
    if (!Description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    // Validate LostLocation
    if (!LostLocation.trim()) {
      setLostLocationError('LostLocation is required');
      isValid = false;
    } else {
      setLostLocationError('');
    }

    // Validate DateofLost
    if (!DateofLost.trim()) {
      setDateOfLostError('DateofLost is required');
      isValid = false;
    } else {
      setDateOfLostError('');
    }

    return isValid;
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
  
      if (result.cancelled) {
        throw new Error('Image selection cancelled');
      }
  
      if (!result.assets || !result.assets.length || !result.assets[0].uri) {
        throw new Error('Selected image URI is undefined');
      }
  
      const selectedImageUri = result.assets[0].uri;
      //console.log('Selected image URI:', selectedImageUri);
      setSelectedImage(selectedImageUri); // Updated state variable name
    } catch (error) {
      console.error('Error selecting image: ', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };
  const resizeImage = async (uri) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error('Error resizing image: ', error);
      Alert.alert('Error', 'Failed to resize image. Please try again.');
      return null;
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
      const userDocRef = doc(db, 'Users', Email);
      await setDoc(userDocRef, {
        Username,
        Branch,
        Year,
        Contact,
        Email
      });
  
      const lostReportsCollectionRef = collection(userDocRef, 'LostReports');
      
      if (selectedImage) {
        const resizedImageUri = await resizeImage(selectedImage);
        if (!resizedImageUri) return;

        let imageFileName = '';
        if (typeof resizedImageUri === 'string') {
          const parts = resizedImageUri.split('/');
          if (parts.length > 0) {
            imageFileName = '${Date.now()}_${parts.pop()}';
          }
        }
        const imageRef = ref(storage, '${Email}/${imageFileName}');
        const response = await fetch(resizedImageUri);
        const blob = await response.blob();

        if (blob.size > 50000) {
          Alert.alert('Error', 'The image size exceeds 50KB. Please choose a smaller image.');
          return;
        }

        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }
      const keywords = extractKeywords(Description);
      await addDoc(lostReportsCollectionRef, {
        ItemLost,
        Category,
        Description,
        LostLocation,
        DateofLost,
        imageUrl
      });

      Alert.alert(
        'Success',
        'Lost item reported successfully',
        [
          { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
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
            style={[styles.input, { width: '47%' }]}
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
          <TextInput
            placeholder="Branch"
            value={Branch}
            onChangeText={setBranch}
            style={[styles.input, { width: '47%' }]}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Year"
            value={Year}
            onChangeText={setYear}
            style={[styles.input, { width: '47%' }]}
          />
          <TextInput
            placeholder="Contact"
            value={Contact}
            onChangeText={setContact}
            style={[styles.input, { width: '47%' }]}
          />
        </View>
        <TextInput
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          style={styles.input}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={styles.horizontalLine}></View>
        <TextInput
          placeholder="Lost Item"
          value={ItemLost}
          onChangeText={setItemLost}
          style={styles.input}
        />
        {itemLostError ? <Text style={styles.errorText}>{itemLostError}</Text> : null}
        <TextInput
          placeholder="Category"
          value={Category}
          onChangeText={setCategory}
          style={styles.input}
        />
        {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}
        <TextInput
          placeholder="Lost Location"
          value={LostLocation}
          onChangeText={setLostLocation}
          style={styles.input}
        />
        {lostLocationError ? <Text style={styles.errorText}>{lostLocationError}</Text> : null}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text>{DateofLost.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={DateofLost || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateofLost(selectedDate);
              }
            }}
          />
        )}

        {dateOfLostError ? <Text style={styles.errorText}>{dateOfLostError}</Text> : null}
        <TextInput
          placeholder="Description"
          value={Description}
          onChangeText={setDescription}
          style={[styles.input, styles.descriptionInput]}
          multiline
        />
        {descriptionError? <Text style={styles.errorText}>{descriptionError}</Text> : null}
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
        <TouchableOpacity onPress={handleReport} style={styles.button}>
          <Text style={styles.buttonText}>Report Lost Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default LostItemReport;
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
    width: '90%',
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
    marginTop: 10,
  },
});