import { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settingsReducer } from "./SetttingsReducer";
import { SettingsStorageKeys } from "../../config";
import { Alert } from "react-native";

// Como se ve el estado de los ajustes
export interface SettingsState {
    fontSize: number; // Tamaño de letra actual
    fontSizeMax: number; // Tamaño de letra maximo
    fontSizeMin: number; // Tamaño de letra minimo
    developmentSettings: boolean; // Opciones de desarrollador activas o inactivas
}

// Estado inicial del contexto de ajustes
export const settingsInitialState: SettingsState = {
    fontSize: 20,
    fontSizeMax: 24,
    fontSizeMin: 16,
    developmentSettings: false,
}

// Como se ve el objeto que sera servido por el contexto de ajustes
export interface SettingsContextProps {
    settingsState: SettingsState; // Atributos que contiene el contexto de ajustes
    changeFontSize: (incrementer: number) => void; // Cambiar el tamaño de la letra, recibe como argumento el incremento que tendra el tamaño
    changeDevelopmentSettings: (state: boolean) => void; // Cambiar el valor de las opciones de desarrollador
}

export const SettingsContext = createContext({} as SettingsContextProps);
export const SettingsProvider = ({ children }: { children: React.JSX.Element | React.JSX.Element[] }) => {
    const [settingsState, dispatch] = useReducer(settingsReducer, settingsInitialState);

    useEffect(() => {
        checkSettings();
    }, []);

    // Verificar los ajustes previamente guardados por el usuario
    const checkSettings = async () => {
        const fontSize = await AsyncStorage.getItem(SettingsStorageKeys.FONT_SIZE);
        if (fontSize) dispatch({ type: "changeFontSize", payload: parseInt(fontSize) })

        const devSettings = await AsyncStorage.getItem(SettingsStorageKeys.DEVELOPMENT_SETTINGS);
        if (devSettings) dispatch({ type: "changeDevelopmentSettings", payload: devSettings === "true" });
    }

    // Implementación de la fucion de cambio de tamaño de letra definida en la interfaz SettingsContextProps
    const changeFontSize = async (increment: number) => {
        let size = settingsState.fontSize + increment;
        size = (size >= settingsState.fontSizeMax) ? settingsInitialState.fontSizeMax : size;
        size = (size <= settingsState.fontSizeMin) ? settingsInitialState.fontSizeMin : size;
        dispatch({ type: "changeFontSize", payload: size });
        await AsyncStorage.setItem(SettingsStorageKeys.FONT_SIZE, size.toString());
    }

    // Implementación de la fucion de activacion/desactivacion de opciones de desarrollador definida en la interfaz SettingsContextProps
    const changeDevelopmentSettings = async (state: boolean) => {
        dispatch({ type: "changeDevelopmentSettings", payload: state });
        await AsyncStorage.setItem(SettingsStorageKeys.DEVELOPMENT_SETTINGS, state + "");
    }

    return (
        <SettingsContext.Provider
            value={{
                settingsState,
                changeDevelopmentSettings,
                changeFontSize
            }}
        >
            {children}
        </SettingsContext.Provider>
    );

}