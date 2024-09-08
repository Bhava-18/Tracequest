import { initializeApp } from "firebase/app";
import { getAuth,getReactNativePersistence} from "firebase/auth";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
//import firebase from 'firebase/app'; 
//import 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCzb2GA1KulhirNlyzdM0rrEJgws7leke4",
    authDomain: "tracequest-1d4ef.firebaseapp.com",
    projectId: "tracequest-1d4ef",
    storageBucket: "tracequest-1d4ef.appspot.com",
    messagingSenderId: "1005376054485",
    appId: "1:1005376054485:web:024d4e5b2dbda034712e5c"
  
};

const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Get authentication object
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };



