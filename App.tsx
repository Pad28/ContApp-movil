import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, SettingsProvider } from './src/context';
import { AlumnoBottomTabNavigator, LoginStackNavigator } from './src/navigators';
import { ProfesorBottomTabNavigator } from './src/navigators/bottomTab/ProfesorBottomTabNavigator';
import { ResultadoAvanceAlumnoProfesor } from './src/screens/detail/ResultadoAvanceAlumnoProfesorScreen';

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <AlumnoBottomTabNavigator/>
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
