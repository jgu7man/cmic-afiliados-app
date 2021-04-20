import firebase from "firebase/app"

export interface iUploadedFile extends iUploadInfo{
  url?: string;
  uploadedState?: number | true
}

export interface iUploadInfo {
  fileName?: string;
  uploaded?: Date | firebase.firestore.Timestamp,
  metadata?: any
}


