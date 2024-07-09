import { StackScreenProps } from "@react-navigation/stack";
import { RootLoginStackParams } from "../../navigators/StackNavigator";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderApp } from "../../components/HeaderApp";
import React from "react-native"
import { colors, globalStyles } from "../../theme/globalStyles";
import { InputIcon } from "../../components/InputIcon";
import { Button } from "../../components/buttons/Button";
import { useState } from "react";
import { VentanaModal } from "../../components/feedback/Alerta";

interface Props extends StackScreenProps<RootLoginStackParams, any> {
}

export const SettingsAlumnoScreen = ({ navigation }: Props) => {
    const [modal, setModal] = useState(false);
    return (
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >

                    <Text style={{margin:15, fontSize:20, alignSelf:'center'}}>
                            Pantalla de ajustes
                        </Text>
                        <Text style={{margin:15, fontSize:20, alignSelf:'center'}}>
                            ¡Modificar datos!
                        </Text>
                        
                        <InputIcon
                            style={{ alignSelf: "center", backgroundColor: 'white', marginTop: 20 }}
                            onChangeText={() => { }}
                            placeholder="MATRÍCULA"
                            iconName="person"
                        />


                        <Button
                            style={{ width: 140, alignSelf: "center", marginTop: 80 }}
                            text="Salir"
                            colorBackground={colors.buttonPrimary}
                            fontColor="white"
                            altura={60}
                            onPress={() => { setModal(true) }}
                        />

                        <VentanaModal
                        visible= {modal}
                        nameIcon="alert-outline"
                        text="Esta seguro de cerrar sesión"
                        setVisible={setModal}
                        clickAccept={()=>{navigation.navigate("Login")}}
                        colorIcon="red"
                        showButtonCancel={true}

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