import { View } from "react-native"

export const Separador = () => {
    return (
        <View
            style={{
                width: "100%",
                alignSelf: 'center',
                borderTopWidth: 2,
                borderColor: 'rgba(0, 0, 0, 0.5)',
                marginVertical: 30,
            }}
        />
    )
}
