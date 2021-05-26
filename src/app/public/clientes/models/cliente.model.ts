import firebase from 'firebase/app'
import { iUser } from 'src/app/admin/models/roles.model';
import { iUploadedFile } from '@marxa/storage';

export interface iCliente extends iUser {
  RFC: string,
  comercial_nombre: string,
  INEfile: iUploadedFile,
  CIFfile: iUploadedFile,
  status: 'solicitud' | 'aceptado' | 'revoke' | 'pendiente',
  request: Date | firebase.firestore.Timestamp
}

