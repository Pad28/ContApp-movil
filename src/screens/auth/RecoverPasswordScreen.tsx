import { ActivityIndicator, KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { colors, globalStyles } from "../../theme/globalStyles";
import { useContext } from "react";
import { SettingsContext } from "../../context";
import { AlertIcon, Button, InputIcon } from "../../components";
import { useRecoverPasswordScreen } from "../../hooks";

export const RecoverPasswordScreen = () => {
    const { fontSize } = useContext(SettingsContext).settingsState;
    const {
        handleRequest,
        isLoading,
        onChange,
        messageError,
        setShowErrorAlert,
        showErrorAlert,
        alert
    } = useRecoverPasswordScreen();

    if (isLoading) {
        return (
            <View style={[globalStyles.container, { justifyContent: "center" }]} >
                <ActivityIndicator size={100} color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={[globalStyles.container]}>
            <KeyboardAvoidingView>
                <ScrollView>

                    <Text style={{ margin: 20, fontSize }}>
                        Por favor, ingresa la información que se solicita:
                    </Text>
                    <InputIcon
                        iconName="person"
                        onChangeText={value => onChange(value, "matricula")}
                        placeholder="Matricula"
                        style={{ alignSelf: "center", marginVertical: 30 }}
                    />

                    <AlertIcon
                        style={{ top: 200 }}
                        setShow={setShowErrorAlert}
                        text={alert.response ? alert.message : messageError}
                        title={alert.response ? alert.title : "Error"}
                        type={alert.response ? "info" : "error"}
                        show={showErrorAlert}
                    />

                    <Button
                        onPress={handleRequest}
                        text="Recuperar"
                        style={{ alignSelf: "center", marginTop: 120 }}
                    />

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}