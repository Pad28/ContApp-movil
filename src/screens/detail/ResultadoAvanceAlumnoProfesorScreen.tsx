import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../theme/globalStyles";
import { useState } from "react";
import { ResultadoPregunta } from "../../components/ResultadoPregunta";

export const ResultadoAvanceAlumnoProfesor = () => {
    const [modal, setModal] = useState(false);
    return (
        <View style={{ flex: 1 }} >
            <View style={[globalStyles.container]} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={true} >

                        <Text style={{ margin: 15, fontSize: 24, alignSelf: 'center', fontWeight: "700" }}>
                            Resultado de Quizz
                        </Text>
                        
                        <ResultadoPregunta
                            pregunta="¿Quién es el padre de la contabilidad?"
                            respuestaAlumno="Fra Luca Pacioli"
                            isCorrect={true}
                        />

                        <ResultadoPregunta
                            pregunta="Es el proceso de registrar, clasificar, analizar, interpretar y comunicar la información financiera de una entidad u organización"
                            respuestaAlumno="Administración"
                            isCorrect={false}
                            respuestaCorrect="Contabilidad"

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




