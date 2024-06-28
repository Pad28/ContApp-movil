import { Text, View } from 'react-native';
import { SettingsProvider } from './src/context';
import 'react-native-gesture-handler';


import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigators/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
        <AppState>
          <StackNavigator/>
        </AppState>       
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
