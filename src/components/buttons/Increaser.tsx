import { useContext, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SettingsContext } from "../../context";
import { colors } from "../../theme/globalStyles";

interface Props {
    value: number;
    onPressPlus: () => void;
    onPressRest: () => void;
}

export const Increaser = ({ value, onPressPlus, onPressRest }: Props) => {
    const { fontSize, fontSizeMax, fontSizeMin } = useContext(SettingsContext).settingsState;
    const [v, setV] = useState(value);

    const handelValue = (incremento: number) => setV(v + incremento);

    return (
        <View style={styles.container} >
            <TouchableOpacity
                style={styles.botonLeft}
                onPress={() => {
                    if (v > fontSizeMin) handelValue(-1);
                    onPressRest();
                }}
            >
                <Text style={{ fontSize, fontWeight: 'bold' }} > - </Text>
            </TouchableOpacity>

            <View>
                <Text style={[{ fontSize }, styles.value]} > {v} </Text>
            </View>

            <TouchableOpacity
                style={styles.botonRight}
                onPress={() => {
                    if (v < fontSizeMax) handelValue(1);
                    onPressPlus();
                }}
            >
                <Text style={{ fontSize, fontWeight: 'bold' }} > + </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundSecondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        width: 130
    },
    botonLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    value: {
        flex: 1,
    },
    botonRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});