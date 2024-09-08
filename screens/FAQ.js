import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FAQPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Frequently Asked Questions</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>1. How does the app work?</Text>
        <Text style={styles.answer}>
          The app allows users to report lost items, providing details such as the item's description, category, and location of loss. Users can also view found items reported by others and contact the owners to claim their lost belongings.
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>2. How do I report a lost item?</Text>
        <Text style={styles.answer}>
          To report a lost item, navigate to the "Report Lost Item" section of the app, fill out the required information including the item's details and a contact method, and submit the report. You can also upload a photo of the lost item for better identification.
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>3. Can I view found items?</Text>
        <Text style={styles.answer}>
          Yes, you can view found items reported by other users in the "Found Items" section of the app. You can search for specific items or browse through the list to see if your lost item has been found.
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>4. How do I contact the owner of a found item?</Text>
        <Text style={styles.answer}>
          If you find an item that matches one of your lost belongings, you can contact the owner directly through the app. Simply click on the found item listing to view the contact details provided by the owner and reach out to them to arrange for the return of your lost item.
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>5. Is my personal information secure?</Text>
        <Text style={styles.answer}>
          Yes, we take the security and privacy of your personal information seriously. Your contact details will only be shared with other users when you report a lost item or when you choose to contact the owner of a found item. We do not share your information with any third parties.
        </Text>
      </View>

      {/* Add more FAQ items as needed */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQPage;
