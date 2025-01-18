import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ActividadesAlumnoScreen,
  AvanceAlumnoScreen,
  HomeAlumnoScreen,
  RecursosAlumnoScreen,
  SettingsScreen
} from "../../screens";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { colors, widthWindow } from "../../theme/globalStyles";
import { Ionicons } from '@expo/vector-icons';
import { SettingsContext } from "../../context";
import { ActividadStackNavigator } from "../stack/ActividadesStackNavigator";

export type RootAlumnoBottomTabParams = {
  HomeAlumnoScreen: undefined;
  SettingsScreen: undefined;
  RecursosAlumnoScreen: undefined;
  ActividadesAlumnoScreen: undefined;
  AvanceAlumnoScreen: undefined;
}

const Tab = createBottomTabNavigator<RootAlumnoBottomTabParams>();
export const AlumnoBottomTabNavigator = () => {
  const { changeDevelopmentSettings } = useContext(SettingsContext);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count === 20) {
      changeDevelopmentSettings(true);
      Alert.alert("Aviso", "Se mostrara la información de desarrollo");
      setCount(0);
    }
  }, [count])

  return (
    <Tab.Navigator

      initialRouteName="HomeAlumnoScreen"
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
            case 'HomeAlumnoScreen':
              iconName = 'home';
              break;
            case 'SettingsScreen':
              iconName = 'settings';
              break;
            case 'RecursosAlumnoScreen':
              iconName = 'reader';
              break;
            case 'ActividadesAlumnoScreen':
              iconName = 'file-tray-full';
              break;
            case 'AvanceAlumnoScreen':
              iconName = 'golf';
              break;
          }

          return <Ionicons name={iconName} color={color} size={40} />
        },
        header: () => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.primary,
              height: 120
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => setCount(count + 1)}
            >
              <Image
                source={require("../../../assets/LogoSinFondo.png")}
                style={{
                  height: 90,
                  width: 90
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        )
      })}
    >

      <Tab.Screen
        name="RecursosAlumnoScreen"
        component={RecursosAlumnoScreen}
        options={{ title: "Recursos" }}
      />
      <Tab.Screen
        name="ActividadesAlumnoScreen"
        component={ActividadStackNavigator}
        options={{ title: 'Actividades' }}
      />
      <Tab.Screen
        name='HomeAlumnoScreen'
        component={HomeAlumnoScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name='AvanceAlumnoScreen'
        component={AvanceAlumnoScreen}
        options={{ title: 'Avances' }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Ajustes" }}
      />

    </Tab.Navigator>
  );
}

interface Props extends BottomTabBarProps { }
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
            style={[{ backgroundColor: backgroundColor }, localStyles.boton]}
            onPress={onPress}
          >
            {options.tabBarIcon !== undefined && (
              options.tabBarIcon({ focused: true, color: tintColor!, size: 34 })
            )}

            {isFocused && (
              <Text style={[{ color: tintColor }, localStyles.text]} >
                {label as string}
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


