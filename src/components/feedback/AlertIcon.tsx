import { useContext, useEffect, useRef, useState } from "react";
import { Animated, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SettingsContext } from "../../context";
import { colors, widthWindow } from "../../theme/globalStyles";

interface Props {
    type: "error" | "success" | "warning" | "info";
    title: string;
    text: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    style?: StyleProp<ViewStyle>;
}

export const AlertIcon = ({ show, setShow, title, text, type, style }: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;
    const scaleValue = useRef(new Animated.Value(0)).current;

    const typeColors = {
        error: {
            iconColor: colors.danger,
            bodyColor: colors.error,
            iconName: "warning",
        },
        success: {
            iconColor: colors.success800,
            bodyColor: colors.success300,
            iconName: "checkmark-circle",
        },
        warning: {
            iconColor: colors.warning700,
            bodyColor: colors.warning300,
            iconName: "alert-circle",
        },
        info: {
            iconColor: colors.info700,
            bodyColor: colors.info200,
            iconName: "information-circle",
        }
    };

    const { iconColor, bodyColor, iconName } = typeColors[type];
    Animated.timing(scaleValue, {
        toValue: show ? 1 : 0,
        duration: 120,
        useNativeDriver: true
    }).start();

    const handleOnPressClose = () => {
        setShow(false);
    }

    return (
        <Animated.View
            style={[
                localStyles.container,
                {
                    transform: [{ scale: scaleValue }],
                    backgroundColor: bodyColor,
                },
                style,
            ]}
        >
            <View style={localStyles.header} >
                <Ionicons name={iconName} size={32} color={iconColor} />
                <Text style={[localStyles.title, { fontSize: fontSize }]} > {title} </Text>
                <TouchableOpacity style={localStyles.closeButton} onPress={handleOnPressClose} >
                    <Ionicons name="close" size={32} color={"black"} />
                </TouchableOpacity>
            </View>
            <View style={{ height: "auto" }} >
                <Text style={{ fontSize: fontSize - 2 }} >
                    {text}
                </Text>
            </View>
        </Animated.View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: widthWindow - 100,
        // height: "auto",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 8,
        borderRadius: 10,
        padding: 16,
        elevation: 12,

        position: "absolute",
        top: 10,
        zIndex: 9999,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontWeight: "bold",
    },
    closeButton: {
        width: "56%",
        justifyContent: "flex-end",
        flexDirection: "row",
    }
});

