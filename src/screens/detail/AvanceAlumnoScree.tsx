import React, { useEffect, useState, useContext } from "react";
import { ActivityIndicator, KeyboardAvoidingView, FlatList, StyleSheet, Text, View, Alert } from "react-native";
import { globalStyles, colors } from "../../theme/globalStyles";
import { AuthContext } from "../../context"; // Context for Auth
import { useRequestGet } from "../../hooks/requests/useRequestGet"; // Custom hook for API requests
import { StackScreenProps } from "@react-navigation/stack";
import { ActividadesStackParams } from "../../navigators/stack/ActividadesStackNavigator";

// Define interface for Activity Data
interface ActivityData {
  id: string;
  nombreActividad: string;
  calificacion: number;
  fechaCreacion: string;
  fechaActivacion: string;
  fechaLimite: string;
  grupo: string;
}

interface Props extends StackScreenProps<ActividadesStackParams, any> { }

export const AvanceAlumnoScreen = ({ navigation }: Props) => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userAuthenticated, token } = useContext(AuthContext).authState;
  const { requestGet } = useRequestGet(); 


  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);

    
      const contestadasResponse = await requestGet({
        path: `/api/actividad-contestada/activities-by-alumno/${userAuthenticated?.matricula}`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      console.log("Contestadas Response:", contestadasResponse);

      
      if (!contestadasResponse || !Array.isArray(contestadasResponse.results)) {
        throw new Error("La API no devolvió datos válidos para actividades contestadas.");
      }

      
      const activitiesDataPromises = contestadasResponse.results.map(async (contestada: any) => {
        if (!contestada?.id_actividad) {
          console.error("Actividad sin ID:", contestada);  
          throw new Error("El ID de actividad está indefinido.");
        }

        const actividadResponse = await requestGet({
          path: `/api/actividad/${contestada.id_actividad}`,
          config: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        if (!actividadResponse) {
          console.error(`La API no devolvió datos para la actividad con ID ${contestada.id_actividad}.`);
          throw new Error(`La API no devolvió datos para la actividad con ID ${contestada.id_actividad}.`);
        }

        return {
          id: contestada.id_actividad,
          nombreActividad: actividadResponse?.nombre || "Sin nombre",
          calificacion: contestada.calificacion ?? 0,
          fechaCreacion: actividadResponse?.fecha_creacion || "N/A",
          fechaActivacion: actividadResponse?.fecha_activacion || "N/A",
          fechaLimite: actividadResponse?.fecha_limite || "N/A",
          grupo: actividadResponse?.id_grupo || "Sin grupo",
        };
      });

      const activitiesData = await Promise.all(activitiesDataPromises);
      setData(activitiesData);
    } catch (err: any) {
      console.error("Error al obtener actividades:", err);
      setError(err.message || "Error al cargar los datos. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userAuthenticated?.matricula && token) {
      fetchActivities();
    }
  }, [userAuthenticated?.matricula, token]);

  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView behavior="padding">
        {isLoading ? (
          <ActivityIndicator size={80} color={colors.primary} style={{ marginTop: 100 }} />
        ) : (
          <View>
            <Text style={[globalStyles.title, { fontSize: 22, alignSelf: "center" }]}>Actividades</Text>
            {error && <Text style={{ color: colors.error, textAlign: "center", marginVertical: 20 }}>{error}</Text>}
            {data.length === 0 ? (
              <Text style={{ margin: 15, fontSize: 20, alignSelf: "center" }}>
                No tienes actividades pendientes :D
              </Text>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text style={styles.title}>{item.nombreActividad}</Text>
                    <Text style={[{color:"white"}]}>Calificación: {item.calificacion}</Text>
                    <Text style={[{color:"white"}]}>Fecha Limite: {item.fechaLimite}</Text>
                    <Text style={[{color:"white"}]}>Grupo: {item.grupo}</Text>
                  </View>
                )}
              />
            )}
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  exportButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  exportText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AvanceAlumnoScreen;
