import firebase from "firebase/app"

export interface iUploadedFile {
  url?: string;
  uploadedState?: number | true
}

export interface iUploadInfo {
  url: string,
  by: { uid:string, email:string },
  uploaded: Date,
  name: string
}

export interface iFile {
  name: string;
  uploaded?: Date | firebase.firestore.Timestamp,
  id?: string,
  url?: string
}
