import { Dimensions, StyleSheet } from "react-native"

export const { height: heightWindow, width: widthWindow } = Dimensions.get('window');

export const colors = {
    primary: "#74022d", //Vino
    backgroundPrimary: "#FEF9D1", //Cremita
    backgroundSecondary: "#FEFEFD",
    buttonPrimary: "#123456", //boton azul
    buttonAccept: "#009929", //Verde
    buttonCancel: "#E83131", //Rojo
    danger: "#881337",
    error: "#fb7185",
    success300: "#86efac",
    success800: "#166534",
    warning700: "#c2410c",
    warning300: "#fdba74",
    info700: "#0369a1",
    info200: "#bae6fd",
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.backgroundPrimary,
    },
    title: {
        marginVertical: 18,
        fontWeight: "bold",
    },
});