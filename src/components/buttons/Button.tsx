import { useContext } from "react";
import { StyleProp, ViewStyle, TouchableOpacity, Text, StyleSheet, TextStyle } from "react-native";
import React from "react";
import { colors } from "../../theme/globalStyles";


interface Props {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    colorBackground?: string;
    fontColor?: string;
    borde?: StyleProp<ViewStyle>
    styleText?: StyleProp<TextStyle>;
    altura?: number;
}

export const Button = ({altura, styleText, borde, text, onPress, style, colorBackground = colors.buttonPrimary, fontColor = "black" }: Props) => {
    

    return (
        <TouchableOpacity 
            style={[ borde, localStyles.container, style, { backgroundColor: colorBackground, height: altura } ]} 
            onPress={onPress}
        >
            <Text 
                style={[ styleText, localStyles.text, { color: fontColor} ]} 
            >
                { text }
            </Text>
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 8,
        padding: 10,
        height: 62,
    },
    text: {
        fontWeight: "bold",
        fontSize: 20
    }
});
