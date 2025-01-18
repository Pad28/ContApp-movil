import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "../../theme/globalStyles";
import { IconButton, Target } from "../../components";
import { useRecursosAlumnosScreen } from "../../hooks/screens/useRecursosAlumnosScreen";

export const RecursosAlumnoScreen = () => {
    const {
        fontSize,
        isLoading,
        recursos,
        setID,
        downloadAndOpenPdf
    } = useRecursosAlumnosScreen();

    return (
        <View style={[globalStyles.container, localStyles.container]}>
            {(recursos?.results.length! < 1) && (
                <Text
                    style={[globalStyles.title, { textAlign: "center", fontSize: fontSize + 6 }]}
                >
                    No hay publicaciones por ahora!
                </Text>
            )}
            {(isLoading) ? (
                <ActivityIndicator
                    size={100}
                    style={{ alignSelf: "center", marginTop: 100 }}
                    color={colors.buttonPrimary}
                />
            ) : ((recursos) && (
                <FlatList
                    style={{ height: "100%" }}
                    data={recursos.results}
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
            ))}
        </View>
    );
};

const localStyles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
});
