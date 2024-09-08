// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';

// const MyItems = () => {
//   const [lostItems, setLostItems] = useState([]);
//   const [foundItems, setFoundItems] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchLostItems();
//     fetchFoundItems();
//   }, []);

//   const fetchLostItems = async () => {
//     try {
//       const lostItemsCollection = collection(db, 'LostItemReport');
//       const snapshot = await getDocs(lostItemsCollection);
//       const items = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//         imageUrl: doc.data().imageUrl
//       }));
//       setLostItems(items);
//     } catch (error) {
//       console.error('Error fetching lost items:', error);
//       setError('Failed to fetch lost items. Please try again later.');
//     }
//   };

//   const fetchFoundItems = async () => {
//     try {
//       const foundItemsCollection = collection(db, 'FoundItemReport');
//       const snapshot = await getDocs(foundItemsCollection);
//       const items = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//         imageUrl: doc.data().imageUrl
//       }));
//       setFoundItems(items);
//     } catch (error) {
//       console.error('Error fetching found items:', error);
//       setError('Failed to fetch found items. Please try again later.');
//     }
//   };

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       {/* Image component for displaying item image */}
//       <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
//       {/* Description and Button for viewing item details */}
//       <View style={styles.itemDescription}>
//         <Text style={styles.itemDescriptionText}>{item.description}</Text>
//         <TouchableOpacity onPress={() => viewItemDetails(item)} style={styles.viewButton}>
//           <Text style={styles.viewButtonText}>View</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const viewItemDetails = (item) => {
//     // Implement navigation to a new screen or modal to display item details
//     console.log('View item details:', item);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Render lost items */}
//       <Text style={styles.title}>Lost Items</Text>
//       <FlatList
//         data={lostItems}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         horizontal
//       />
//       {/* Render found items */}
//       <Text style={styles.title}>Found Items</Text>
//       <FlatList
//         data={foundItems}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         horizontal
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   itemContainer: {
//     marginRight: 10,
//   },
//   itemImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 10,
//     marginBottom: 5,
//   },
//   itemDescription: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemDescriptionText: {
//     flex: 1,
//     marginRight: 10,
//   },
//   viewButton: {
//     backgroundColor: 'black',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   viewButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//   },
// });

// export default MyItems;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext to get the logged-in user's info

const MyItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const { currentUser } = useAuth(); // Get the current user's email

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userDocRef = doc(db, 'Users', currentUser.email);

        // Fetch lost items
        const lostReportsCollectionRef = collection(userDocRef, 'LostReports');
        const lostItemsSnapshot = await getDocs(lostReportsCollectionRef);
        const lostItemsList = lostItemsSnapshot.docs.map(doc => doc.data());
        setLostItems(lostItemsList);

        // Fetch found items
        const foundReportsCollectionRef = collection(userDocRef, 'FoundReports');
        const foundItemsSnapshot = await getDocs(foundReportsCollectionRef);
        const foundItemsList = foundItemsSnapshot.docs.map(doc => doc.data());
        setFoundItems(foundItemsList);
      } catch (error) {
        console.error('Error fetching items: ', error);
      }
    };

    fetchItems();
  }, [currentUser.email]);

  const renderItem = (item, type) => (
    <View key={item.ItemLost || item.ItemFound} style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{type === 'lost' ? item.ItemLost : item.ItemFound}</Text>
      <Text style={styles.itemDescription}>{item.Description}</Text>
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
      <Text style={styles.itemDetails}>Category: {item.Category}</Text>
      <Text style={styles.itemDetails}>{type === 'lost' ? 'Lost Location: ' + item.LostLocation : 'Found Location: ' + item.FoundLocation}</Text>
      <Text style={styles.itemDetails}>{type === 'lost' ? 'Date of Lost: ' + item.DateofLost : 'Date of Found: ' + item.DateofFound}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Reported Items</Text>
      <Text style={styles.subHeader}>Lost Items</Text>
      {lostItems.map(item => renderItem(item, 'lost'))}
      <Text style={styles.subHeader}>Found Items</Text>
      {foundItems.map(item => renderItem(item, 'found'))}
    </ScrollView>
  );
};

export default MyItems;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    marginVertical: 5,
  },
  itemDetails: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
});
