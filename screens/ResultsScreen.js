import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsContext } from '../context/SettingsContext';
import { styles } from '../constants/styles';

export const ResultsScreen = ({ route }) => {
  const { settings } = React.useContext(SettingsContext);
  const { score, total } = route.params;
  const percentage = Math.round((score / total) * 100);

  const getScoreMessage = () => {
    if (percentage === 100) return "Perfect score!";
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good job!";
    return "Try again!";
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: settings.isDarkMode ? "#1a1a1a" : "#ffffff" },
      ]}
    >
      <View style={styles.resultContainer}>
        <Text
          style={[
            styles.scoreMessage,
            {
              color: settings.isDarkMode ? "#ffffff" : "#000000",
              fontSize: settings.fontSize * 1.4,
            },
          ]}
        >
          {getScoreMessage()}
        </Text>

        <Text
          style={[
            styles.scoreText,
            {
              color: settings.isDarkMode ? "#ffffff" : "#000000",
              fontSize: settings.fontSize * 1.2,
            },
          ]}
        >
          Score: {score}/{total}
        </Text>

        <Text
          style={[
            styles.percentageText,
            {
              color: settings.isDarkMode ? "#ffffff" : "#000000",
              fontSize: settings.fontSize * 1.2,
            },
          ]}
        >
          Percentage: {percentage}%
        </Text>
      </View>
    </SafeAreaView>
  );
};