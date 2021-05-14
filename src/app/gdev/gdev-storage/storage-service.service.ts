import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { iUploadedFile, iUploadInfo } from './storage.model';
import { GdevLoading } from 'gdev-loading';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';

@Injectable({
  providedIn: 'root'
})
export class GdevStorage {


  /** Defines the path where the files are stored.
   * If path is not provided, will stored in root
   * @type {string}
   */
  public path: string = ''

  /** Define a prefix for every name of uploaded file.  If prefix is not provided, not will be.
   * @type {string}
   */
  public prefixName: string = ''
  /** Optional metadata for all files uploaded
   * @type {Object}
   */
  public metadata?: Object
  public files: any[] = []
  public fileUploadedStatus$:
    Subject<iUploadedFile> = new Subject()
  public upload$: Subject<void> = new Subject()
  public uploadComplete$: Subject<iUploadedFile[]> = new Subject
  public showDropzone:boolean = false

  constructor(
    private _aStorage: AngularFireStorage,
  ) { }

  upload() {
    this.upload$.next()
    return this.uploadComplete$
  }

  uploadFile(file: any, path:string, prefixName?:string | null, metadata?:any):
    Observable<iUploadedFile> {

      metadata = metadata ? {
        customMetadata: metadata
      } as firebase.storage.UploadMetadata
        : null


    const
      fileName = prefixName ? `${prefixName}-${file.name}` : file.name,
      format = file.type,
      filePath = `${path}/${fileName}`,
      ref = this._aStorage.ref(filePath),
      task = this._aStorage.upload(filePath, file, metadata);


    task.percentageChanges().subscribe(uploadedState => {
      this.fileUploadedStatus$.next( {uploadedState} )
    } )

    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((url) => {
            // Response
            let uploadedFile: iUploadedFile = {
              fileName, url, format,
              uploadedState: true,
              uploaded: new Date(),
          }
          console.log( metadata )
          if (metadata) uploadedFile['metadata'] = metadata
          this.fileUploadedStatus$.next(uploadedFile)


          });
        })
      )
      .subscribe();

    return this.fileUploadedStatus$
  }

  async deleteFiles(files: iUploadInfo[], path: string) {
    try {
      await this.asyncForEach(files, ((file: iUploadInfo) => {
        this._aStorage.ref(`${path}/${file.fileName}`).delete()
      }))

    } catch (error) {
      console.error(error)
    }
  }

  validateLength(array?:any[]): boolean {
    return array && array.length > 0 ? true : false
  }


  async asyncForEach(array: any[], callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


  async compareDimensions(file: any, equals: boolean) {
    const fileAsDataURL = window.URL.createObjectURL(file)
    const dimensions: iImageDimensions = await this.getHeightAndWidthFromDataUrl(fileAsDataURL)
    if (equals) {
      return dimensions.width === dimensions.height ? true : false;
    } else {
      return dimensions.width === dimensions.height ? false : true
    }
  }


  async getHeightAndWidthFromDataUrl(dataURL: any) {
    return new Promise<iImageDimensions>(resolve => {
      const img = new Image()
      img.onload = () => {
        resolve({
          height: img.height,
          width: img.width
        })
      }
      img.src = dataURL
    })
  }
}

export interface iImageDimensions {
  height: number,
  width: number
}

