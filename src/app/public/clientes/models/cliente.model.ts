import firebase from 'firebase/app'
import { iUser } from 'src/app/admin/models/roles.model';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';

export interface iCliente extends iUser {
  RFC: string,
  nombre_comercial: string,
  INEfile: iUploadedFile,
  CIFfile: iUploadedFile,
  status: 'solicitud' | 'aceptado' | 'revoke',
  request: Date | firebase.firestore.Timestamp
}
