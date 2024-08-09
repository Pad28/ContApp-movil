import { KeyboardAvoidingView, Text, View, ScrollView } from "react-native";
import { colors, globalStyles } from "../../theme/globalStyles";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
//import { ScrollView } from "react-native-gesture-handler";
import { Alert, Button, IconButton, InputIcon } from "../../components";
import { ButtonIcon } from "../../components/buttons/ButtonIcon";
import { ModalInput } from "../../components/feedback/ModalInput";

export const SettingsScreen = () => {
    const { logOut } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState(false);
    const [nombreModal, setNombreModal] = useState(false);
    const [apellidosModal, setApellidosModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    // const { form, isLoading, onChange, peticionPutAlert } = usePeticionPut({
    //     nombre: '', apellidos: '', password: '',
    // });

    return (
        <View style={globalStyles.container} >
            <KeyboardAvoidingView>
                <ScrollView>

                    <ButtonIcon
                        label="Nombre:"
                        text={"Yahir"}
                        iconName="pencil"
                        onPress={() => setNombreModal(true)}
                        style={{ marginTop: 30 }}
                    />
                    <ButtonIcon
                        label="Apellido:"
                        text={"Gutierre Cano"}
                        iconName="pencil"
                        onPress={() => setApellidosModal(true)}
                        style={{ marginTop: 30 }}
                    />
                    <ButtonIcon
                        label="Contraseña:"
                        text={'*********'}
                        iconName="pencil"
                        onPress={() => setPasswordModal(true)}
                        style={{ marginTop: 30 }}
                    />

                    <View
                        style={{
                            width: "100%",
                            alignSelf: 'center',
                            borderTopWidth: 1,
                            borderColor: 'gray',
                            marginTop: 30,
                        }}
                    />


                    <Button
                        style={{ alignSelf: "center", marginVertical: 10 }}
                        onPress={() => setShowAlert(true)}
                        text="Cerrar sesión"
                        color="red"
                    />

                    <ModalInput
                        iconName="pencil"
                        onChangeText={value => {}}
                        placeHolder={"Nombre"}
                        setShowModal={setNombreModal}
                        showModal={nombreModal}
                        onPressAceptar={() => {
                            setNombreModal(false);
                            //handlePeticion({ nombre: form.nombre })
                        }}
                    />

                    <ModalInput
                        iconName="pencil"
                        onChangeText={value => {}}
                        placeHolder={"apellidos"}
                        setShowModal={setApellidosModal}
                        showModal={apellidosModal}
                        onPressAceptar={() => {
                            setApellidosModal(false);
                            //handlePeticion({ apellidos: form.apellidos })
                        }}
                    />

                    <ModalInput
                        iconName="pencil"
                        onChangeText={value => {}}
                        placeHolder={'********'}
                        setShowModal={setPasswordModal}
                        showModal={passwordModal}
                        security={true}
                        onPressAceptar={() => {
                            setPasswordModal(false);
                            //handlePeticion({ password: form.password })
                        }}
                    />

                    <Alert
                        visible={showAlert}
                        onPressAccept={() => {
                            setShowAlert(false);
                            logOut();
                        }}
                        onPressCancel={() => setShowAlert(false)}
                        text="¿Desea cerrar sesión?"
                    />

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
