import { useContext } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { SettingsContext } from "../../context";

interface Props {
    onPress: () => void;
    text: string;
    style?: StyleProp<ViewStyle>;
}

export const LinkButton = ({ onPress, text, style }: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[ localStyles.container, style]}
        >
            <Text style={[localStyles.text, {fontSize} ]} >
                { text }
            </Text>
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        padding: 10
    },
    text: {
        fontWeight: "bold",
        color: "#004aad",
        textDecorationLine: "underline",
    }
});