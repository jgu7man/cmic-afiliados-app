import firebase from "firebase/app"

export interface iUploadedFile extends iUploadInfo{
  url?: string;
  uploadedState?: number | true
}

export interface iUploadInfo {
  fileName?: string;
  uploaded?: Date | firebase.firestore.Timestamp,
  metadata?: any
  format?: string
}

export interface iUploadOptions {
  path: string
  prefixName?: string
  metadata?: Object
  multiple?: boolean
  maxFileSize?: number
  showDropzone?: boolean
  uploadButton?: boolean
  uploadStatus?: boolean
  toggleButtonLabel?: string
  uploadButtonLabel?: string
  dropzoneLabel?: string
  compareDimensions?: 'equals' | 'notEquals'
}

export interface RawValue {
  [value: string]:any
}
