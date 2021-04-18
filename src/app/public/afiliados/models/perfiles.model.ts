import { iDireccion } from "./afiliados.model";
import firebase from "firebase/app"
import { iUploadedFile } from "src/app/gdev/gdev-storage/storage.model";

export interface iExperiencia {
  extract: string,
  proyectos: iProyectoModel[],
  updated?: Date | firebase.firestore.Timestamp
}

export interface iProyectoModel {
  nombre: string,
  monto: string,
  ubicacion: iDireccion,
  privado: boolean,
  evidencia: iUploadedFile[],
  updated?: Date | firebase.firestore.Timestamp
}

export interface iContabilidad {
  declaraciones: iDeclaracionModel[],
  capacidad: number
  extract: string
  updated?: Date | firebase.firestore.Timestamp
}

export interface iDeclaracionModel {
  year: number,
  ingreso: number,
  evidencia: iUploadedFile
  updated?: Date | firebase.firestore.Timestamp
}

export interface iMaquinariaEquipo {
  extract: string,
  items: iMaqEquipModel[]
  updated?: Date | firebase.firestore.Timestamp
}

export interface iMaqEquipModel {
  nombre: string,
  modelo: string,
  propio: boolean,
  comprobacion: boolean,
  evidencia?: iUploadedFile[]
  updated?: Date | firebase.firestore.Timestamp
}

export interface iRecHumanos {
  extract: string,
  planta_fija: number;
  capacidad_proyecto: number;
  hombres: number;
  mujeres: number;
  team: MemberModel[]
  updated?: Date | firebase.firestore.Timestamp
}

export interface MemberModel {
  nombre: string,
  cargo: string,
  contacto?: string
  updated?: Date | firebase.firestore.Timestamp
}

export interface iCertificaciones {
  extract: string,
  certificados: CertificacionModel[]
  updated?: Date | firebase.firestore.Timestamp
}

export interface CertificacionModel {
  nombre: string,
  aval: string,
  miembro: MemberModel,
  evidencia?: iUploadedFile
  updated?: Date | firebase.firestore.Timestamp
}

export type PerfilDoc =
| iExperiencia
| iContabilidad
| iMaquinariaEquipo
| iRecHumanos
| iCertificaciones

export type PerfilCol =
| iProyectoModel
| iDeclaracionModel
| iMaqEquipModel
| MemberModel
| CertificacionModel
