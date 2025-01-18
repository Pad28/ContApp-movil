import { createStackNavigator } from "@react-navigation/stack";
import { ActividadesAlumnoScreen } from "../../screens";
import { PreguntasScreen } from "../../screens/detail/PreguntasScreen";

export type ActividadesStackParams = {
    ActividadesAlumnoScreen: undefined;
    PreguntasScreen: { idActividad: string, fechaLimite: string };
}


const Stack = createStackNavigator<ActividadesStackParams>();
export const ActividadStackNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="ActividadesAlumnoScreen"
                component={ActividadesAlumnoScreen}
            />
            <Stack.Screen
                name="PreguntasScreen"
                component={PreguntasScreen}
            />
        </Stack.Navigator>
    );
}