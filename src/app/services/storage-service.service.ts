import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { iUserAfiliado } from '../public/afiliados/models/afiliados.model';
import firebase from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { iUploadedFile, iFile } from './storage.model';
import { GdevLoading } from 'gdev-loading';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private _aStorage: AngularFireStorage,
    private _afs: AngularFirestore,
    private _loading: GdevLoading,
    private _alert: GdevAlert,
    private _cache: GdevCache
  ) { }

  public fileUploadedStatus$:
    Subject<iUploadedFile> = new Subject()

  uploadFile(file: any, {RFC, folder}:any):
    Observable<iUploadedFile> {

    const {uid, email}: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    const
      fileName = file.name,
      path = `${RFC}/${folder}/${fileName}`,
      ref = this._aStorage.ref(path),
      metadata: firebase.storage.UploadMetadata = {
        customMetadata: {
          authorId: uid ? uid : 'unknown',
          authorEmail: email ? email : 'unknown'
        }
      },
      task = this._aStorage.upload(path, file, metadata),
      filesRef = this._afs.collection(`afiliados/${RFC}/${folder}/files`)

    task.percentageChanges().subscribe( uploadedState => {
      this.fileUploadedStatus$.next( { uploadedState} )
    } )

    task.snapshotChanges().pipe(
      finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            // Response
            this.fileUploadedStatus$.next({
              uploadedState: true, url
            })

            // Add file to firestore
            filesRef.add({
              url: url,
              by: { uid, email },
              uploaded: new Date(),
              name: file.name
            }).then(doc => doc.update({id: doc.id}))
          });
        })
      )
      .subscribe();

    return this.fileUploadedStatus$
  }

  async deleteFiles(files: iFile[], collection: string, folder?: string) {
    const path = `${collection}/${folder}`
    await this._loading.asyncForEach(files, ((file: iFile) => {

      this._aStorage.ref(`${path}/${file.name}`).delete()
      this._afs.doc(`${path}/files/${file.id}`).delete()
    })).then(() => this._alert.sendFloatNotification('Archivos eliminados'))
    .catch(err => console.error(err))

  }

  validateLength(array?:any[]): boolean {
    return array && array.length > 0 ? true : false
  }
}

