export interface GetActividadesResponse {
    results: Result[];
}

export interface Result {
    fecha_activacion: Date;
    fecha_creacion: Date;
    fecha_limite: Date;
    id: string;
    nombre: string;
}
