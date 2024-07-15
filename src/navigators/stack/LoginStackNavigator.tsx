import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RecoverPasswordScreen } from "../../screens";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/globalStyles";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useContext } from "react";
import { AuthContext, SettingsContext } from "../../context";
import { AlumnoBottomTabNavigator } from "../bottomTab/AlumnoBottomTabNavigator";

export type RootLoginStackParams = {
    LoginScreen: undefined;
    RecoverPasswordScreen: undefined;
    AlumnoBottomTabNavigator: undefined;
}   

const Stack = createStackNavigator<RootLoginStackParams>();
export const LoginStackNavigator = () => {
    const { islogged } = useContext(AuthContext).authState;

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                header: ({ navigation, options, route }) => (
                    <HeaderNav
                        buttonBack={ route.name === "RecoverPasswordScreen" }
                        onPressButtonBack={() => navigation.pop()} 
                        height={120}
                        title={options.title}
                    />
                )
            }}
        >
            {(!islogged) ? (
                <>
                <Stack.Screen 
                    options={{ title: "Inicio de sesión" }}
                    name="LoginScreen"
                    component={LoginScreen}
                />

                <Stack.Screen 
                    options={{ title: "Recuperar Contraseña" }}
                    name="RecoverPasswordScreen"
                    component={RecoverPasswordScreen}
                />
                </>
            ) : (
                <Stack.Screen 
                    options={{ 
                        headerShown: false, 
                        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    }}
                    name="AlumnoBottomTabNavigator"
                    component={AlumnoBottomTabNavigator}
                />  
            )}

        </Stack.Navigator>
    );
}


interface HeaderNavProps {
    height: number;
    title?: string;
    buttonBack?: boolean;
    onPressButtonBack?: () => void;
}

const HeaderNav = ({ height, buttonBack, onPressButtonBack, title }: HeaderNavProps) => {
    const { fontSize } = useContext(SettingsContext).settingsState;
    
    return (
        <View style={[localStyles.containerHeaderNav, { height }]}>
            <ExpoStatusBar backgroundColor={colors.primary} style="light"  />
            {(buttonBack) && (
                <TouchableOpacity 
                    onPress={onPressButtonBack} 
                    style={{
                        justifyContent: "center",
                    }}  
                >
                    <Ionicons 
                        name="chevron-back" 
                        color={"white"}
                        size={40}
                        style={{ marginLeft: 10, marginTop: 12 }}
                    />
                </TouchableOpacity>
            )}
            {(title) && (
                <Text style={[ localStyles.text, { fontSize: fontSize + 4 } ]} >
                    {title}
                </Text>
            )}
        </View>
    );
}

const localStyles = StyleSheet.create({
    containerHeaderNav: {
        backgroundColor: colors.primary,
        flexDirection: "row"
    },
    text: {
        alignSelf: "center",
        fontWeight: "bold",
        color: "white",
        marginTop: 12,
        marginLeft: 10
    }
});