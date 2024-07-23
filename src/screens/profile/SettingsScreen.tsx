import { KeyboardAvoidingView, Text, View, ScrollView } from "react-native";
import { globalStyles } from "../../theme/globalStyles";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
//import { ScrollView } from "react-native-gesture-handler";
import { Alert, Button, InputIcon } from "../../components";

export const SettingsScreen = () => {
    const { logOut } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState(false);

    return (
        <View style={globalStyles.container} >
            <KeyboardAvoidingView>
                <ScrollView>

                    <Text style={{margin:15, fontSize:20, alignSelf:'center'}}>
                        Pantalla de ajustes
                    </Text>
                    <Text style={{margin:15, fontSize:20, alignSelf:'center'}}>
                        ¡Modificar datos!
                    </Text>
                        
                    <InputIcon
                        style={{ alignSelf: "center", backgroundColor: 'white', marginTop: 20 }}
                        onChangeText={() => { }}
                        placeholder="MATRÍCULA"
                        iconName="person"
                    />

                    <Button 
                        style={{ alignSelf: "center", marginVertical: 10 }}
                        onPress={() => setShowAlert(true)}
                        text="Cerrar sesión"
                    />

                    <Alert 
                        visible={showAlert}
                        onPressAccept={() => {
                            setShowAlert(false);
                            logOut();
                        }}
                        onPressCancel={() => setShowAlert(false)}
                        text="¿Desea cerrar sesión?"
                    />

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
