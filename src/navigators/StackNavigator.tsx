import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Login } from "../screens/login";


export type RootLoginStackParams = {
    login: undefined;
    home: undefined;
}

const Stack = createStackNavigator<RootLoginStackParams>();
export const StackNavigator = () => {

    return (
        <Stack.Navigator
        
        screenOptions={{headerShown: false}}>
            <Stack.Screen options={{ gestureEnabled: false }} name="login" component={Login} />
        </Stack.Navigator>
    );
}