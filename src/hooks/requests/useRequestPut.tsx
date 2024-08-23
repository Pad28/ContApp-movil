import { AxiosError, AxiosRequestConfig } from "axios";
import { useForm } from "../utils/useForm";
import { useState } from "react";
import { API } from "../../api/server";

interface requestPutOptions {
    path: string;
    body: Object;
    validateEmpty: boolean;
    config?: AxiosRequestConfig;
    succesMessage?: string;
    errorMessage?: string;
}

export const useRequestPut = <T extends Object>(initState: T) => {
    const [isLoading, setIsLoading] = useState(false);
    const { clearValues, form, onChange, validateEmptyFields } = useForm(initState);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState<string>("Algo salio mal :(");

    const requestPut = async (options: requestPutOptions) => {
        const { body, path, validateEmpty, config } = options;

        setIsLoading(true);
        if (validateEmpty) validateEmptyFields("Completa todos los campos");
        const response = await API.put(path, body, config)
            .catch(error => {

                if (error.response && error.response.data.error) {
                    setMessageError(error.response.data.error)
                } else {
                    setMessageError("Ups... ocurrio un error, intentalo mas tarde.");
                }
                setShowErrorAlert(true);
            })
            .finally(() => setIsLoading(false));

        return response;
    }

    return {
        isLoading,
        setIsLoading,
        form,
        onChange,
        clearValues,
        messageError,
        showErrorAlert,
        setShowErrorAlert,
        requestPut,
        setMessageError,
    }
}

