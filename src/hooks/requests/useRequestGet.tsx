import { AxiosRequestConfig } from 'axios';
import { useState } from 'react'
import { API } from '../../api/server';

export const usePeticionGet = () => {
    const [ isLoading, setisLoading ] = useState(false);

    const peticion = async(path: string, config?: AxiosRequestConfig) => {
        setisLoading(true);

        const response = await API.get(path, (config) && config)
            .catch(error => {
                if(error.response) {
                    if(error.response.data.msg) {
                        throw new Error(error.response.data.msg);
                    }
                    throw new Error(error.response.data.errors[0].msg);                    
                }
                if(error.request) {
                    throw new Error('Ups... ocurio un error, intentalo mas tarde');
                }
            });
            
        if(!response) throw 'Error response';
        return response.data;
    }

    return {
        peticion,
        isLoading,
        setisLoading
    }
}