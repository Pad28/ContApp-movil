import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, globalStyles } from "../../theme/globalStyles";
import { useContext, useEffect, useState } from "react";
import { AuthContext, SettingsContext } from "../../context";
import { Target } from "../../components";
import { useRequestGet } from "../../hooks";
import { GetActividadesResponse } from "../../interfaces/GetActividadesResponse";
import { FlatList } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { ActividadesStackParams } from "../../navigators/stack/ActividadesStackNavigator";


interface Props extends StackScreenProps<ActividadesStackParams, any> { }
export const ActividadesAlumnoScreen = ({ navigation }: Props) => {
    const [modal, setModal] = useState(false);
    const { fontSize } = useContext(SettingsContext).settingsState;
    const { userAuthenticated, token } = useContext(AuthContext).authState;
    const [results, setResults] = useState<GetActividadesResponse>();

    const {
        setIsLoading,
        isLoading,
        messageError,
        requestGet,
        requestGetAlert
    } = useRequestGet();

    const handleRquest = async () => {
        requestGet({
            path: "/api/actividad",
            config: {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        })
            .then(res => {
                setResults(res as GetActividadesResponse);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    useEffect(() => {
        handleRquest();
    }, []);

    return (
        <View style={globalStyles.container} >
            <KeyboardAvoidingView>
                {(isLoading) ? (
                    <ActivityIndicator
                        size={80}
                        color={colors.buttonPrimary}
                        style={{ marginTop: 100 }}
                    />
                ) : (
                    <View>
                        <Text style={[globalStyles.title, { alignSelf: "center", fontSize: fontSize + 6 }]}>
                            Actividades
                        </Text>
                        {(!results) ? (
                            <Text style={{ margin: 15, fontSize: 20, alignSelf: 'center' }}>
                                No tienes actividades Pendientes! :D
                            </Text>
                        ) : (
                            <FlatList
                                style={{ height: "100%" }}
                                keyExtractor={item => item.id}
                                data={results?.results}
                                renderItem={({ item }) => (
                                    <Target
                                        style={{ backgroundColor: colors.info700, marginVertical: 10 }}
                                        description="Fecha de entrega"
                                        footer={item.fecha_limite.toString().split('T')[0]}
                                        iconName="pencil"
                                        onPress={() => navigation.navigate("PreguntasScreen", { idActividad: item.id })}
                                        title={item.nombre}
                                    />
                                )}
                            />
                        )}

                        <View style={{ height: 100 }} />
                    </View>
                )}



            </KeyboardAvoidingView>
        </View>
    );
}

const localStyles = StyleSheet.create({
    botonContaier: {
        backgroundColor: colors.buttonPrimary,
        width: 260,
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 12,
        alignSelf: "center",
    },
    botonText: {
        color: "white"
    }
});