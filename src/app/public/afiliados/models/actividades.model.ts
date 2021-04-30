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




export type catalogoName = "tipos_de_obra" | "servicios_profesionales" | "fuentes_de_trabajo";


export const emptyCatalog: Catalogo = {
  id: 'fuentes_de_trabajo',
  nombre: '',
  instrucciones: '',
  especialidades: []
}
