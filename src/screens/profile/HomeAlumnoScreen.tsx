import { ScrollView, StyleSheet, View } from 'react-native';
import { globalStyles, widthWindow } from "../../theme/globalStyles";
import WebView from 'react-native-webview'
import { useState } from 'react';
import { Button } from '../../components';

export const HomeAlumnoScreen = () => {
    const encodedPdfUrl = encodeURIComponent("http://159.54.132.23:8080/test");
    // const encodedPdfUrl = encodeURIComponent("http://192.168.122.8/Guía de estudio-Las cuentas.pdf");
    const googleDocsView = `https://docs.google.com/gview?embedded=true&url=${encodedPdfUrl}`;

    const [verPdf, setVerPdf] = useState(false)

    return (
        <View style={globalStyles.container}>
            {/* <ScrollView> */}

            <Button
                onPress={() => setVerPdf(!verPdf)}
                text="Ver material"
                style={{ marginVertical: 20, alignSelf: "center" }}
            />

            {(verPdf) && (
                <View style={localStyles.containerPdf} >
                    <WebView
                        style={{ width: widthWindow - 50 }}
                        originWhitelist={['*']}
                        source={{ uri: googleDocsView }}
                    />
                </View>
            )}


            {/* <View style={{ height: 600 }} /> */}
            {/* </ScrollView> */}
        </View>
    );
}


const localStyles = StyleSheet.create({
    containerPdf: {
        marginVertical: 50,
        height: 400,
        width: widthWindow - 50,
    }
});