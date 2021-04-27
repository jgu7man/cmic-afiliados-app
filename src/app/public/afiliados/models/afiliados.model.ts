import { iAdtionalInfo, iPerfil } from './perfiles.model';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';
import { Actividad } from './actividades.model';
import firebase from 'firebase/app'

export interface iUserAfiliado {
  uid?: string;
  RFC: string;
  email: string;
  contrasena?: string;
  registrado?: firebase.firestore.Timestamp
}

export class AfiliadoModel {
  constructor(
    public datos_generales: DatosGeneralesAfiliado,
    public domicilio: DireccionAfiliadoModel,
    public contacto: ContactoAfiliado,
    public representante_legal: RepresentanteAfiliado,
    public director: RepresentanteAfiliado,
    public perfil?: iPerfil,
    public adicional?: iAdtionalInfo
  ) {}
}



export interface iAfiliadoModel {
  datos_generales: DatosGeneralesAfiliado;
  domicilio: DireccionAfiliadoModel;
  contacto: ContactoAfiliado;
  representante_legal: RepresentanteAfiliado;
  director: RepresentanteAfiliado;
  perfil: iPerfil
}

export class DatosGeneralesAfiliado {
  constructor(
    public RFC: string,
    public comercial_nombre: string,
    public fisica_nombre?: string,
    public fisica_apellido_pat?: string,
    public fisica_apellido_mat?: string,
    public moral_nombre?: string,
  ) {}
}

export class DireccionAfiliadoModel {
  constructor(
    public publica: iDireccion,
    public correspondencia: iDireccion,
  ){}
}

export interface iDireccion {
  calle: string;
  num_ext: string;
  num_int: string;
  colonia: string;
  codigo_postal: string;
  entidad_federativa: string;
  municipio_alcaldia: string;
}

export interface iContacto {
  telefono: string;
  celular: string;
  email: string;
  pagina_web?: string;
}

export interface ContactoAfiliado extends iContacto {
  mostrar_en_directorios: boolean;
}

export class RepresentanteAfiliado {
  constructor(
    public nombre: string,
    public apellido_pat: string,
    public apellido_mat: string,
    public titulo: string,
    public sexo: string,
    public fecha_nacimiento: string,
    public contacto: iContacto
  ) {}
}



export interface ContactoInteres {
  intereses: string[];
  nombre: string;
  telefono: string;
  puesto: string;
  email: string;
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
  ) {}
}



export type PartialAfiliado =
  | DatosGeneralesAfiliado
  | DireccionAfiliadoModel
  | RepresentanteAfiliado
  | Intereses
  | ContactoAfiliado
  | iUploadedFile
  | string
  | string[]

export type AfiliadoProperty =
| "datos_generales"
| "domicilio"
| "contacto"
| "representante_legal"
  | "director"
|"perfil"


export const emptyDireccion = {
  calle:'',
  num_ext:'',
  num_int:'',
  colonia:'',
  codigo_postal:'',
  entidad_federativa:'',
  municipio_alcaldia:'',
}

export const emptyContacto = {
  telefono: '',
  celular: '',
  email: '',
  pagina_web:'',
}

export const emptyAfiliado: AfiliadoModel = new AfiliadoModel(
  new DatosGeneralesAfiliado('', ''),
  new DireccionAfiliadoModel(emptyDireccion, emptyDireccion ),
  {
    ...emptyContacto,
    mostrar_en_directorios: false
  },
  new RepresentanteAfiliado('','','','','','', emptyContacto),
  new RepresentanteAfiliado('', '', '', '', '', '', emptyContacto),

);
