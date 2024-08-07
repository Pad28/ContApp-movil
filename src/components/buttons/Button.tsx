import { useContext } from "react";
import { StyleProp, ViewStyle, TouchableOpacity, Text, StyleSheet, TextStyle, View } from "react-native";
import { colors, widthWindow } from "../../theme/globalStyles";
import { SettingsContext } from "../../context";
import { Ionicons } from '@expo/vector-icons';


interface Props {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
    iconName?: string;
    fontColor?: string;
    color?: string;
}

export const Button = ({color = colors.buttonPrimary, iconName, fontColor, text, onPress, style, styleText }: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;

    return (
        <TouchableOpacity 
            style={[ localStyles.container, style, {backgroundColor: color} ]} 
            onPress={onPress}
        >
            <Text style={[ localStyles.text, { fontSize }, styleText  ]} >
                { text }
            </Text>
            {(iconName) && (
                <View style={{ marginLeft: 20 }} >
                    <Ionicons name={iconName} color={fontColor} size={fontSize + 6} />
                </View>
            )}
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundPrimary,
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
