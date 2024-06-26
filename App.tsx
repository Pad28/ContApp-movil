import { Text, View } from 'react-native';
import { SettingsProvider } from './src/context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <AppState>
      {/* <NavigationContainer>
        
      </NavigationContainer> */}
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
