import { useContext, useState } from "react";
import { AuthContext, SettingsContext } from "../../context";
import { useRequestPut } from "../requests/useRequestPut";
import { useRequestPost } from "../requests/useRequestPost";
import { ResponseUpdateAlumno } from "../../interfaces/ResponseUpdateAlumno";
import { User } from "../../interfaces/UserAuthenticated";

type selectModalOptions =
    | ""
    | "nombre"
    | "apellido"
    | "cerrar-sesion";

export const useSettingsScreen = () => {
    const { logOut, authState, logIn } = useContext(AuthContext);
    const { settingsState, changeFontSize, changeDevelopmentSettings } = useContext(SettingsContext);
    const { userAuthenticated = {} as User, token = "" } = authState;
    const [selectModal, setSelectModal] = useState<selectModalOptions>("");

    const [alert, setAlert] = useState<{
        message: string,
        title: string,
        type: "success" | "error" | "info" | "warning",
        success: boolean,

    }>({
        message: "",
        title: "",
        type: "error",
        success: false,
    });

    const {
        requestPut,
        onChange,
        form,
        isLoading,
        clearValues,
        messageError,
        showErrorAlert,
        setShowErrorAlert,
        setMessageError,
        setIsLoading,
    } = useRequestPut({ nombre: "", apellidos: "" });

    const {
        isLoading: isloadingPassword,
        setIsLoading: setIsLoadingPassword,
        form: formPassword,
        peticionPostAlert,
        messageError: passwordMessageError,
        showErrorAlert: showPasswordErrorAlert,
        setShowErrorAlert: setShowPasswordErrortAlert,
    } = useRequestPost({ correo: userAuthenticated.correo });

    const handleRequestPut = async () => {
        const response = await requestPut({
            path: `/api/user/alumno/${userAuthenticated.matricula}`,
            body: form,
            validateEmpty: false,
            config: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        if (!response || !response.data) {
            setAlert({ message: "", success: false, title: "", type: "error" });
            return;
        };

        const data = response.data as ResponseUpdateAlumno;
        logIn(data, token);
        clearValues();
        setAlert({
            message: "Cambios realizados con exito!",
            success: true,
            title: "Aviso",
            type: "success"
        })
        setShowErrorAlert(true);
    }

    const handleRecoverPassword = async () => {
        setIsLoading(true);
        const result = await peticionPostAlert({
            body: formPassword,
            path: "/api/auth/forgot-password",
            validateEmpty: false,
        })
            .finally(() => {
                setIsLoading(false);
            });
        if (!result) {
            setMessageError("Ups... ocurrio un error intentalo mas tarde");
            setAlert({
                message: "",
                success: false,
                title: "",
                type: "error"
            });
        } else {
            setAlert({
                message: result.msg,
                success: true,
                title: "Aviso",
                type: "info",
            })
        }
        setShowErrorAlert(true);
    }

    return {
        alert,
        logOut,
        authState,
        settingsState,
        userAuthenticated,
        token,
        handleRequestPut,
        selectModal,
        setSelectModal,
        onChange,
        changeFontSize,
        changeDevelopmentSettings,
        isLoading,
        messageError,
        showErrorAlert,
        clearValues,
        setShowErrorAlert,
        isloadingPassword,
        setIsLoadingPassword,
        formPassword,
        handleRecoverPassword,
    }
}

