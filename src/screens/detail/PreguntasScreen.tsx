import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { colors, globalStyles } from "../../theme/globalStyles";
import { useRequestGet, useRequestPost } from "../../hooks";
import { StackScreenProps } from "@react-navigation/stack";
import { ActividadesStackParams } from "../../navigators/stack/ActividadesStackNavigator";
import { AuthContext } from "../../context";

interface Props extends StackScreenProps<ActividadesStackParams, "PreguntasScreen"> {}

interface Respuesta {
  id: string;
  respuesta: string;
  esCorrecta: boolean;
}

interface Pregunta {
  id: string;
  pregunta: string;
  respuestas: Respuesta[];
  tipo: "abierta" | "opcion_multiple" | "verdadero_falso";
}

export const PreguntasScreen = ({ route }: Props) => {
  const { token } = useContext(AuthContext).authState;
  const { peticionPost } = useRequestPost({});
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizEnviado, setIsQuizEnviado] = useState(false);
  const { requestGetAlert } = useRequestGet();
  const [fechaLimite, setFechaLimite] = useState<Date | null>(null);

  useEffect(() => {
    const fetchPreguntas = async () => {
      setIsLoading(true);
      try {
        const res = await requestGetAlert({
          path: `/api/actividad/${route.params.idActividad}`,
          config: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        const fetchedPreguntas =
          res.fk_pregunta?.map((pregunta: any) => {
            let tipo: "abierta" | "opcion_multiple" | "verdadero_falso" = "abierta";
            if (pregunta.fk_respuesta?.length === 2) tipo = "verdadero_falso";
            else if (pregunta.fk_respuesta?.length === 4) tipo = "opcion_multiple";

            return {
              id: pregunta.id,
              pregunta: pregunta.pregunta,
              respuestas: pregunta.fk_respuesta?.map((resp: any) => ({
                id: resp.id,
                respuesta: resp.respuesta,
                esCorrecta: !!resp.esCorrecta,
              })) || [],
              tipo,
            };
          }) || [];

        setPreguntas(fetchedPreguntas);

        setFechaLimite(new Date(route.params.fechaLimite));
      } catch (error) {
        console.error("Error fetching preguntas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreguntas();
  }, [route.params.idActividad, token]);

  const handleRespuestaSeleccionada = (preguntaId: string, respuestaId: string) => {
    setRespuestasSeleccionadas({
      ...respuestasSeleccionadas,
      [preguntaId]: respuestaId,
    });
  };

  const validarRespuestas = async () => {
    // Verificar si el quiz ya ha sido enviado
    if (isQuizEnviado) {
      Alert.alert("Ya enviaste el quiz", "No puedes enviar el quiz más de una vez.");
      return;
    }

    // Validar si la fecha límite ya pasó
    if (fechaLimite && new Date() > fechaLimite) {
      Alert.alert("Fecha límite alcanzada", "La fecha límite para enviar el quiz ha pasado.");
      return;
    }

    let correctas = 0;
  
    // Validar las respuestas seleccionadas
    preguntas.forEach((pregunta) => {
      const seleccionada = respuestasSeleccionadas[pregunta.id];
      if (seleccionada) {
        const esCorrecta = pregunta.respuestas.find((r) => r.id === seleccionada)?.esCorrecta;
        if (esCorrecta) correctas++;
      }
    });
  
    console.log(`Respuestas correctas: ${correctas} de ${preguntas.length}`);
  
    const calificacion = preguntas.length > 0 ? Math.round((correctas / preguntas.length) * 10) : 0;
    console.log("Calificación:", calificacion);
  
    // Verificar si todas las preguntas fueron contestadas
    const todasContestadas = preguntas.every((pregunta) =>
      pregunta.tipo === "abierta" ? true : respuestasSeleccionadas[pregunta.id] !== undefined
    );
  
    if (!todasContestadas) {
      Alert.alert("Faltan respuestas", "Por favor, conteste todas las preguntas antes de enviar el quiz.");
      return;
    }

    try {
      const respuesta = await peticionPost({
        path: "/api/actividad-contestada/",
        body: {
          id_actividad: route.params.idActividad,
          fecha: new Date().toISOString(),
          id_alumno: "ID_DEL_ALUMNO",
          respuestas: respuestasSeleccionadas,
          calificacion,  
        },
        validateEmpty: false,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      console.log("Actividad contestada con éxito:", respuesta);
      setIsQuizEnviado(true);  
      Alert.alert("Quiz enviado", `¡Gracias por contestar el quiz! Calificación: ${calificacion}`);
    } catch (error) {
      console.error("Error al enviar las respuestas:", error);
      Alert.alert("Error", "El quiz ya fue contestado");
    }
  };

  const renderPregunta = (pregunta: Pregunta) => (
    <View key={pregunta.id} style={styles.preguntaContainer}>
      <Text style={styles.preguntaText}>{pregunta.pregunta}</Text>
      {pregunta.tipo === "abierta" ? (
        <TextInput
          style={styles.textInput}
          placeholder="Escribe tu respuesta aquí"
          placeholderTextColor="#aaa"
          onChangeText={(text) => handleRespuestaSeleccionada(pregunta.id, text)}
          editable={!isQuizEnviado} 
        />
      ) : (
        pregunta.respuestas.map((respuesta) => (
          <TouchableOpacity
            key={respuesta.id}
            style={styles.radioOption}
            onPress={() => handleRespuestaSeleccionada(pregunta.id, respuesta.id)}
            disabled={isQuizEnviado}
          >
            <View
              style={[styles.radioButton, respuestasSeleccionadas[pregunta.id] === respuesta.id ? styles.radioButtonSelected : {}]}
            />
            <Text style={styles.respuestaText}>{respuesta.respuesta}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <View style={globalStyles.container}>
        {isLoading ? (
          <ActivityIndicator
            color={colors.primary}
            style={{ alignSelf: "center", marginTop: 100 }}
            size="large"
          />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="always">
            {preguntas.length > 0 ? (
              preguntas.map((pregunta) => renderPregunta(pregunta))
            ) : (
              <Text style={styles.noPreguntasText}>No hay preguntas disponibles para esta actividad.</Text>
            )}
            <TouchableOpacity
              style={styles.contestarButton}
              onPress={validarRespuestas}
              disabled={isQuizEnviado}  
            >
              <Text style={styles.contestarButtonText}>
                {isQuizEnviado ? "Quiz Enviado" : "Contestar Quiz"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  preguntaContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: colors.info700,
    borderRadius: 10,
  },
  preguntaText: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  respuestaText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
  textInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    color: "black",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: colors.primary,
  },
  contestarButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  contestarButtonText: {
    color: "white",
    fontSize: 18,
  },
  noPreguntasText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
