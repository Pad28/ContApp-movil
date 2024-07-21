import { RecoverPasswordReponse } from "../../interfaces/RecoverPasswordResponse";
import { useRequestPost } from "../requests/useRequestPost";
import { useState } from "react";

export const useRecoverPasswordScreen = () => {
  const {
    form,
    isLoading,
    onChange,
    peticionPostAlert,
    setIsLoading,
    messageError,
    setShowErrorAlert,
    showErrorAlert,
    clearValues
  } = useRequestPost({ matricula: "" });

  const [alert, setAlert] = useState({
    message: "",
    title: "",
    type: "",
    response: false,
  });

  const handleRequest = () => {
    peticionPostAlert({
      path: "/api/auth/forgot-password",
      body: { correo: `${form.matricula}@upt.edu.mx` },
      validateEmpty: true,
    })
      .then((result) => {
        setIsLoading(false)
        setAlert({
          message: (result as RecoverPasswordReponse).msg,
          title: "Aviso",
          type: "info",
          response: true,
        });
        setShowErrorAlert(true);
        clearValues();
        // Alert.alert("Aviso", (result as RecoverPasswordReponse).msg);
      })
      .catch(error => {
        console.log(error);
        setAlert({
          response: false,
          message: "",
          title: "",
          type: ""
        })
      });
  }

  return {
    handleRequest,
    form,
    onChange,
    isLoading,
    messageError,
    setShowErrorAlert,
    showErrorAlert,
    alert
  }
}
