import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors, globalStyles, widthWindow } from "../../theme/globalStyles";
import { useContext } from "react";
import { SettingsContext } from "../../context";
import { Ionicons } from "@expo/vector-icons"

interface Props {
    title: string;
    description: string;
    footer: string;
    onPress: () => void;
    iconName: string;
    style?: StyleProp<ViewStyle>
}

export const Target = (props: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;
    const { description, footer, title, onPress, style, iconName } = props;

    return (
        <TouchableOpacity
            style={[localStyles.container, style]}
            onPress={onPress}
        >

            <View >
                <Text
                    style={[globalStyles.title, { fontSize: fontSize + 4 }, localStyles.text]}
                >
                    {title}
                </Text>
                <View style={localStyles.descriptionText} >
                    <Text
                        style={[{ fontSize }, localStyles.text]}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {description}
                    </Text>
                </View>
                <Text style={[localStyles.text, { fontSize }]} >
                    {footer}
                </Text>

            </View>

            <Ionicons name={iconName} size={60} color={"white"} />

        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.buttonPrimary,
        padding: 18,
        borderRadius: 30,
        width: widthWindow - 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        color: "white"
    },
    descriptionText: {
        width: "90%"
    },

});
