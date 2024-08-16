import { StyleSheet, Text, View } from 'react-native';
import { globalStyles, widthWindow } from "../../theme/globalStyles";
import { useContext } from 'react';
import { AuthContext, SettingsContext } from '../../context';
import { useHomeAlumnoScreen } from '../../hooks/screens/useHomeAlumnoScreen';

export const HomeAlumnoScreen = () => {
    const { authState } = useContext(AuthContext);
    const { fontSize } = useContext(SettingsContext).settingsState;
    const { getRandomMotivationalQuote } = useHomeAlumnoScreen();

    if (!authState.userAuthenticated) {
        return (
            <Text style={{ fontSize: fontSize + 12 }} >
                Error al autenticar
            </Text>
        );
    }


    return (
        <View style={globalStyles.container}>
            <Text style={[globalStyles.title, { fontSize: fontSize + 6 }]} >
                Bienvenido {authState.userAuthenticated.nombre}
            </Text>
            <Text style={localStyles.quote} >
                {getRandomMotivationalQuote()}
            </Text>
        </View >
    );
}


const localStyles = StyleSheet.create({
    containerPdf: {
        marginVertical: 50,
        height: 400,
        width: widthWindow - 50,
    },
    quote: {
        fontSize: 24,
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 40,
        marginHorizontal: 20,
        color: '#333',
    },
});