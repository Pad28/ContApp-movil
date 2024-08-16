import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../theme/globalStyles";
import { useContext, useState } from "react";
import { SettingsContext } from "../../context";

export const ActividadesAlumnoScreen = () => {
    const [modal, setModal] = useState(false);
    const { fontSize } = useContext(SettingsContext).settingsState;

    return (
        <View style={globalStyles.container} >
            <KeyboardAvoidingView>
                <ScrollView showsHorizontalScrollIndicator={false} >

                    <Text style={[globalStyles.title, { alignSelf: "center", fontSize: fontSize + 6 }]}>
                        Actividades
                    </Text>
                    <Text style={{ margin: 15, fontSize: 20, alignSelf: 'center' }}>
                        No tienes actividades Pendientes! :D
                    </Text>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 160,
        borderRadius: 30,
        alignSelf: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'blue',
        width: 100,
        height: 70
    },
    buttonInclusivo: {
        backgroundColor: 'red',
        width: 180,
        height: 120
    },
    textStyleBienvenido: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 4,
        borderColor: "black",
        borderRadius: 12,
        backgroundColor: "white",
        padding: 5
    },
    textStyle: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        fontStyle: "italic"
    },
    textStyle2: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'justify',
        fontSize: 20,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        fontStyle: "italic"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})




0