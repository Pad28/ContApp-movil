import { useContext } from "react";
import { StyleProp, ViewStyle, TouchableOpacity, Text, StyleSheet, TextStyle } from "react-native";
import { colors, widthWindow } from "../../theme/globalStyles";
import { SettingsContext } from "../../context";


interface Props {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export const Button = ({ text, onPress, style, textStyle }: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;

    return (
        <TouchableOpacity
            style={[localStyles.container, style]}
            onPress={onPress}
        >
            <Text style={[localStyles.text, { fontSize }, textStyle]} >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.buttonPrimary,
        borderRadius: 14,
        padding: 18,
        height: "auto",
        width: widthWindow - 100
    },
    text: {
        fontWeight: "bold",
        color: "white"
    }
});
