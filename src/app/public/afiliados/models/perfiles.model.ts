import { emptyDireccion, iDireccion } from "./afiliados.model";
import firebase from "firebase/app"
import { iUploadedFile } from "@marxa/storage";

export interface iPerfil {
  somos?: string,
  imgPerfil?: iUploadedFile,
  imgBanner?: iUploadedFile,
  servicios?: string[],
  primerAfiliacion?: number,
  capFinanciera?: number,
  updated?: Date | firebase.firestore.Timestamp
}

export interface iAdtionalInfo {
  personal?: iPersonal
  extract?: iExtracts,
  updated?: Date | firebase.firestore.Timestamp
}

export interface iExtracts {
  "experiencia": string
  "equipo_maquinaria": string
  "recursos_humanos": string
  "certificaciones": string
}


export class Proyecto {
  constructor(
    public nombre: string,
    public cliente: string,
    public fecha:number | string,
    public monto: string,
    public ubicacion: iDireccion,
    public sector: 'Privado' | 'Público',
    public evidencia: iUploadedFile[],
    public updated?: Date | firebase.firestore.Timestamp,
    public id?:string,
  ) {}
}

export const emptyProyecto: Proyecto =
  new Proyecto('','','','',emptyDireccion,'Público', [])


export interface iDeclaracion {
  year: number,
  ingreso: number,
  evidencia: iUploadedFile
  updated?: Date | firebase.firestore.Timestamp
}


export class MaqEquipItem {
  constructor(
    public nombre: string,
    public modelo: string,
    public propio: boolean,
    public comprobacion: boolean,
    public evidencia?: iUploadedFile[],
    public updated?: Date | firebase.firestore.Timestamp,
    public id?: string,
  ){}
}

export const emptyMaqEquip: MaqEquipItem =
  new MaqEquipItem('', '',false, false, [])

export interface iPersonal {
  planta_fija: number;
  capacidad_proyecto: number;
  hombres?: number;
  mujeres?: number;
  updated?: Date | firebase.firestore.Timestamp
}


export class MemberModel {
  constructor(
    public nombre: string,
    public cargo: string,
    public contacto?: string,
    public updated?: Date | firebase.firestore.Timestamp,
    public id?: string
  ){}
}

export const emptyMember: MemberModel =
  new MemberModel('','')

export type SectionName =
  | "experiencia"
  | "equipo_maquinaria"
  | "recursos_humanos"
  | "certificaciones"
  | "capacidad_financiera"



export class CertificacionModel {
  constructor(
    public nombre: string,
    public aval: string,
    public miembro: MemberModel,
    public fecha: number,
    public evidencia?: iUploadedFile[],
    public updated?: Date | firebase.firestore.Timestamp,
    public id?: string
  ){}
}

export const emptyCert: CertificacionModel =
  new CertificacionModel('','', emptyMember, new Date(). getFullYear(), [])

export interface iPerfilSection {
  extract: string,
  updated?: Date | firebase.firestore.Timestamp
}



export type PerfilCol =
| Proyecto
| iDeclaracion
| MaqEquipItem
| MemberModel
| CertificacionModel
