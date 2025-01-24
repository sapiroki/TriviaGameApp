import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from "@react-native-community/slider";
import { SettingsContext } from '../context/SettingsContext';
import { styles } from '../constants/styles';

export const SettingsScreen = () => {
  const { settings, updateSettings } = React.useContext(SettingsContext);
  const [tempFontSize, setTempFontSize] = useState(settings.fontSize);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: settings.isDarkMode ? "#1a1a1a" : "#ffffff" }
      ]}
    >
      <View style={styles.settingsContainer}>
        <View style={styles.settingRow}>
          <Text style={[
            styles.settingTitle,
            { color: settings.isDarkMode ? "#ffffff" : "#000000" }
          ]}>
            Dark Mode
          </Text>
          <Switch
            value={settings.isDarkMode}
            onValueChange={(value) => 
              updateSettings({ ...settings, isDarkMode: value })}
          />
        </View>

        <View style={styles.fontSizeSection}>
          <Text style={[
            styles.settingTitle,
            { 
              color: settings.isDarkMode ? "#ffffff" : "#000000",
              marginTop: 20 
            }
          ]}>
            Font Size
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={[
              styles.fontSizeLabel,
              { color: settings.isDarkMode ? "#ffffff" : "#000000" }
            ]}>
              12
            </Text>
            <Slider
              style={{ flex: 1, height: 40 }}
              minimumValue={12}
              maximumValue={24}
              step={1}
              value={settings.fontSize}
              onValueChange={(value) => setTempFontSize(Math.round(value))}
              onSlidingComplete={(value) =>
                updateSettings({ ...settings, fontSize: Math.round(value) })}
            />
            <Text style={[
              styles.fontSizeLabel,
              { color: settings.isDarkMode ? "#ffffff" : "#000000" }
            ]}>
              24
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};