import { useContext, useEffect, useState } from "react";
import { useRequestPost } from "../requests/useRequestPost";
import { AuthContext } from "../../context/authContext/AuthContext";
import { UserAuthenticated } from "../../interfaces/UserAuthenticated";
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from "react-native";


export const useLoginScreen = () => {
  const { logIn, authState, isLoadingCheckUser } = useContext(AuthContext);
  const [fingerPrint, setFingerPrint] = useState(false);
  const {
    form,
    isLoading,
    onChange,
    peticionPostAlert,
    setIsLoading,
    showErrorAlert,
    setShowErrorAlert,
    messageError,
    clearValues
  } = useRequestPost({ matricula: "", password: "" });

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      // if(!hasHardware) return Alert.alert("Aviso", "Sensor de huella no disponible");
      const isEnroled = await LocalAuthentication.isEnrolledAsync();
      // if(!isEnroled) return Alert.alert("Aviso", "No hay huellas registradas");
      if (!hasHardware || !isEnroled) return;
      setFingerPrint(true);
    })();
  }, []);

  const handleRequest = () => {
    peticionPostAlert({
      path: "/api/auth/alumno",
      body: form,
      validateEmpty: true,
    })
      .then(result => {
        const { user, token } = (result as UserAuthenticated);
        logIn(user, token);
      })
      .catch(error => console.log(error))
      .finally(clearValues);
  }

  const authenticate = async () => {
    setIsLoading(true);
    if (!fingerPrint) {
      setIsLoading(false);
      return Alert.alert("Error", "Autenticación por huella no disponible")
    };
    const result = await LocalAuthentication.authenticateAsync();
    if (!result.success || !authState.token) {
      setIsLoading(false);
      return Alert.alert("Error", "Error al autenticar");
    }

    peticionPostAlert({
      path: "/api/auth/renew-token",
      body: {},
      validateEmpty: false,
      config: { headers: { 'Authorization': `Bearer ${authState.token}` } },
    })
      .then(response => {
        const { user, token } = response as UserAuthenticated;
        logIn(user, token);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return {
    isLoadingCheckUser,
    authState,
    authenticate,
    isLoading,
    onChange,
    handleRequest,
    fingerPrint,
    showErrorAlert,
    setShowErrorAlert,
    messageError
  }
}
