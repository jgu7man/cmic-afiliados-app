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

export interface EspecialidadData extends Especialidad{
  catalogo: string
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

export interface ActividadData extends Actividad {
  catalogo: string,
  especialidad: string
}

export type catalogoName = "tipos_de_obra" | "servicios_profesionales" | "fuentes_de_trabajo";


export interface AfiliadoData {
  RFC: string,
  nombre: string
}
