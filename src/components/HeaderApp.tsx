import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/globalStyles";
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    height: number;
    icono?: boolean;
    titulo?: string;
    clickIcono?: () => void;
}

export const HeaderApp = ({ clickIcono, titulo, height, icono }: Props) => {
    return (
        <View
            style={{
                backgroundColor: colors.primary,
                height,
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            {
                (icono) && (
                    <TouchableOpacity style={{marginLeft:15}}
                    onPress={clickIcono}
                    >
                        <Ionicons
                            color={"white"}
                            name="chevron-back-outline"
                            size={40}

                        >

                        </Ionicons>
                    </TouchableOpacity>)
            }

            {
                (titulo) && (<Text style={localStyles.text}>
                    {titulo}
                </Text>)
            }

            <StatusBar backgroundColor={colors.primary} />
        </View>
    );
}

const localStyles = StyleSheet.create(
    {
        text: {
            fontSize: 24,
            textAlign: 'left',
            fontWeight: "bold",
            marginLeft: 15,
            color: "white"
        }
    }
)
