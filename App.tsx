import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SettingsProvider } from './src/context';

export default function App() {
  return (
    <AppState>
      <View style={{ marginTop: 50 }}>
        <Text>Hola mundo</Text>
      </View>
    </AppState>
  );
}

const AppState = ({children}: { children: React.JSX.Element | React.JSX.Element[] }) => {
  return (
    <SettingsProvider>
      { children }
    </SettingsProvider>
  );
}
