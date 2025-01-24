import React from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from '../context/SettingsContext';
import { HEADER_FONT_SIZE } from '../constants/layout';

export const HeaderRight = () => {
  const navigation = useNavigation();
  const { settings } = React.useContext(SettingsContext);

  return (
    <Pressable
      onPress={() => navigation.navigate("Settings")}
      style={{ marginRight: 15 }}
    >
      <Text
        style={{
          color: settings.isDarkMode ? "#ffffff" : "#000000",
          fontSize: HEADER_FONT_SIZE,
        }}
      >
        Settings
      </Text>
    </Pressable>
  );
};