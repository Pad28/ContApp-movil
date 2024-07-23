import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { 
  ActividadesAlumnoScreen, 
  AvanceAlumnoScreen, 
  HomeAlumnoScreen, 
  RecursosAlumnoScreen,
  SettingsScreen
} from "../../screens";
import { useEffect, useRef } from "react";
import { Animated, Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, widthWindow } from "../../theme/globalStyles";
import { Ionicons } from '@expo/vector-icons';
import { PublicarProfesoresScreen } from "../../screens/detail/PublicarProfesoresScreen";
import { AvancesAlumnos } from "../stack/AvancesAlumnosStackNavigator";
import { SetQuizzProfesor } from "../../screens/detail/SetQuizzProfesorScreen";
import { SetQuizzStack } from "../stack/SetQuizzProfesoresStackNavigator";

export type RootProfesorBottomTabParams = {
  Publicar: undefined;
  SettingsScreen: undefined;
  Avances: undefined;
  Quizz: undefined;
}

const Tab = createBottomTabNavigator<RootProfesorBottomTabParams>();
export const ProfesorBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      
      initialRouteName="Publicar"
      tabBar={({ descriptors, insets, navigation, state }) => (
        <TabBar 
          descriptors={descriptors}
          insets={insets}
          navigation={navigation}
          state={state}
        />
      )}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName = '';
          switch (route.name) {
              case 'Publicar':
                  iconName = 'cloud-upload-outline';
                  break;
              case 'SettingsScreen':
                  iconName = 'settings';
                  break;
              case 'Avances':
                  iconName = 'trending-up';
                  break;
              case 'Quizz':
                  iconName = 'game-controller-outline';
                  break;
              
          }

          return <Ionicons name={iconName} color={color} size={40} />
        },
        header: () => (
          <View
            style={{
              backgroundColor: colors.primary,
              height: 100
            }}
          />
        )
      })}
    >

      <Tab.Screen 
        name="Publicar" 
        component={PublicarProfesoresScreen} 
        options={{ title: "Publicar" }} 
      />
      <Tab.Screen 
        name='Avances' 
        component={AvancesAlumnos} 
        options={{ title: 'Actividades', headerShown:false }} 
      />
      <Tab.Screen 
        name='Quizz' 
        component={SetQuizzStack} 
        options={{ title: 'Quizz', headerShown:false }} 
        />
      <Tab.Screen 
        name="SettingsScreen" 
        component={SettingsScreen} 
        options={{ title: "Ajustes" }} 
      />

    </Tab.Navigator>
  );  
}

interface Props extends BottomTabBarProps {}
const TabBar = ({ descriptors, navigation, state }: Props) => {
  const translateValue = useRef(new Animated.Value(0)).current;

    const deploy = () => {
        Animated.timing(translateValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    const disguise = () => {
        Animated.timing(translateValue, {
            toValue: 1000,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }
    
    useEffect(() => {
        deploy();
        Keyboard.addListener('keyboardDidShow', disguise);
        Keyboard.addListener('keyboardDidHide', deploy);
    }, []);

    const activeBackgroundColor = "white";  
    const inactiveBackgroundColor = colors.primary; 
    const activeTintColor = "black";
    const inactiveTintColor = "white";
    
    
    return (
      <Animated.View
        style={[
          localStyles.navContainer,
          { transform: [{ translateY: translateValue }] }
        ]}
      >
        {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = 
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;
                const tintColor = isFocused ? activeTintColor : inactiveTintColor;
                const backgroundColor = isFocused
                    ? activeBackgroundColor
                    : inactiveBackgroundColor;

                const onPress = () => {
                    navigation.navigate(route.name);
                };
                return (
                    <TouchableOpacity
                        key={route.name + index}
                        style={[ {backgroundColor: backgroundColor}, localStyles.boton]}
                        onPress={onPress}
                    >   
                        {options.tabBarIcon !== undefined && (
                            options.tabBarIcon({ focused: true, color: tintColor!, size: 34 })
                        )}

                        {isFocused && (
                            <Text style={[ {color: tintColor}, localStyles.text ]} > 
                                { label as string } 
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}    

      </Animated.View>
    );
}


const localStyles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 18,
    alignSelf: "center",
    backgroundColor: colors.primary,
    height: 90,
    borderRadius: 16,
    width: widthWindow - 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  boton: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: 100,
    paddingHorizontal: 12,
    height: 72,
    borderRadius: 28,
  },
  text: {
    fontSize: (widthWindow > 450) ? 8 : 14,
    fontWeight: 'bold',
  }
});


