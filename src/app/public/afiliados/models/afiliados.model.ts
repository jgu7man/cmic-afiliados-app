import { Actividad } from "./actividades.model";

export interface iUserAfiliado {
  uid?: string;
  RFC: string;
  email: string;
  contrasena?: string;
}


export class AfiliadoModel {
  constructor(
    public generales: DatosGeneralesAfiliado,
    public direccion: DireccionAfiliado,
    public contacto: iContactoAfiliado,
    public representateLegal: RepresentanteAfiliado,
    public director: RepresentanteAfiliado,
    public autorizaciones: AutorizacionesAfiliado,
  ){}
}



export class DatosGeneralesAfiliado {
  constructor(
    public RFC: string,
    public fisica_nombre: string,
    public fisica_apellido_pat: string,
    public fisica_apellido_mat: string,
    public moral_nombre: string,
  )
  {}
}

export interface DireccionAfiliado {
  publica: iDireccion,
  correspondencia: iDireccion
}

export interface iDireccion {
  calle: string
  num_ext: string
  num_int: string
  colonia: string
  codigo_postal: string
  entidad_federativa: string
  municipio_alcaldia: string
}



export interface iContactoAfiliado {
  lada_telefono:string,
  telefono:string,
  lada_celular:string,
  celular:string,
  email:string,
  pagina_web?:string,
}

export interface ContactoAfiliado extends iContactoAfiliado {
  mostrar_en_directorios: boolean,
}

export class RepresentanteAfiliado {
  constructor(
    public nombre:string,
    public apellido_pat:string,
    public apellido_mat:string,
    public titulo:string,
    public sexo:string,
    public fecha_nacimiento:string,
    public contacto: iContactoAfiliado
    ) {
    }
  }



export interface AutorizacionesAfiliado {
  retencion_para_capacitacion: boolean,
  aviso_privacidad: boolean

}


export interface ContactoInteres{
  intereses: string[],
  nombre: string,
  telefono: string,
  puesto: string,
  email: string
}

export class Intereses {
  constructor(
    public tipos_de_obra: Actividad[],
    public servicios_profesionales: Actividad[],
    public fuentes_de_trabajo: Actividad[],
    public contacto_1: ContactoInteres,
    public contacto_2: ContactoInteres,
    public recibir_info: boolean,
    public veracidad_datos: boolean
  ){}
}


export type PartialAfiliado = DatosGeneralesAfiliado | DireccionAfiliado | RepresentanteAfiliado | AutorizacionesAfiliado | Intereses |ContactoAfiliado
