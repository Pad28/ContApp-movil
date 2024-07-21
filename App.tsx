import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, SettingsProvider } from './src/context';
import { LoginStackNavigator } from './src/navigators';

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <LoginStackNavigator />
      </AppState>
    </NavigationContainer>
  );
}

const AppState = ({ children }: { children: React.JSX.Element | React.JSX.Element[] }) => {
  return (
    <SettingsProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SettingsProvider>
  );
}
