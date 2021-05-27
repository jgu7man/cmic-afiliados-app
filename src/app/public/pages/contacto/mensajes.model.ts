import firebase from 'firebase/app'

export interface iMensaje {
  nombre: string,
  email: string,
  area_cel: number
  celular: string
  mensaje: string
  date?: Date | firebase.firestore.Timestamp
  id?: string
}
