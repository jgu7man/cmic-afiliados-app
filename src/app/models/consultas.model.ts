import { Especialidad, Actividad } from "../public/afiliados/models/actividades.model";

export interface EspecialidadQuery extends Especialidad{
  catalogo: string
}

export interface ActividadQuery extends Actividad {
  catalogo: string,
  especialidad: string
}



export interface ActividadSeleccionada {
  codigo: string
  especialidad: Especialidad
}

export interface AfiliadoQuery {
  nombre: string,
  slug: string
}

export type QueryParam = 'codigo'  | 'especialidad' | 'slug'




export const emptyActividadQuery: ActividadQuery = {
  catalogo: '',
  especialidad: '',
  nombre: '',
  codigo: '',
  expansion: false,
}
