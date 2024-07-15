import { Alert } from "react-native";
import { RecoverPasswordReponse } from "../../interfaces/RecoverPasswordResponse";
import { useRequestPost } from "../requests/useRequestPost";

export const useRecoverPasswordScreen = () => {
    const { 
        form, isLoading, onChange, peticionPostAlert, setIsLoading
      } = useRequestPost({ matricula: "" });
  
      const handleRequest = () => {
        peticionPostAlert({
          path: "/api/auth/forgot-password",
          body: { correo: `${form.matricula}@upt.edu.mx` },
          validateEmpty: true,
        })
        .then((result) => {
            Alert.alert("Aviso", (result as RecoverPasswordReponse).msg);
        })
        .catch(error => console.log(error))
        .finally(() => {
            setIsLoading(false);
        });
      }

      return {
        handleRequest,
        form,
        onChange,
        isLoading,
      }
}
