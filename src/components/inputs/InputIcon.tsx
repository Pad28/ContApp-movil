import { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, StyleProp, ViewStyle, TouchableOpacity, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, widthWindow } from '../../theme/globalStyles';
import { SettingsContext } from '../../context';


interface Props {
    iconName: string;
    placeholder: string;
    onChangeText: (value: string) => void;
    security?: boolean;
    style?: StyleProp<ViewStyle>
    styleText?: StyleProp<TextStyle>
    value?: string;
    publicar?: boolean;
}

export const InputIcon = (props: Props) => {
    
    const { 
        value, 
        onChangeText, 
        placeholder, 
        iconName, 
        security = false,
        publicar = false,
        style,
        styleText
    } = props;
    
    const { fontSize } = useContext(SettingsContext).settingsState;
    const [securityIcon, setSecurityIcon] = useState("eye");
    const [showSecurity, setShowSecurity] = useState(security);

    const handleSecurity = () => {
        if (securityIcon === "eye") setSecurityIcon("eye-off")
        else setSecurityIcon("eye");
        setShowSecurity(!showSecurity);
    }

    return (
        <View style={[style, localStyles.container ]} >
            <Ionicons name={iconName} size={40} />
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={showSecurity}
                style={[ localStyles.input,  { fontSize }, styleText]}
                multiline={true}
                textAlignVertical="top"
            />
            {
                (security) ? (
                    <TouchableOpacity onPress={handleSecurity}>
                        <Ionicons name={securityIcon} size={40} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )
            }
            {
                (publicar) ? (
                    <TouchableOpacity onPress={handleSecurity}>
                        <Ionicons name={"download-outline"} size={40} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )
            }
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        width: widthWindow - 80,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: colors.backgroundSecondary
    },
    input: {
        height: 50,
        width: 180,
        paddingHorizontal: 5,
        color: 'black'
    },
    icon:{
        
        alignContent: "flex-end",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    }
});
