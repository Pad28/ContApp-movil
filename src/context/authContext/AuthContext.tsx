import { createContext, useEffect, useReducer } from "react";
import { User, UserAuthenticated } from "../../interfaces/UserAuthenticated";
import { authReducer } from "./AuthReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStorageKeys } from "../../config";
import { useRequestPost } from "../../hooks";

export interface AuthState {
    fingerPrintAuth: boolean;
    islogged: boolean;
    userAuthenticated?: User;
    token?: string;
}

export const authInitialState: AuthState = {
    islogged: false,
    fingerPrintAuth: false,
}

export interface AuthContextProps {
    authState: AuthState;
    logIn: (user: User, token: string) => void;
    logOut: () => void;
    isLoadingCheckUser: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);
export const AuthProvider = ({ children }: any) => {
    const [ authState, dispatch ] = useReducer(authReducer, authInitialState);
    const { isLoading, setIsLoading, peticionPostAlert } = useRequestPost({});

    useEffect(() => {
        checkUser();        
    }, []);

    const checkUser = async() => {
        setIsLoading(true);
        const [user, token] = await Promise.all([
            await AsyncStorage.getItem(AuthStorageKeys.USER_AUTHENTICATED),
            await AsyncStorage.getItem(AuthStorageKeys.USER_TOKEN),
        ]);
        
        if(token) dispatch({ 
            type: "fingerPrintAuth", 
            payload: { isActive: true, recoveredToken: token } 
        });
        
        if(!user) {
            setIsLoading(false);
            return dispatch({ type: "logOut" })
        };
        
        const result = await peticionPostAlert({
            path: "/api/auth/renew-token",
            body: {},
            validateEmpty: false,
            config: {headers: {'Authorization': `Bearer ${token}`}},
            errorMessage: "La sesión a expirado",
        });

        setIsLoading(false);
        if(!result) return logOut();
        const { alumno, token: newToken } = result as UserAuthenticated;
        logIn(alumno, newToken);
    }

    // Inicia sesión del usuario en el context y guarda el JWT y la información en el AsyncStorage
    const logIn = async (user: User, token: string) => {
        dispatch({ type: "signIn", payload: { token, userAuthenticated: user }});
        await AsyncStorage.setItem(AuthStorageKeys.USER_TOKEN, token);
        await AsyncStorage.setItem(AuthStorageKeys.USER_AUTHENTICATED, JSON.stringify(user));
    }

    // Cierra sesión del usuario en el context y elimina la información del usuario en el AsyncStorage
    const logOut = async() => {
        await AsyncStorage.removeItem(AuthStorageKeys.USER_AUTHENTICATED);
        dispatch({ type: "logOut" });
    }

    return (
        <AuthContext.Provider
            value={{
                authState,
                logIn,
                logOut,
                isLoadingCheckUser: isLoading,
            }}
        >
            { children }
        </AuthContext.Provider>
    );

}