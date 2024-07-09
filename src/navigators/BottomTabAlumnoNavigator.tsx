import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeAlumnoScreen } from '../screens/profile/homeAlumnoScreen';
import { BottomTabBarPersonalizada } from '../components/BottomTabBarPersonalizada';
import { HeaderApp } from '../components/HeaderApp';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SettingsAlumnoScreen } from '../screens/profile/settingsAlumnoScreen';
import { RecursosAlumnoScreen } from '../screens/profile/recursosAlumnoScreen';
import { ActividadesAlumnoScreen } from '../screens/profile/actividadesAlumnoScreen';
import { AvanceAlumnoScreen } from '../screens/profile/avanceAlumnoScreen';

export type RootBottomTabHomeNav = {
    homeAlumnoScreen: undefined;
    settingsAlumnoScreen: undefined;
    recursosAlumnoScreen: undefined;
    actividadesAlumnoScreen: undefined;
    avanceAlumnoScreen: undefined;
}

const Tab = createBottomTabNavigator<RootBottomTabHomeNav>();
export const BottomTabHomeAlumnoNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={({ insets, descriptors, navigation, state }) => (
                <BottomTabBarPersonalizada
                    insets={insets}
                    descriptors={descriptors}
                    navigation={navigation}
                    state={state}
                />
            )}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName = '';
                    switch (route.name) {
                        case 'homeAlumnoScreen':
                            iconName = 'home';
                            break;
                        case 'settingsAlumnoScreen':
                            iconName = 'settings';
                            break;
                        case 'recursosAlumnoScreen':
                            iconName = 'reader';
                            break;
                        case 'actividadesAlumnoScreen':
                            iconName = 'file-tray-full';
                            break;
                        case 'avanceAlumnoScreen':
                            iconName = 'golf';
                            break;
                    }

                    return <Ionicons name={iconName} color={color} size={40} />
                },
                header: () => <HeaderApp height={60} />
            })}
        >
            <Tab.Screen name='recursosAlumnoScreen' component={RecursosAlumnoScreen} options={{ title: 'Recursos' }} />
            <Tab.Screen name='actividadesAlumnoScreen' component={ActividadesAlumnoScreen} options={{ title: 'Actividades' }} />
            <Tab.Screen name='homeAlumnoScreen' component={HomeAlumnoScreen} options={{ title: 'Inicio' }} />
            <Tab.Screen name='avanceAlumnoScreen' component={AvanceAlumnoScreen} options={{ title: 'Avances' }} />
            <Tab.Screen name='settingsAlumnoScreen' component={SettingsAlumnoScreen} options={{ title: 'Ajustes' }} />

        </Tab.Navigator>
    );
}
