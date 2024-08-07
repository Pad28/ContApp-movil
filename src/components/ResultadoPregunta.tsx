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
            <View style={[localStyles.container_pregunta]}>
            <Text style={[localStyles.text,  {marginBottom:10, fontSize }, styleText]}>{pregunta}</Text>
            </View>
            
            <Text style={[localStyles.text, { fontSize }, styleText]}>Respuesta del alumno:</Text>
            <Text style={[localStyles.text, { marginBottom:10, fontSize }, styleText]}>{respuestaAlumno}</Text>

            {!isCorrect && (
                <>
                    <Text style={[localStyles.text, { fontSize }, styleText]}>Respuesta correcta:</Text>
                    <Text style={[localStyles.text, {  marginBottom:10, fontSize }, styleText]}>{respuestaCorrect}</Text>
                </>
            )}

            {isCorrect ? (
                <IconButton
                    iconName="checkmark-circle"
                    onPress={() => {}}
                    style={{ backgroundColor: "green", height:10 }}
                    tamaño={10}
                />
            ) : (
                <IconButton
                    iconName="close-circle"
                    onPress={() => {}}
                    style={{ backgroundColor: "red", height:80, width:80, padding:0 }}
                    tamaño={50}
                />
            )}
        </View>
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
        width: widthWindow - 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)"
         
    },
    text: {
        fontWeight: "bold",
        color: "black",
    },
    container_pregunta: {
        backgroundColor: "white",
        flexDirection: "row",
        borderRadius: 5
    }
});
