import { Modal, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors, heightWindow } from "../../theme/globalStyles";


interface Props {
    text: string;
    visible: boolean;
    onPressAccept: () => void;
    onPressCancel: () => void;
    style?: StyleProp<ViewStyle>;
}

export const Alert = ({ text, visible, style, onPressAccept, onPressCancel }: Props) => {
    return (
        <Modal
            transparent
            animationType="slide"
            visible={visible}
        >
            <View style={[ localStyles.modalContainer, style ]} >
                <Text style={[ localStyles.text, {marginBottom: 24} ]} > 
                    { text } 
                </Text>

                <View style={{ flexDirection: "row", gap: 20 }} >
                    {/* // Cancelar */}
                    <TouchableOpacity
                        style={[localStyles.botonCancel]}
                        onPress={onPressCancel}
                    >
                        <Text style={[localStyles.text, { color: "white" }]} >
                            Cancelar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[localStyles.botonAccept]}
                        onPress={onPressAccept}
                    >
                        <Text style={[localStyles.text, { color: "white" }]} >
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>    
    );
}

const localStyles = StyleSheet.create({
    modalContainer: {
        height: 200,
        backgroundColor: "white",
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: (heightWindow / 2) - 220,
        borderRadius: 18,
        elevation: 40,
        paddingHorizontal: 18,
        paddingVertical: 16,
        justifyContent: 'center',
        flexDirection: "column"
    },
    text: {
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