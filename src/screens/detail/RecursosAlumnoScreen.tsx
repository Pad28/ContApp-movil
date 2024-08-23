import { ActivityIndicator, FlatList, Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles, heightWindow, widthWindow } from "../../theme/globalStyles";
import { IconButton, Target } from "../../components";
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useRecursosAlumnosScreen } from "../../hooks/screens/useRecursosAlumnosScreen";

export const RecursosAlumnoScreen = () => {
    const {
        fontSize,
        handleRequestPDf,
        image,
        isLoading,
        isLoadingPdf,
        recursos,
        setShow,
        show,
        page,
        setPage,
        id,
        setID
    } = useRecursosAlumnosScreen();

    return (
        <View style={[globalStyles.container, localStyles.container]} >
            {/* <ScrollView
                style={{ width: "100%" }}
                maximumZoomScale={5}
                minimumZoomScale={1}
            > */}
            <View>
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
                                iconName="document"
                                onPress={() => {
                                    setShow(true);
                                    handleRequestPDf(item.id_material);
                                    setID(item.id_material);
                                }}
                                title={item.titulo}
                            />
                        )}
                    />
                ))}
            </View>

            <View style={{ height: 200 }} />
            {/* </ScrollView> */}
            <Modal
                transparent
                visible={show}
                animationType="slide"
            >
                <View style={localStyles.pdfContainer} >
                    <View style={{ justifyContent: "flex-end", width: "100%", paddingHorizontal: 20 }} >
                        <IconButton
                            iconSize={18}
                            onPress={() => {
                                setShow(false);
                                setPage(1);
                            }}
                            iconName="close"
                            style={{ borderRadius: 30, height: 50, width: 50 }}
                        />
                    </View>
                    <View style={{ flex: 1, width: "96%" }} >
                        {(isLoadingPdf) ? (
                            <ActivityIndicator
                                style={{ marginTop: 160 }}
                                size={100}
                                color={colors.primary}
                            />
                        ) : (
                            <>
                                <ReactNativeZoomableView
                                    maxZoom={3}
                                    minZoom={1}
                                    zoomStep={0.5}
                                    initialZoom={1}
                                    bindToBorders={true}
                                    style={{
                                        width: "100%",
                                        height: "100%"
                                    }}
                                >
                                    <Image
                                        source={{ uri: image }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </ReactNativeZoomableView>

                                <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
                                    <IconButton
                                        style={{ width: 120, height: 80 }}
                                        onPress={() => setPage(page - 1)}
                                        iconName="chevron-back"
                                    />

                                    <IconButton
                                        style={{ width: 120, height: 80 }}
                                        onPress={() => setPage(page + 1)}
                                        iconName="chevron-forward"
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    pdfContainer: {
        width: widthWindow - 20,
        height: heightWindow - 80,
        backgroundColor: colors.backgroundSecondary,
        alignSelf: "center",
        marginTop: 50,
        borderRadius: 20,
        alignItems: "center",
        paddingVertical: 20,
    },
});
