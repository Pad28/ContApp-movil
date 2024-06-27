import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/globalStyles";
import React from 'react';

interface Props {
    height: number;
    logo?: boolean;
    titulo?: string;
}

export const HeaderApp = ({titulo, height, logo=false }: Props) => {
    return (
        <View 
            style={{
                backgroundColor: colors.primary,
                height,
                display : "flex"
            }}
        >
            {
            (titulo) && (<Text style ={localStyles.text}>
                {titulo}
            </Text>)
            }
            {
                (logo) && (<Image style={{height: 160, width:160, alignSelf: "center"}} source={require("../../assets/LogoSinFondo.png")}/>)
            } 
            <StatusBar backgroundColor={colors.primary} />
        </View>
    );
}

const localStyles = StyleSheet.create(
    { text:{
        fontSize: 24,
        textAlign: 'left',
        fontWeight: "bold",
        marginTop:28,
        marginLeft:15,
        color:"white"
    }}
)
