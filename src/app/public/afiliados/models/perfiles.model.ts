import { iDireccion } from "./afiliados.model";
import firebase from "firebase/app"
import { iUploadedFile } from "src/app/gdev/gdev-storage/storage.model";

export interface iPerfil {
  somos: string,
  perfilImg?: iUploadedFile,
  bannerImg?: iUploadedFile
}

export interface iExperiencia {
  extract: string,
  updated?: Date | firebase.firestore.Timestamp
}

export interface iProyecto {
  nombre: string,
  cliente: string,
  fecha:number | string,
  monto: string,
  ubicacion: iDireccion,
  sector: 'Privado' | 'Público',
  evidencia: iUploadedFile[],
  updated?: Date | firebase.firestore.Timestamp
  id?:string
}

export interface iCapContable {
  capacidad: any
  extract: string
  updated?: Date | firebase.firestore.Timestamp
}

export interface iDeclaracion {
  year: number,
  ingreso: number,
  evidencia: iUploadedFile
  updated?: Date | firebase.firestore.Timestamp
}

export interface iMaquinariaEquipo {
  extract: string,
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

export interface iRecHumanos {
  extract: string,
  planta_fija: number;
  capacidad_proyecto: number;
  hombres: number;
  mujeres: number;
  updated?: Date | firebase.firestore.Timestamp
}

export interface iMemberModel {
  nombre: string,
  cargo: string,
  contacto?: string
  updated?: Date | firebase.firestore.Timestamp
  id?: string
}

export interface iCertificaciones {
  extract: string,
  updated?: Date | firebase.firestore.Timestamp
}

export interface iCertificacion {
  nombre: string,
  aval: string,
  miembro: iMemberModel,
  evidencia?: iUploadedFile
  updated?: Date | firebase.firestore.Timestamp,
  id?: string
}

export type PerfilDoc =
| iExperiencia
| iCapContable
| iMaquinariaEquipo
| iRecHumanos
| iCertificaciones

export type PerfilCol =
| iProyecto
| iDeclaracion
| iMaqEquipItem
| iMemberModel
| iCertificacion
