import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TopicScreen } from './screens/TopicScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

import { SettingsContext } from './context/SettingsContext';
import { HEADER_CONFIG } from './navigation/config';

const Stack = createStackNavigator();

const App = () => {
  const [settings, setSettings] = useState({
    isDarkMode: false,
    fontSize: 16,
  });

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <SafeAreaProvider>
      <SettingsContext.Provider value={{ settings, updateSettings }}>
        <StatusBar 
          barStyle={settings.isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={settings.isDarkMode ? "#2d2d2d" : "#f0f0f0"}
        />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Trivia game"
              component={TopicScreen}
              options={() => HEADER_CONFIG({ settings })}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={() => HEADER_CONFIG({ settings })}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={() => HEADER_CONFIG({ settings })}
            />
            <Stack.Screen
              name="Results"
              component={ResultsScreen}
              options={() => HEADER_CONFIG({ settings })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SettingsContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;