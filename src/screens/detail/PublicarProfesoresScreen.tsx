import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../theme/globalStyles";
import { useState } from "react";
import { DropBox } from "../../components/DropBox";
import { ItemType } from "react-native-dropdown-picker";
import { Button, InputIcon } from "../../components";


export const PublicarProfesoresScreen = () => {
    const [modal, setModal] = useState(false);
    const [grupo, setGrupo] = useState<ItemType<string>>({ label: '', value: '' });
    const grupos = [
        { label: 'ISC92', value: 'ISC92' },
        { label: 'ISC91', value: 'ISC91' }
    ];
    const [value, setValue] = useState("");
    return (
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >

                        <Text style={{ margin: 15, fontSize: 20, alignSelf: 'center' }}>
                            Seleccione la opción a realizar
                        </Text>

                        <DropBox
                            style={{ marginTop: 20 }}
                            texto="Grupo:"
                            values={grupos}
                            getValue={setGrupo}
                            ancho={200}
                        />

                        <DropBox
                            style={{ marginTop: 30 }}
                            texto="Tipo:"
                            values={grupos}
                            getValue={setGrupo}
                            ancho={200}
                        />

                        <InputIcon
                            iconName="pencil"
                            placeholder="Ingresa una descripcion"
                            onChangeText={setValue}
                            value={value}
                            styleText={{ height: 180, fontSize: 18, paddingTop: 9 }}
                            style={{ marginTop: 60 }}
                            publicar={true}

                        />

                        <Button
                            style={{
                                alignSelf: "center",
                                marginTop: 20,
                            }}
                            onPress={()=>console.log("hola")}
                            text="Enviar"
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




0