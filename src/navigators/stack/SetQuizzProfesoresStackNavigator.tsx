import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RecoverPasswordScreen } from "../../screens";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/globalStyles";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useContext } from "react";
import { AuthContext, SettingsContext } from "../../context";
import { AlumnoBottomTabNavigator } from "../bottomTab/AlumnoBottomTabNavigator";
import { SeleccionarGrupoQuizzScreen } from "../../screens/detail/SeleccionarGrupoQuizzProfesorScreen";
import { AlumnosGrupoProfesor } from "../../screens/detail/AvancesGrupoProfesorScreen";
import { AvanceAlumnoProfesor } from "../../screens/detail/AvancesAlumnoProfesorScreen";
import { SetQuizzProfesor } from "../../screens/detail/SetQuizzProfesorScreen";

export type RootQuizzStackParams = {
    SeleccionarGrupo: undefined;
    SetQuizz: undefined;
}

const Stack = createStackNavigator<RootQuizzStackParams>();
export const SetQuizzStack = () => {
    const { islogged } = useContext(AuthContext).authState;

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                header: ({ navigation, options, route }) => (
                    <HeaderNav
                        buttonBack={route.name != "SeleccionarGrupo"}
                        onPressButtonBack={() => navigation.pop()}
                        height={100}
                        title={options.title}
                    />
                )
            }}
        >

            <Stack.Screen
                options={{ title: "Grupo" }}
                name="SeleccionarGrupo"
                component={SeleccionarGrupoQuizzScreen}
            />
            <Stack.Screen
                options={{ title: "Alumnos" }}
                name="SetQuizz"
                component={SetQuizzProfesor}
            />
            


            {/* {(!islogged) ? (
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
            )} */}

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
            <ExpoStatusBar backgroundColor={colors.primary} style="light" />
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
                <Text style={[localStyles.text, { fontSize: fontSize + 4 }]} >
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