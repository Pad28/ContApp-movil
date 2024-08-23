import { useContext, useEffect, useState } from "react";
import { AuthContext, SettingsContext } from "../../context";
import { useRequestGet } from "../requests/useRequestGet";
import { GetRecursosResponse } from "../../interfaces/GetRecursosResponse";
import * as FileSystem from 'expo-file-system';
import { envs } from "../../config";
import { ToastAndroid } from "react-native";


export const useRecursosAlumnosScreen = () => {
    const { authState } = useContext(AuthContext);
    const { fontSize } = useContext(SettingsContext).settingsState;
    const { isLoading, requestGetAlert, setIsLoading } = useRequestGet();

    const [recursos, setRecursos] = useState<GetRecursosResponse>();
    const [show, setShow] = useState(false);
    const [isLoadingPdf, setIsloadingPdf] = useState(false);

    const [image, setImage] = useState<string>();
    const [id, setID] = useState<string>("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {

            const result = await requestGetAlert({
                path: `/api/publicacion/by-group-id/${authState.userAuthenticated!.id_grupo}`,
                config: { headers: { Authorization: `Bearer ${authState.token}` } }
            })
            setRecursos(result as GetRecursosResponse);
            setIsLoading(false);
        })();
    }, [])

    useEffect(() => {
        handleRequestPDf(id);
    }, [page])


    const handleRequestPDf = async (id_material: string) => {
        try {
            setIsloadingPdf(true);
            const url = `${envs.API_URL}/api/publicacion/document-to-image/${id_material}/${page}`;
            const fileUri = FileSystem.documentDirectory + 'image.jpg';
            await FileSystem.deleteAsync(fileUri, { idempotent: true });
            const { uri, status } = await FileSystem.downloadAsync(url, fileUri, {
                headers: { "Authorization": `Bearer ${authState.token!}` },
            })

            if (status >= 400) {
                (page < 1) ? setPage(1) : setPage(page - 1);

                ToastAndroid.show("No hay mas paginas disponibles", ToastAndroid.SHORT);
                setIsloadingPdf(false);
                return;
            }

            setImage(uri + '?time=' + new Date().getTime());
            setIsloadingPdf(false);
        } catch (error) {
            console.log(error);

        }
    }

    return {
        handleRequestPDf,
        fontSize,
        isLoading,
        recursos,
        show,
        setShow,
        isLoadingPdf,
        image,
        page,
        setPage,
        id,
        setID,
    }

}
