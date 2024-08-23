export interface GetRecursosResponse {
    results: Recurso[];
}

export interface Recurso {
    id: string;
    titulo: string;
    contenido: string;
    id_material: string;
    fecha_publicacion: Date;
    id_grupo: string;
    id_profesor: string;
}
