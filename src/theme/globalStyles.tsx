import { Dimensions, StyleSheet } from "react-native"

export const { height: heightWindow, width: widthWindow } = Dimensions.get('window');

export const colors = {
    primary: "#74022d", //Vino
    backgroundPrimary: "#FEF9D1", //Cremita
    buttonPrimary: "#74022d", //Vino boton
    buttonAccept: "#009929", //Verde
    buttonCancel: "E83131" //Rojo
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
    },
    fontSize: {
        fontSize: 22
    }
});