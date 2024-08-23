import { ActivityIndicator, KeyboardAvoidingView, Text, View } from "react-native";
import { colors, globalStyles } from "../../theme/globalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { Alert, AlertIcon, Button, Increaser, LabelButtonIcon, Separador } from "../../components";
import { ModalInput } from "../../components/inputs/ModalInput";
import { useSettingsScreen } from "../../hooks/screens/useSettingsScreen";


export const SettingsScreen = () => {
    const {
        userAuthenticated,
        setSelectModal,
        selectModal,
        settingsState,
        changeFontSize,
        changeDevelopmentSettings,
        authState,
        handleRequestPut,
        onChange,
        logOut,
        isLoading,
        messageError,
        showErrorAlert,
        alert,
        setShowErrorAlert,
        handleRecoverPassword,
    } = useSettingsScreen();


    return (
        <View style={[globalStyles.container, { paddingTop: 20 }]} >
            <KeyboardAvoidingView>
                <ScrollView>
                    {(isLoading) ? (
                        <ActivityIndicator
                            color={colors.buttonPrimary}
                            size={80}
                            style={{ marginTop: 100 }}
                        />
                    ) : (
                        <>
                            <LabelButtonIcon
                                label="Nombre:"
                                text={userAuthenticated.nombre}
                                iconName="pencil"
                                onPress={() => setSelectModal("nombre")}
                                style={{ marginTop: 30 }}
                            />
                            <LabelButtonIcon
                                label="Apellidos:"
                                text={userAuthenticated.apellidos}
                                iconName="pencil"
                                onPress={() => setSelectModal("apellido")}
                                style={{ marginTop: 30 }}
                            />

                            <Button
                                onPress={() => handleRecoverPassword()}
                                text="Enviar correo de cambio de contraseña"
                                style={{
                                    alignSelf: "center",
                                    backgroundColor: colors.info700,
                                    marginVertical: 22
                                }}
                            />

                            {(showErrorAlert) && (
                                <AlertIcon
                                    style={{ marginTop: 100 }}
                                    text={alert.success ? alert.message : messageError}
                                    setShow={setShowErrorAlert}
                                    show={showErrorAlert}
                                    title={alert.success ? alert.title : "Error"}
                                    type={alert.success ? alert.type : "error"}
                                />
                            )}
                            <Separador />
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={[{ fontSize: settingsState.fontSize }]} >Tamaño de texto:</Text>
                                <Increaser
                                    value={settingsState.fontSize}
                                    onPressPlus={() => changeFontSize(+1)}
                                    onPressRest={() => changeFontSize(-1)}
                                />
                            </View>
                            <Separador />

                            {(settingsState.developmentSettings) && (
                                <View>
                                    <Text> {JSON.stringify(authState, null, 2)} </Text>
                                    <Text> {JSON.stringify(settingsState, null, 2)} </Text>
                                    <Button
                                        onPress={() => changeDevelopmentSettings(false)}
                                        text="Ocultar"
                                        style={{ alignSelf: "center" }}
                                    />
                                    <Separador />
                                </View>
                            )}

                            <Button
                                style={{ alignSelf: "center", marginVertical: 10 }}
                                onPress={() => setSelectModal("cerrar-sesion")}
                                text="Cerrar sesión"
                            />

                        </>
                    )}

                    <ModalInput
                        iconName="pencil"
                        onChangeText={value => onChange(value, "nombre")}
                        placeHolder={"Nombre"}
                        showModal={selectModal === "nombre"}
                        onPressCancel={() => setSelectModal("")}
                        onPressAceptar={() => {
                            setSelectModal("");
                            handleRequestPut();
                        }}

                    />

                    <ModalInput
                        iconName="pencil"
                        onChangeText={value => onChange(value, "apellidos")}
                        placeHolder={"Apellido"}
                        showModal={selectModal === "apellido"}
                        onPressCancel={() => setSelectModal("")}
                        onPressAceptar={() => {
                            setSelectModal("");
                            handleRequestPut();
                        }}
                    />

                    <Alert
                        visible={selectModal === "cerrar-sesion"}
                        onPressAccept={() => {
                            setSelectModal("");
                            logOut();
                        }}
                        onPressCancel={() => setSelectModal("")}
                        text="¿Desea cerrar sesión?"
                    />

                    <View style={{ height: 300 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
