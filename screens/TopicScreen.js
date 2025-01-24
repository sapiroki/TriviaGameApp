import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DifficultyPicker } from '../components/DifficultyPicker';
import { TOPICS } from '../constants/topics';
import { SettingsContext } from '../context/SettingsContext';
import { styles } from '../constants/styles';

export const TopicScreen = () => {
  const { settings } = React.useContext(SettingsContext);
  const navigation = useNavigation();
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: settings.isDarkMode ? "#1a1a1a" : "#ffffff" },
      ]}
    >
      <Text
        style={[
          styles.questionText,
          {
            color: settings.isDarkMode ? "#ffffff" : "#000000",
            fontSize: settings.fontSize + 4,
            marginBottom: 20,
          },
        ]}
      >
        Select a topic
      </Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {TOPICS.map((topic) => (
          <Pressable 
            key={topic.id}
            style={({ pressed }) => [
              styles.topicButton,
              { 
                backgroundColor: settings.isDarkMode ? "#333333" : "#e0e0e0",
                opacity: pressed ? 0.7 : 1
              },
            ]}
            onPress={() =>
              navigation.navigate("Quiz", { topicId: topic.id, difficulty: selectedDifficulty })
            }
          >
            <Text
              style={[
                styles.topicText,
                {
                  color: settings.isDarkMode ? "#ffffff" : "#000000",
                  fontSize: settings.fontSize,
                },
              ]}
            >
              {topic.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text
        style={[
          styles.questionText,
          {
            color: settings.isDarkMode ? "#ffffff" : "#000000",
            fontSize: settings.fontSize + 4,
            marginTop: 20,
          },
        ]}
      >
        Select difficulty
      </Text>
      <DifficultyPicker
        selectedDifficulty={selectedDifficulty}
        onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
        isDarkMode={settings.isDarkMode}
      />
    </SafeAreaView>
  );
};