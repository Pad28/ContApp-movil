import { Text, View } from "react-native";
import { globalStyles } from "../../theme/globalStyles";
import { useRequestGet } from "../../hooks";
import { useContext, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ActividadesStackParams } from "../../navigators/stack/ActividadesStackNavigator";
import { AuthContext } from "../../context";

interface Props extends StackScreenProps<ActividadesStackParams, any> { }
export const PreguntasScreen = ({ route }: Props) => {
    const { token } = useContext(AuthContext).authState;
    const { isLoading, messageError, setIsLoading, requestGetAlert } = useRequestGet();

    useEffect(() => {
        const { params } = route;
        throw "BAD RESPONSE";
        requestGetAlert({
            path: `/api/actividad/${params!.idActividad}.`,
            config: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
            .then(res => {
                console.log(res);
            })
    }, [])

    return (
        <View style={globalStyles.container} >
            <Text>Cuestion</Text>
        </View>
    );
}

