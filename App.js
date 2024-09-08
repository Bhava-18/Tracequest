// //import { StatusBar } from 'expo-status-bar'; 
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// //import DrawerNavigator from './screens/DrawerNavigator';
// //import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
// //import Profile from './screens/Profile';
// //import ReportLostItems from './screens/ReportLostItems'; // Import LostItemReport component
// const Drawer = createDrawerNavigator();
// //const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="HomeScreen">
//         <Drawer.Screen name="HomeScreen" component={HomeScreen} />
//        {/* Add ReportLostItems screen */}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }); //app.js
//import { StatusBar } from 'expo-status-bar'; 
// App.js
import {StatusBar}from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Text,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import LostItemReport from './screens/LostItemReport';
import FoundItemReport from './screens/FoundItemReport';
import MyItems from './screens/MyItems';
import FeedbackScreen from './screens/FeedbackScreen';
import ContactusScreen from './screens/ContactusScreen';
import FAQPage from './screens/FAQ';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LostItemReport" component={LostItemReport} />
        <Stack.Screen name="FoundItemReport" component={FoundItemReport} />
        <Stack.Screen name="MyItems" component={MyItems} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="ContactusScreen" component={ContactusScreen} />
        <Stack.Screen name="FAQ" component={FAQPage} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
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