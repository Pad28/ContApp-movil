
import { useContext, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { SettingsContext } from '../context';

interface Props {
    texto: string;
    values: {label: string, value: string}[];
    getValue?: (value: ItemType<string>) => void;
    style?: StyleProp<ViewStyle>;
    ancho: number;
}

export const DropBox = ({ ancho, getValue, texto, values, style}: Props) => {
    const { settingsState } = useContext(SettingsContext);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(values);

    return (
      <View style={[styles.container, style]} >
        <Text style={[styles.texto, {fontSize: settingsState.fontSize}]} > {texto} </Text>
        <DropDownPicker 
            items={items}
            value={value}
            open={open}
            setOpen={setOpen}
            setValue={setValue}
            style={{
                width: ancho
            }}
            containerStyle={{
              width: ancho
            }}
            onSelectItem={getValue}
            language="ES"
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    texto: {
      fontWeight: 'bold',
      marginRight: 14,
    }
});