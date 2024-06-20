import { SettingsState } from "./SettingsContext";

type settingAction = 
    | { type: "changeFontSize", payload: number }
    | { type: "changeDevelopmentSettings", payload: boolean };

export const settingsReducer = (state: SettingsState, action: settingAction): SettingsState => {
    switch (action.type) {
        case 'changeFontSize':
            return {
                ...state,
                fontSize: action.payload,
            }
        case "changeDevelopmentSettings":
            return {
                ...state,
                developmentSettings: action.payload,
            }
        default:
            return state;
    }
}