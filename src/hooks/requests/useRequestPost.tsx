import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useForm } from "../utils/useForm";
import { API } from "../../api/server";

interface peticionPostOptions {
    path: string;
    body: Object;
    validateEmpty: boolean;
    config?: AxiosRequestConfig;
    successMessage?: string;
    errorMessage?: string;
}

export const useRequestPost = <T extends Object>(initState: T) => {
    const [isLoading, setIsLoading] = useState(false);
    const { form, onChange, validateEmptyFields, clearValues } = useForm(initState);

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState<string>("Algo salio mal :(");

    const peticionPost = async (options: peticionPostOptions) => {
        const { path, body, validateEmpty, config } = options;

        setIsLoading(true);
        if (validateEmpty) validateEmptyFields('Completa todos los campos');
        const response = await API.post(path, body, config)
            .catch(error => {
                if (error.response) {
                    if (error.response.data.error) throw new Error(error.response.data.error);
                    throw new Error(error.response.data.errors[0].msg);
                }

                if (error.request) {
                    throw new Error('Ups... ocurrio un error, intentalo mas tarde.');
                }
            });
        if (!response) return 'Error en la peticion';
        return response.data;
    }

    const peticionPostAlert = async (options: peticionPostOptions) => {
        const result = await peticionPost(options)
            .catch(error => {
                setIsLoading(false);
                // Alert.alert("Error", (options.errorMessage) ? options.errorMessage : error.message);
                setMessageError((options.errorMessage) ? options.errorMessage : error.message);
                setShowErrorAlert(true);
            });
        return result;
    }

    return {
        form,
        onChange,
        clearValues,
        isLoading,
        setIsLoading,
        peticionPost,
        peticionPostAlert,
        showErrorAlert,
        setShowErrorAlert,
        messageError
    }
}