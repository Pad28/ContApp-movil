import React from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderApp } from '../components/HeaderApp';
import { colors, globalStyles } from '../theme/globalStyles';
import { InputIcon } from '../components/InputIcon';
import { Button } from '../components/Button';
import { Link } from '../components/Link';


export const Login = () => {
    return (
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >
                        <HeaderApp titulo='Inicio sesión' height={100} />

                        <View style={{ marginTop: 50, flexDirection: 'column', justifyContent: "center" }}>
                            <Image style={{ marginTop: 15, height: 160, width: 160, alignSelf: "center" }} source={require("../../assets/LogoSinFondo.png")} />



                            <InputIcon iconName="person"
                                style={{ alignSelf: "center", backgroundColor: 'white', marginTop: 20 }}
                                onChangeText={() => { }}
                                placeholder="Matrícula" />

                            <InputIcon 
                                style={{ alignSelf: "center", backgroundColor: 'white', marginTop: 20 }}
                                onChangeText={() => { }}
                                placeholder="Contraseña"
                                security = {true} />

                            <Link
                                click={()=>{}}
                                text='¿Olvidaste tu contraseña?'
                            />

                            <Button
                                style={{ width: 140, alignSelf: "center", marginTop: 30 }}
                                text="Ingresar"
                                colorBackground={colors.buttonPrimary}
                                fontColor="white"
                                altura={60}
                                onPress={() => { }}
                            />
                        </View>

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