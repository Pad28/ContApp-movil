import { User } from "../../interfaces/UserAuthenticated";
import { AuthState } from "./AuthContext";

type userPayload = {
    userAuthenticated: User;
    token: string;
}

type authAction = 
    | { type: "signIn", payload: userPayload }
    | { type: "fingerPrintAuth", payload: { isActive: boolean, recoveredToken: string } }
    | { type: "logOut" };

export const authReducer = (state: AuthState, action: authAction): AuthState => {
    switch(action.type) {
        case "signIn":
            const { token, userAuthenticated } = action.payload;
            return {
                ...state,
                islogged: true,
                userAuthenticated: userAuthenticated,
                token
            }
        case "logOut": 
            return { 
                ...state, 
                islogged: false, 
                userAuthenticated: undefined 
            }
        case "fingerPrintAuth": 
            const { isActive, recoveredToken } = action.payload;
            return { 
                ...state, 
                fingerPrintAuth: isActive, 
                token: recoveredToken 
            }
        default: 
            return state
    }
}