import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../../theme/globalStyles";

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    iconSize?: number
}

export const IconButton = ({ iconName, onPress, style, iconSize = 50 }: Props) => {
    return (
        <TouchableOpacity
            style={[localStyles.container, style]}
            onPress={onPress}
        >
            <Ionicons name={iconName} size={iconSize} color={"white"} />
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.buttonPrimary,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 100,
        height: 100
    }
});
