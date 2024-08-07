import { Ionicons } from "@expo/vector-icons";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

import { useContext } from "react";

import { colors, widthWindow } from "../../theme/globalStyles";
import { SettingsContext } from "../../context";

interface Props {
    style?: StyleProp<ViewStyle>;
    text: string;
    onPress: () => void;
    iconName: string;
    label: string;
}

export const ButtonIcon = ({ style, onPress, text, iconName, label }: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;

    return (
        <View style={[styles.container, style]} >
            <View style={styles.constinerLabel} >
                <Text style={{ ...styles.label, fontSize: fontSize  }} > {label} </Text>
            </View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.boton}
            >
                <View style={{...styles.columnBoton, justifyContent: 'flex-start'}} >
                    <Text style={{ ...styles.text, fontSize: fontSize }} > {text} </Text>
                </View>
                <View style={{...styles.columnBoton, justifyContent: 'flex-end'}} >
                    <Ionicons style={{color:"white"}} name={iconName} size={28} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthWindow - 40,
        justifyContent: 'space-between',
    },
    boton: {
        flexDirection: 'row',
        backgroundColor: colors.buttonPrimary,
        width: 210,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 6,
        height: 'auto',
    },
    columnBoton: {
        width: '50%',
        flexDirection: 'row',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: "right"
    },
    label: {
        fontWeight: 'bold',
    },
    constinerLabel: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
