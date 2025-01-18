import { useContext, useEffect, useState } from "react";
import { AuthContext, SettingsContext } from "../../context";
import { useRequestGet } from "../requests/useRequestGet";
import { GetRecursosResponse } from "../../interfaces/GetRecursosResponse";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { envs } from "../../config";
import { ToastAndroid, Platform } from "react-native";
import { Buffer } from "buffer";

export const useHomeAlumnoScreen = () => {
    const motivationalQuotes = [
        "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito. - Albert Schweitzer",
        "La única manera de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
        "No cuentes los días, haz que los días cuenten. - Muhammad Ali",
        "La vida es 10% lo que me ocurre y 90% cómo reacciono a ello. - Charles R. Swindoll",
        "La mejor manera de predecir el futuro es crearlo. - Peter Drucker",
        "No importa cuán lento vayas, siempre y cuando no te detengas. - Confucio",
        "Todo lo que puedes imaginar es real. - Pablo Picasso",
        "El único lugar donde el éxito viene antes que el trabajo es en el diccionario. - Vidal Sassoon",
        "La creatividad es la inteligencia divirtiéndose. - Albert Einstein",
        "El fracaso es el condimento que da sabor al éxito. - Truman Capote",
        "La forma de empezar es dejar de hablar y comenzar a hacer. - Walt Disney"
    ];

    const getRandomMotivationalQuote = () => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[randomIndex];
    }

    const { authState } = useContext(AuthContext);
    const { fontSize } = useContext(SettingsContext).settingsState;
    const { isLoading, requestGetAlert, setIsLoading } = useRequestGet();

    const [recursos, setRecursos] = useState<GetRecursosResponse>({ results: [] });

    const [show, setShow] = useState(false);

    const [id, setID] = useState<string>("");

    useEffect(() => {
        (async () => {
            const result = await requestGetAlert({
                path: `/api/publicacioncurso/by-group-id/${authState.userAuthenticated!.id_grupo}`,
                config: { headers: { Authorization: `Bearer ${authState.token}` } },
            });
            setRecursos(result as GetRecursosResponse);
            setIsLoading(false);
        })();
    }, []);

    const downloadAndOpenPdf = async (id_material: string) => {
        try {
            const fileUri = `${FileSystem.documentDirectory}${id_material}`;
            const url = `${envs.API_URL}/api/publicacioncurso/by-document-id/${id_material}`;
    
            // Realizar la solicitud para obtener el archivo PDF
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${authState.token}` },
            });
    
            if (!response.ok) {
                throw new Error("Error al descargar el archivo");
            }
    
            const arrayBuffer = await response.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString("base64");
    
            // Guardar el archivo en el sistema de archivos
            await FileSystem.writeAsStringAsync(fileUri, base64, {
                encoding: FileSystem.EncodingType.Base64,
            });
    
            console.log("Archivo descargado en:", fileUri);
    
            if (Platform.OS === "android" || Platform.OS === "ios") {
                const canOpen = await Sharing.isAvailableAsync();
    
                if (canOpen) {
                    await Sharing.shareAsync(fileUri, {
                        mimeType: "application/pdf",
                        UTI: "com.adobe.pdf",
                    });
                } else {
                    ToastAndroid.show(
                        "No se puede compartir el archivo en este dispositivo",
                        ToastAndroid.SHORT
                    );
                }
            } else {
                ToastAndroid.show(
                    "Plataforma no soportada para abrir el archivo.",
                    ToastAndroid.SHORT
                );
            }
        } catch (error) {
            console.error("Error durante la descarga o apertura:", error);
            ToastAndroid.show("Error al descargar o abrir el archivo", ToastAndroid.SHORT);
        }
    };
    
    

    

    return {
        fontSize,
        isLoading,
        recursos,
        show,
        setShow,
        setID,
        downloadAndOpenPdf,
        getRandomMotivationalQuote
    };
}

