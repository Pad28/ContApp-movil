import { ScrollView, Text, View } from 'react-native';
import { globalStyles } from "../../theme/globalStyles";
import Pdf from 'react-native-pdf';

export const HomeAlumnoScreen = () => {
    const pdfResource = { uri: 'http://192.168.100.49:8080/test', cache: true };

    return (
        <View style={globalStyles.container}>
            <ScrollView>
                <Text style={{ fontWeight: "bold", fontSize: 20 }} >En construcción :/</Text>
                {/* <Pdf
                    source={pdfResource}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onError={(error) => {
                        console.error(error);
                    }}
                    style={{ flex: 1 }}
                /> */}
                {/* <WebView
                    style={{ height: 600, width: '100%' }}
                    source={{ uri: pdfResource.uri }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    renderLoading={() => <Text>Loading...</Text>}
                /> */}
            </ScrollView>
        </View>
    );
}
