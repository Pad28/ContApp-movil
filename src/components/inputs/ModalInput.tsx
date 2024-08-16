import { Modal, StyleSheet, View } from "react-native";


import { InputIcon } from "../inputs/InputIcon";
import { Button } from "../buttons/Button";
import { colors } from "../../theme/globalStyles";

interface Props {
    showModal: boolean;
    iconName: string;
    placeHolder: string;
    value?: string;
    onChangeText: (value: string) => void;
    setShowModal: (value: boolean) => void;
    onPressAceptar: () => void;
    security?: boolean;
}

export const ModalInput = (props: Props) => {
    const {
        iconName, onChangeText, placeHolder, showModal, setShowModal, onPressAceptar, value, security = false
    } = props;

    return (
        <Modal transparent animationType="slide" visible={showModal}>
            <View style={styles.container} >
                <InputIcon
                    iconName={iconName}
                    onChangeText={onChangeText}
                    placeholder={placeHolder}
                    value={value}
                    style={styles.input}
                    security={security}
                />
                <View style={styles.botonContainer} >
                    <Button
                        style={[styles.boton, { backgroundColor: colors.buttonCancel }]}
                        text="Cancelar"
                        textStyle={{ color: "white" }}
                        onPress={() => {
                            setShowModal(false);
                            onChangeText('');
                        }}
                    />

                    <Button text="Aceptar"
                        style={[styles.boton, { backgroundColor: colors.buttonAccept }]}
                        onPress={() => {
                            onPressAceptar();
                        }}

                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundSecondary,
        elevation: 8,
        margin: 20,
        marginTop: 90,
        height: 280,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        width: '100%'
    },
    input: {
        marginVertical: 10,
    },
    boton: {
        width: 130
    }
});