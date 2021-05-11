import firebase from 'firebase/app'

export interface iAdmin {
  email: string;
  lastAccess: any;
  access: string;
  contrasena?: string;
  uid?: string;
  registrado?: firebase.firestore.Timestamp
}
