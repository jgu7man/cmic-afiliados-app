import { iDireccion } from "./afiliados.model";

export interface iExperiencia {
  extract: string,
  proyectos: ProyectoModel[]
}

export class ProyectoModel {
  constructor(
    public nombre: string,
    public monto: string,
    public ubicacion: iDireccion,
    public privado: boolean,
    public evidencia: string[]
  ){}
}

export interface iContabilidad {
  declaraciones: [],
  capacidad: number
  extract: string
}

export class DeclaracionModel {
  constructor(
    public year: number,
    public ingreso: number,
    public evidencia: string
  ){}
}

export interface iMaquinariaEquipo {
  extract: string,
  items:MaqEquipModel[]
}

export class MaqEquipModel {
  constructor(
    public nombre: string,
    public modelo: string,
    public propio: boolean,
    public comprobacion: boolean,
    public evidencia?: string
  ){}
}

export interface iRecHumanos {
  extract: string,
  planta_fija: number;
  capacidad_proyecto: number;
  hombres: number;
  mujeres: number;
  team: MemberModel[]
}

export class MemberModel {
  constructor(
    public nombre: string,
    public cargo: string,
    public contacto?: string
  ){}
}

export interface iCertificaciones {
  extract: string,
  certificados: CertificacionModel[]
}

export class CertificacionModel {
  constructor(
    public nombre: string,
    public aval: string,
    public miembro: MemberModel,
    public evidencia?: string
  ){}
}

