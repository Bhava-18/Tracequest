import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';

const RadioButton = ({ selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioButton}>
    {selected && <View style={styles.radioInnerCircle} />}
  </TouchableOpacity>
);

const FeedbackScreen = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    overallExperience: null,
    likedFeature: null,
    satisfaction: null,
    recommondation: null,
  });
  const [difficultyMessage, setDifficultyMessage] = useState('');

  const handleOptionSelect = (question, option) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [question]: option,
    }));
  };

  const handleDifficultyMessageChange = (text) => {
    setDifficultyMessage(text);
  };

  const handleSubmit = () => {
    Alert.alert(
      'Feedback Submitted',
      'Thank you for your feedback!',
      [
        { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FEEDBACK</Text>
      {/* Question 1 */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How satisfied are you with the overall user experience of the TraceQuest app?</Text>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.overallExperience === 'verySatisfied'}
            onPress={() => handleOptionSelect('overallExperience', 'verySatisfied')}
          />
          <Text style={styles.optionText}>Very satisfied</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.overallExperience === 'satisfied'}
            onPress={() => handleOptionSelect('overallExperience', 'satisfied')}
          />
          <Text style={styles.optionText}>Satisfied</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.overallExperience === 'notSatisfied'}
            onPress={() => handleOptionSelect('overallExperience', 'notSatisfied')}
          />
          <Text style={styles.optionText}>Not satisfied</Text>
        </View>
      </View>
      {/* Question 2 */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>What do you like most about the TraceQuest app?</Text>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.likedFeature === 'design'}
            onPress={() => handleOptionSelect('likedFeature', 'design')}
          />
          <Text style={styles.optionText}>User interface design</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.likedFeature === 'features'}
            onPress={() => handleOptionSelect('likedFeature', 'features')}
          />
          <Text style={styles.optionText}>Feature set</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.likedFeature === 'performance'}
            onPress={() => handleOptionSelect('likedFeature', 'performance')}
          />
          <Text style={styles.optionText}>Performance</Text>
        </View>
      </View>
      {/* Question 3 */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How satisfied are you with the performance and responsiveness of the TraceQuest app?</Text>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.satisfaction === 'vsatisfied'}
            onPress={() => handleOptionSelect('satisfaction', 'vsatisfied')}
          />
          <Text style={styles.optionText}>Very satisfied</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.satisfaction === 'satisfy'}
            onPress={() => handleOptionSelect('satisfaction', 'satisfy')}
          />
          <Text style={styles.optionText}>Satisfied</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.satisfaction === 'not'}
            onPress={() => handleOptionSelect('satisfaction', 'not')}
          />
          <Text style={styles.optionText}>Not satisfied</Text>
        </View>
      </View>
      {/* Question 4 */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How likely are you to recommend the TraceQuest app to others?</Text>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.recommondation === 'verylikely'}
            onPress={() => handleOptionSelect('recommondation', 'verylikely')}
          />
          <Text style={styles.optionText}>Very likely</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.recommondation === 'likely'}
            onPress={() => handleOptionSelect('recommondation', 'likely')}
          />
          <Text style={styles.optionText}>Likely</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            selected={selectedOptions.recommondation === 'unlikely'}
            onPress={() => handleOptionSelect('recommondation', 'unlikely')}
          />
          <Text style={styles.optionText}>Unlikely</Text>
        </View>
      </View>
      {/* Question 5 */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Did you encounter any difficulties while using the TraceQuest app? If yes, please specify.</Text>
        <TextInput
          style={styles.messageBox}
          multiline
          value={difficultyMessage}
          onChangeText={handleDifficultyMessageChange}
          placeholder="Enter your message here"
        />
      </View>
      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    width: '88%',
  },
  questionText: {
    marginBottom: 10,
    fontSize: 18,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 30,

  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
    paddingLeft: 5,

  },
  messageBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
    width: '100%',
    fontSize:16,
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
    color: '#fff',
    fontSize: 18,
  },
});

export default FeedbackScreen;