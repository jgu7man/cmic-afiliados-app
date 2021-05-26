import { iAdtionalInfo, iPerfil } from './perfiles.model';
import { ActividadQuery } from 'src/app/models/consultas.model';
import { iUser } from 'src/app/admin/models/roles.model';
import { Actividad } from './actividades.model';
import { iUploadedFile } from '@marxa/storage';
import firebase from 'firebase/app'

export interface iManager extends iUser {
  RFC: string;
}

export interface iAfiliadoRequest {
  empresa: DatosGeneralesModel,
  email: string,
  file: iUploadedFile,
  request: Date | firebase.firestore.Timestamp
  RFC?: string
}

export class AfiliadoModel {
  constancia?: iUploadedFile
  creado?: Date | firebase.firestore.Timestamp
  constructor(
    public datos_generales: DatosGeneralesModel,
    public domicilio: DireccionAfiliadoModel,
    public contacto: ContactoAfiliado,
    public representante_legal: RepresentanteAfiliado,
    public director: RepresentanteAfiliado,
    public perfil?: iPerfil,
    public adicional?: iAdtionalInfo,
    public fuentes_de_trabajo?: ActividadEmpresa[],
    public servicios_profesionales?: ActividadEmpresa[],
    public tipos_de_obra?:ActividadEmpresa[],
  ) {}
}

export type AfiliadoModelKey =
| "datos_generales"
| "domicilio"
| "contacto"
| "representante_legal"
| "director"
| "perfil"
| "adicional"
| "fuentes_de_trabajo"
| "servicios_profesionales"
| "tipos_de_obra"


export interface iAfiliadoModel {
  datos_generales: DatosGeneralesModel;
  domicilio: DireccionAfiliadoModel;
  contacto: ContactoAfiliado;
  representante_legal: RepresentanteAfiliado;
  director: RepresentanteAfiliado;
  perfil: iPerfil
}

export class DatosGeneralesModel {
  constructor(
    public RFC: string,
    public comercial_nombre: string,
    public slug: string,
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
  area_tel: number;
  telefono: string;
  area_cel: number;
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



export class ContactoInteres {
  constructor(
    public nombre: string,
    public telefono: string,
    public puesto: string,
    public email: string,
    public intereses: string[],
  ){}
}
export class ActividadesModel {
  constructor(
    public tipos_de_obra: ActividadEmpresa[],
    public servicios_profesionales: ActividadEmpresa[],
    public fuentes_de_trabajo: ActividadEmpresa[],
  ) { }
}

export interface CatalogoEmpresa {
  nombre: string,
  actividades?: ActividadEmpresa[]
}

export interface ActividadEmpresa extends Actividad{
  catalogo: string,
  especialidad: string
}

export class Intereses {
  constructor(
    public contacto_1: ContactoInteres,
    public contacto_2: ContactoInteres,
    public recibir_info: boolean,
  ) {}
}

export const emptyContactoInteres: ContactoInteres =
  new ContactoInteres('','','','',[])



export type PartialAfiliado =
  | DatosGeneralesModel
  | DireccionAfiliadoModel
  | RepresentanteAfiliado
  | Intereses
  | ContactoAfiliado


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
  area_tel: 52,
  telefono: '',
  area_cel: 52,
  celular: '',
  email: '',
  pagina_web:'',
}

export const emptyAfiliado: AfiliadoModel = new AfiliadoModel(
  new DatosGeneralesModel('', '', ''),
  new DireccionAfiliadoModel(emptyDireccion, emptyDireccion ),
  {
    ...emptyContacto,
    mostrar_en_directorios: false
  },
  new RepresentanteAfiliado('','','','','','', emptyContacto),
  new RepresentanteAfiliado('', '', '', '', '', '', emptyContacto),

);

export const emptyCatalogoEmpresa: CatalogoEmpresa = {
    nombre: '',
    actividades:[],
  }
