import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { AlertIcon, Button, IconButton, InputIcon, LinkButton } from "../../components";
import { colors, globalStyles } from "../../theme/globalStyles";
import { StackScreenProps } from "@react-navigation/stack";
import { RootLoginStackParams } from "../../navigators";
import { useLoginScreen } from "../../hooks";

interface Props extends StackScreenProps<RootLoginStackParams, any> { }
export const LoginScreen = ({ navigation }: Props) => {
  const {
    handleRequest,
    isLoading,
    onChange,
    authenticate,
    authState,
    isLoadingCheckUser,
    setShowErrorAlert,
    showErrorAlert,
    messageError
  } = useLoginScreen();

  if (isLoading || isLoadingCheckUser) {
    return (
      <View style={[globalStyles.container, { justifyContent: "center" }]} >
        <ActivityIndicator size={100} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container]} >
      <KeyboardAvoidingView>
        <ScrollView>

          <AlertIcon
            setShow={setShowErrorAlert}
            show={showErrorAlert}
            title="Error"
            type="error"
            text={messageError}
          />
          <Image
            style={{
              height: 160,
              width: 160,
              alignSelf: "center",
              marginTop: 22
            }}
            source={require("../../../assets/LogoSinFondo.png")}
          />

          <InputIcon
            style={{ marginTop: 30 }}
            iconName="person"
            onChangeText={(value) => onChange(value, "matricula")}
            placeholder="Matricula"
          />

          <InputIcon
            security
            style={{ marginTop: 42 }}
            iconName="lock-closed"
            onChangeText={(value) => onChange(value, "password")}
            placeholder="Contraseña"
          />

          <LinkButton
            style={{ alignSelf: "center", marginTop: 14 }}
            onPress={() => navigation.navigate("RecoverPasswordScreen")}
            text="¿Olvidate tu contraseña?"
          />

          <Button
            style={{
              alignSelf: "center",
              marginTop: 20,
            }}
            onPress={handleRequest}
            text="Ingresar"
          />

          {(authState.fingerPrintAuth) && (
            <IconButton
              iconName="finger-print"
              onPress={authenticate}
              style={{ alignSelf: "center", marginTop: 20 }}
            />
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
