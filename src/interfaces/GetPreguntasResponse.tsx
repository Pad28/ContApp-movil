export interface GetPreguntasResponseTsx {
    id: string;
    nombre: string;
    fecha_creacion: Date;
    fecha_activacion: Date;
    fecha_limite: Date;
    fk_pregunta: FkPregunta[];
}

export interface FkPregunta {
    id: string;
    pregunta: string;
    id_actividad: string;
    fk_respuesta: FkRespuesta[];
}

export interface FkRespuesta {
    id: string;
    respuesta: string;
    esCorrecta: boolean;
    id_pregunta: string;
}
