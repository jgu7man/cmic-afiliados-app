import firebase from 'firebase/app'

export class iAdmin {

  lastAccess: any;
  access: string = '';
  contrasena?: string;
  uid?: string;
  registrado?: firebase.firestore.Timestamp | Date

  constructor(
    public email: string,
    public nombre: string,
    public apellidos:string
  ) { }

  get full_name(): string {
    return `${this.nombre} ${this.apellidos}`
  }
}
