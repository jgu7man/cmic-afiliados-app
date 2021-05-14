import firebase from 'firebase/app'

export class iUser {

  lastAccess: any;
  contrasena?: any;
  uid: any;

  access?: 'revoke';
  registrado?: firebase.firestore.Timestamp | Date
  rol?: Rol

  personal_data: PersonalData
  full_name: string
  constructor(
    public email: string,
    public nombre: string,
    public paterno:string,
    public materno:string,
  ) {
    this.full_name = `${this.nombre} ${this.paterno} ${this.materno}`
    this.personal_data = {
      email: this.email,
      nombre: this.nombre,
      paterno: this.paterno,
      materno: this.materno,
    }
   }



  getRol = ()=> {
    return this.rol ? rolCollectionMap.get(this.rol) : null
  }

  getRegistradoDate = () => {
    return this.registrado ? 'seconds' in this.registrado ?
      new Date(this.registrado.seconds * 1000) : ''
      : ''
  }


}

export interface PersonalData {
  email: string,
  nombre: string,
  paterno:string
  materno:string
}

export interface iRol {
  name: Rol;
  displayName: string;
}

export interface iAccessInvitation {
  email: string;
  perfil:Rol
}

export type Rol = 'manager' | 'client' | 'admin'

export const rolCollectionMap: Map<Rol, string> = new Map([
  ['manager', 'managers'],
  ['client', 'clientes'],
  ['admin', 'admins']
])

export interface iPeticion extends iUser {
  request: Date | firebase.firestore.Timestamp,
  id?: string
}



