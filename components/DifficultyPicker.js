import React from 'react';
import { View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { styles } from '../constants/styles';

export const DifficultyPicker = ({ selectedDifficulty, onValueChange, isDarkMode }) => (
  <View
    style={[
      styles.pickerContainer,
      {
        backgroundColor: isDarkMode ? "#333333" : "#f0f0f0",
        borderColor: isDarkMode ? "#ffffff" : "#000000",
      },
    ]}
  >
    <Picker
      selectedValue={selectedDifficulty}
      onValueChange={onValueChange}
      style={[
        styles.picker,
        {
          color: isDarkMode ? "#ffffff" : "#000000",
        },
      ]}
      dropdownIconColor={isDarkMode ? "#ffffff" : "#000000"}
    >
      <Picker.Item label="Easy" value="easy" />
      <Picker.Item label="Medium" value="medium" />
      <Picker.Item label="Hard" value="hard" />
    </Picker>
  </View>
);