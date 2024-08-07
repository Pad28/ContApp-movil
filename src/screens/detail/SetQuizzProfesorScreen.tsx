import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "../../theme/globalStyles";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootLoginStackParams } from "../../navigators";
import { Button, IconButton } from "../../components";
import { RootAvancesStackParams } from "../../navigators/stack/AvancesAlumnosStackNavigator";
import { Switche } from "../../components/Switch";
import { RootQuizzStackParams } from "../../navigators/stack/SetQuizzProfesoresStackNavigator";

interface Props extends StackScreenProps<RootQuizzStackParams, any> { }

export const SetQuizzProfesor = ({ navigation }: Props) => {
    const [modal, setModal] = useState(false);
    const [switche, setSwitch] = useState(true);
    return (
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >

                        

                        <View style={{ flexDirection: "row", width:350, marginTop:20 }}>
                            <Text style={{ width:200, margin: 15, fontSize: 18, alignSelf: 'flex-start', textAlign:"left"}}>
                                Quizz 1......
                            </Text>
                            <View style={{ alignItems:"flex-end"}}>
                            <IconButton
                                style={{backgroundColor: colors.buttonPrimary , padding:0, width: 50, height:50}}
                                iconName="pencil"
                                onPress={() => {navigation.navigate("ResultadoAvance")}}
                                tamaño={40}
                            />
                            </View>
                            <Switche
                                onValueChange={setSwitch}
                                value={switche}
                                style={{alignContent:"center", alignItems:"center", alignSelf:"center" }}
                            />
                            

                        </View>




                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 160,
        borderRadius: 30,
        alignSelf: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'blue',
        width: 100,
        height: 70
    },
    buttonInclusivo: {
        backgroundColor: 'red',
        width: 180,
        height: 120
    },
    textStyleBienvenido: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 4,
        borderColor: "black",
        borderRadius: 12,
        backgroundColor: "white",
        padding: 5
    },
    textStyle: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        fontStyle: "italic"
    },
    textStyle2: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'justify',
        fontSize: 20,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        fontStyle: "italic"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})




