import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "../../theme/globalStyles";
import { useContext, useState } from "react";
import { SettingsContext } from "../../context";
import { Button, InputIcon } from "../../components";
import { useRecoverPasswordScreen } from "../../hooks";
import { StackScreenProps } from "@react-navigation/stack";
import { RootLoginStackParams } from "../../navigators";
import { AlumnosGrupoProfesor } from "./AvancesGrupoProfesorScreen";
import { RootAvancesStackParams } from "../../navigators/stack/AvancesAlumnosStackNavigator";
import { RootQuizzStackParams } from "../../navigators/stack/SetQuizzProfesoresStackNavigator";



interface Props extends StackScreenProps<RootQuizzStackParams, any> { }

export const SeleccionarGrupoQuizzScreen = ({ navigation }: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;
    const [modal, setModal] = useState(false);
    return (
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >

                        <Text style={{ margin: 15, fontSize: 24, alignSelf: 'center', fontWeight: "bold" }}>
                            Seleccione un grupo:
                        </Text>

                        <Button
                            style={{ alignSelf: "center", marginVertical: 10 }}
                            onPress={() => navigation.navigate("SetQuizz")}
                            text="Grupo NI34"
                        />

                        <Button
                            style={{ alignSelf: "center", marginVertical: 10 }}
                            onPress={() => navigation.navigate("SetQuizz")}
                            text="Grupo NI33"
                        />



                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
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
