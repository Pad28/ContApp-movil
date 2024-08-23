import { AxiosRequestConfig } from 'axios';
import { useState } from 'react'
import { API } from '../../api/server';

interface RequestGetOptions {
    path: string;
    config?: AxiosRequestConfig;
    successMessage?: string;
    errorMessage?: string;
}

export const useRequestGet = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState<string>("Algo salio mal :(");

    const requestGet = async ({ path, config }: RequestGetOptions) => {
        setIsLoading(true);

        const response = await API.get(path, (config) && config)
            .catch(error => {
                if (error.response) {
                    if (error.response.data.msg) {
                        throw new Error(error.response.data.msg);
                    }
                    throw new Error(error.response.data.errors[0].msg);
                }
                if (error.request) {
                    throw new Error('Ups... ocurio un error, intentalo mas tarde');
                }
            });

        if (!response) throw 'Error response';
        return response.data;
    }

    const requestGetAlert = async (options: RequestGetOptions) => {
        const result = await requestGet(options)
            .catch(error => {
                setIsLoading(false);
                // Alert.alert("Error", (options.errorMessage) ? options.errorMessage : error.message);
                setMessageError((options.errorMessage) ? options.errorMessage : error.message);
                setShowErrorAlert(true);
            });
        return result;
    }

    return {
        messageError,
        requestGet,
        isLoading,
        setIsLoading,
        showErrorAlert,
        setShowErrorAlert,
        requestGetAlert
    }
}