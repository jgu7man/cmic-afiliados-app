export interface Catalogo {
    id: catalogoName
    nombre: string,
    instrucciones: string,
    especialidades: Especialidad[]
}

export interface Especialidad {
    nombre: string,
    actividades: Actividad[],
}

export interface Actividad {
    nombre: string,
    codigo: string,
    expansion: boolean,
    subespecialidad?:string
}

export interface ActividadSeleccionada {
  codigo: string
  especialidad: Especialidad
}

export type catalogoName = "tipos_de_obra" | "servicios_profesionales" | "fuentes_de_trabajo";
