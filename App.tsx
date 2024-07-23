import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, SettingsProvider } from './src/context';
import { AlumnoBottomTabNavigator, LoginStackNavigator } from './src/navigators';
import { PublicarProfesoresScreen } from './src/screens/detail/PublicarProfesoresScreen';
import { ProfesorBottomTabNavigator } from './src/navigators/bottomTab/ProfesorBottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <ProfesorBottomTabNavigator/>
      </AppState>
    </NavigationContainer>
  );
}

const AppState = ({children}: { children: React.JSX.Element | React.JSX.Element[] }) => {
  return (
    <SettingsProvider>
      <AuthProvider>
        { children }
      </AuthProvider>
    </SettingsProvider>
  );
}
