import { Text, View } from 'react-native';
import { SettingsProvider } from './src/context';
import 'react-native-gesture-handler';

import { Login } from './src/screens/login';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigators/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
        <StackNavigator/>        
      </NavigationContainer>
  );
}

const AppState = ({children}: { children: React.JSX.Element | React.JSX.Element[] }) => {
  return (
    <SettingsProvider>
      { children }
    </SettingsProvider>
  );
}
