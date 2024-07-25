import { useContext } from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, TextStyle, View } from "react-native";
import { SettingsContext } from "../context";
import { colors, widthWindow } from "../theme/globalStyles";
import { IconButton } from "./buttons/IconButton";

interface Props {
    pregunta: string;
    respuestaAlumno: string;
    respuestaCorrect?: string;
    isCorrect: boolean;
    styleView?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
}

export const ResultadoPregunta = ({ pregunta, isCorrect, respuestaAlumno, respuestaCorrect, styleView, styleText }: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;

    return (
        <View style={[localStyles.container, styleView]}>
            <Text style={[localStyles.text, { fontSize }, styleText]}>{pregunta}</Text>
            <Text style={[localStyles.text, { fontSize }, styleText]}>Respuesta del alumno:</Text>
            <Text style={[localStyles.text, { fontSize }, styleText]}>{respuestaAlumno}</Text>

            {!isCorrect && (
                <>
                    <Text style={[localStyles.text, { fontSize }, styleText]}>Respuesta correcta:</Text>
                    <Text style={[localStyles.text, { fontSize }, styleText]}>{respuestaCorrect}</Text>
                </>
            )}

            {isCorrect ? (
                <IconButton
                    iconName="checkmark-circle"
                    onPress={() => {}}
                    style={{ backgroundColor: "green" }}
                />
            ) : (
                <IconButton
                    iconName="close-circle"
                    onPress={() => {}}
                    style={{ backgroundColor: "red" }}
                />
            )}
        </View>
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
