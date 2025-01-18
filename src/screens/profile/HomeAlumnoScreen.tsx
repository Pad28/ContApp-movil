import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles, widthWindow } from "../../theme/globalStyles";
import { useContext } from "react";
import { IconButton, Target } from "../../components";
import { AuthContext, SettingsContext } from "../../context";
import { useHomeAlumnoScreen } from "../../hooks/screens/useHomeAlumnoScreen";

export const HomeAlumnoScreen = () => {
    const { authState } = useContext(AuthContext);
    const { fontSize } = useContext(SettingsContext).settingsState;
    const { getRandomMotivationalQuote, recursos, isLoading, setID, downloadAndOpenPdf } = useHomeAlumnoScreen();

    if (!authState.userAuthenticated) {
        return (
            <Text style={{ fontSize: fontSize + 12 }}>
                Error al autenticar
            </Text>
        );
    }

    return (
        <View style={globalStyles.container}>
            <Text style={[globalStyles.title, { fontSize: fontSize + 6 }]}>
                Bienvenido alumno {authState.userAuthenticated.nombre} del grupo{" "}
                {authState.userAuthenticated.id_grupo}
            </Text>
            <Text style={localStyles.quote}>
                {getRandomMotivationalQuote()}
            </Text>

            <View style={[globalStyles.container, localStyles.container]}>
                {(recursos?.results?.length! < 1) && (
                    <Text
                        style={[
                            globalStyles.title,
                            { textAlign: "center", fontSize: fontSize + 6 },
                        ]}
                    >
                        No hay publicaciones por ahora!
                    </Text>
                )}
                {isLoading ? (
                    <ActivityIndicator
                        size={100}
                        style={{ alignSelf: "center", marginTop: 100 }}
                        color={colors.buttonPrimary}
                    />
                ) : (
                    recursos && (
                        <FlatList
                            style={{ height: "100%" }}
                            data={recursos}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Target
                                    style={{ marginVertical: 10 }}
                                    description={item.contenido}
                                    footer={item.fecha_publicacion.toString().split("T")[0]}
                                    iconName="download"
                                    onPress={() => {
                                        setID(item.id_material);
                                        downloadAndOpenPdf(item.id_material);
                                    }}
                                    title={item.titulo}
                                />
                            )}
                        />
                    )
                )}
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginVertical: 50,
        height: 400,
        width: widthWindow - 50,
    },
    quote: {
        fontSize: 24,
        fontStyle: "italic",
        textAlign: "center",
        marginVertical: 40,
        marginHorizontal: 20,
        color: "#333",
    },
});
