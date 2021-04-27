import { emptyDireccion, iDireccion } from "./afiliados.model";
import firebase from "firebase/app"
import { iUploadedFile } from "src/app/gdev/gdev-storage/storage.model";

export interface iPerfil {
  somos?: string,
  imgPerfil?: iUploadedFile,
  imgBanner?: iUploadedFile,
  servicios?: string[],
  primerAfiliacion?: number,
  updated?: Date | firebase.firestore.Timestamp
}

export interface iAdtionalInfo {
  personal?: iPersonal
  capFinanciera?: number,
  certExtract?: string,
  maqExtract?: string,
  expExtract?: string,
  rrhhExtract?: string,
  updated?: Date | firebase.firestore.Timestamp
}


export class iProyecto {
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

export const emptyProyecto: iProyecto =
  new iProyecto('','','','',emptyDireccion,'Público', [])


export interface iDeclaracion {
  year: number,
  ingreso: number,
  evidencia: iUploadedFile
  updated?: Date | firebase.firestore.Timestamp
}


export interface iMaqEquipItem {
  nombre: string,
  modelo: string,
  propio: boolean,
  comprobacion: boolean,
  evidencia?: iUploadedFile[]
  updated?: Date | firebase.firestore.Timestamp
  id?: string
}

export interface iPersonal {
  planta_fija: number;
  capacidad_proyecto: number;
  hombres?: number;
  mujeres?: number;
  updated?: Date | firebase.firestore.Timestamp
}

export interface iMemberModel {
  nombre: string,
  cargo: string,
  contacto?: string
  updated?: Date | firebase.firestore.Timestamp
  id?: string
}


export interface iCertificacion {
  nombre: string,
  aval: string,
  miembro: iMemberModel,
  evidencia?: iUploadedFile
  updated?: Date | firebase.firestore.Timestamp,
  id?: string
}

export interface iPerfilSection {
  extract: string,
  updated?: Date | firebase.firestore.Timestamp
}



export type PerfilCol =
| iProyecto
| iDeclaracion
| iMaqEquipItem
| iMemberModel
| iCertificacion
