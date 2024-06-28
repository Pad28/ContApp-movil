import { Ionicons } from "@expo/vector-icons";
import React from 'react'
import { Button, Dimensions, Modal, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { colors, globalStyles } from "../theme/Styles";



interface Props {
    text: string; //Texto que tendra la alerta
    nameIcon: string; //Nombre del icono que tendra la alerta
    colorIcon?: string; //Color de icono que tendra la alerta
    width?: number; //Ancho de la alerta
    visible: boolean; //True para visible y false para invisible
    setVisible: (value: React.SetStateAction<boolean>) => void; //Para modificar su visibilidad
    clickAccept: ()=>void;
    showButtonCancel?: boolean;
}

const { height: windowHeight } = Dimensions.get('window');
export const VentanaModal = ( {showButtonCancel = false, clickAccept, colorIcon, nameIcon, text, width = 300, setVisible, visible }: Props ) => {

    return (
        <Modal
            transparent={true}
            animationType='slide'
            visible={visible}
        >
            <View
                style={[ localStyles.modalContainer, { width } ]}
            >
                <Ionicons style={{fontSize: 60, color: colorIcon }} name={nameIcon} />
                <Text style={[ localStyles.textoStyle, {marginBottom: 24} ]} > { text } </Text>
                <View style={{ flexDirection: 'row' }} >

                    {/* Aceptar */}
                    <TouchableOpacity
                        style={[ localStyles.botonAccept, { marginRight: 20 } ]}
                        onPress={()=>{
                            setVisible(false)
                            clickAccept()
                        }}
                    >
                        <Text style={[ localStyles.textoStyle, { color: 'white' } ]} >Aceptar</Text>
                    </TouchableOpacity> 

                    {/* // Cancelar */}
                    {(showButtonCancel) && (<TouchableOpacity
                        style={ [localStyles.botonCancel]  }
                        onPress={() => setVisible(false)}
                    >
                        <Text style={[ localStyles.textoStyle, { color: 'white' } ]} >Cerrar</Text>
                    </TouchableOpacity>)}
                </View>

            </View>
        </Modal>
    );
}

const localStyles = StyleSheet.create({
    modalContainer: {
        height: 300,
        backgroundColor: "white",
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: (windowHeight / 2) - 110,
        borderRadius: 18,
        elevation: 40,
        paddingHorizontal: 8,
        paddingVertical: 16,
        justifyContent: 'center',
        flexDirection: "column"
    },
    textoStyle: {
        fontSize: 18,
        fontWeight: 'bold'
        
    },
    botonAccept: {
        backgroundColor: colors.buttonAccept,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    botonCancel: {
        backgroundColor: colors.buttonCancel,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 12,
    }
});