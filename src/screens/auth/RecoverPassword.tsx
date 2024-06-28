import { StackScreenProps } from "@react-navigation/stack";
import { RootLoginStackParams } from "../../navigators/StackNavigator";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { HeaderApp } from "../../components/HeaderApp";
import React from "react-native"
import { colors, globalStyles } from "../../theme/globalStyles";
import { InputIcon } from "../../components/InputIcon";
import { Button } from "../../components/buttons/Button";

interface Props extends StackScreenProps<RootLoginStackParams, any> {
}

export const RecoverPassword = ({navigation}: Props)=>{
    return(
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >
                        

                            <Text>
                            Por favor, ingresa la información que se solicita:

                            </Text>

                            <InputIcon 
                                style={{ alignSelf: "center", backgroundColor: 'white', marginTop: 20 }}
                                onChangeText={() => { }}
                                placeholder="Ingresa tu matricula"
                                iconName="person"
                                />

                            
                            <Button
                                style={{ width: 140, alignSelf: "center", marginTop: 30 }}
                                text="Comprobar"
                                colorBackground={colors.buttonPrimary}
                                fontColor="white"
                                altura={60}
                                onPress={() => {navigation.navigate('Login') }}
                            />

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>


    );
}






0