import { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, StyleProp, ViewStyle, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { widthWindow } from '../theme/globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props {
    click?: ()=> void;
    margenAbajo?: number;
    style?: StyleProp<ViewStyle>;
    text: string
    
}

export const Link = ({text, click, margenAbajo, style }: Props) => {
    
    
    return (
        <View style={[style, localStyles.container, {marginBottom: margenAbajo}]} >
            <TouchableOpacity onPress={click} 
                
            >
                <Text style={localStyles.text}>
                {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
        //width: widthWindow - 60,
        
        
    },
    input: {
        height: 50,
        width: 200,
        paddingHorizontal: 6,
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#004aad',
        textDecorationLine: 'underline'
    }
});
