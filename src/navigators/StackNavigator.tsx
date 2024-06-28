import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Login } from "../screens/auth/Login";
import { RecoverPassword } from "../screens/auth/RecoverPassword";
import { HeaderApp } from "../components/HeaderApp";


export type RootLoginStackParams = {
    Login: undefined;
    Home: undefined;
    RecoverPassword: undefined
}

const Stack = createStackNavigator<RootLoginStackParams>();
export const StackNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                header: ({ navigation, options, route }) => (
                    <HeaderApp
                        height={100}
                        icono={(route.name !== "Login")}
                        titulo={options.title}
                        clickIcono={() => navigation.pop()} />
                )
            }}>
            <Stack.Screen options={{ title: "Inicio de sesion" }} name="Login" component={Login} />
            <Stack.Screen options={{ title: "Recuperar contraseña" }} name="RecoverPassword" component={RecoverPassword} />
        </Stack.Navigator>
    );
}