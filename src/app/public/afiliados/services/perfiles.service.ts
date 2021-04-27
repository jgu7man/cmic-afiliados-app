import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { iAdtionalInfo, PerfilCol, SectionName } from '../models/perfiles.model';
import firebase from 'firebase/app'
import { identity, pickBy } from 'lodash';
import { GdevAlert } from 'gdev-alert';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';
import { GdevLoading } from 'gdev-loading';
import { GdevCache } from 'gdev-cache';
import { iUserAfiliado } from '../models/afiliados.model';
import { Observable, of, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  extractCtrl: FormControl
  RFC: string
  filesPath: string = ''
  metadata: any
  items$?: Observable<any[]>
  editingItem?: string


  constructor(
    private _afs: AngularFirestore,
    private _alert: GdevAlert,
    private _storage: GdevStorage,
    private _loading: GdevLoading,
    private _cache: GdevCache
  ) {
    this.extractCtrl = new FormControl('', [Validators.required])
    this.RFC = this._cache.getDataKey<string>('rfc') as string
    const { email }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    this.metadata = { RFC: this.RFC, email }
  }

  initialize(section: SectionName) {
    this.filesPath = `afiliados/${this.RFC}/${section}`
    this.getExtract(section)
  }

  async updateInfoDoc( field: SectionName | string, data: any, ) {
    const ref = this._afs.doc(`afiliados/${this.RFC}`).ref
    await ref.update({ [field]: data, updated: new Date() })
    this._alert.sendFloatNotification('Guardado')
    return
  }

  async getInfoDoc<T>(field: SectionName | string) {
    const ref = this._afs.doc(`afiliados/${this.RFC}`).ref
    var infoDoc = await ref.get()
    if (infoDoc.exists) {
      let data = infoDoc.get(field)
      console.log( data )
      return data
    } else {
      return
    }
  }


  async updateInfoItem( col: SectionName, data: any, itemId?: string,) {
    data = pickBy(data, identity)
    const ref = this._afs.collection(`afiliados/${this.RFC}/${col}`).ref
    await ref.doc(itemId).set({ ...data, updated: new Date() }, { merge: true })
    this._alert.sendFloatNotification(`${col} guardado`)
    return
  }

  public getInfoCollection<T>(col: SectionName) {
    const ref = this._afs.collection<T>(`afiliados/${this.RFC}/${col}`)
    return ref.valueChanges({idField:'id'}).pipe(
      map(list => list.map((item: any) => {
        if (item['updated']) {
          let updated = item['updated'] as firebase.firestore.Timestamp
          item['updated'] = new Date(updated.seconds * 1000)
        }
        return item as T
      }))
    )
  }

  async deleteInfoItem( doc: SectionName, itemId?: string,) {
    const ref = this._afs.collection(`afiliados/${this.RFC}/${doc}`).ref
    await ref.doc(itemId).delete()
    return
  }

  async getExtract(fieldName: SectionName) {
    let field = `adicional.extract.${fieldName}`
    let extract = await this.getInfoDoc<iAdtionalInfo>(field)
    if (extract) this.extractCtrl.setValue(extract)
    return extract ? extract : ''
  }

  updateExtract(fieldName: SectionName) {
    let field = `adicional.extract.${fieldName}`
    this.updateInfoDoc(field,this.extractCtrl.value)
  }

  editSubscription?: Subscription
  listenEditingItem: Subject<any> = new Subject()
  onEditItem({ updated, id, ...item }: any) {
    this.editingItem = id
    this.listenEditingItem.next(item)
  }


  async saveItems(form: FormGroup, collection: SectionName) {
    let evidencia = form.get('evidencia')?.value as any[]
    evidencia = evidencia ? evidencia : []

    // Valida menos de 3 archivos por proyecto
    if (evidencia.length + this._storage.files.length > 3) {
      this._alert.sendMessageAlert(
        'No está permitido subir más de 3 imágenes por proyecto'
      )
    }


    else {
      if (this._storage.files.length > 0) {
        form = await this.saveFiles(form)
      }

      this.updateInfoItem( collection, form.value, this.editingItem)
        .then(() => {
          console.log('done!')
          delete this.editingItem

        })
        return
      }
  }

  async saveFiles(form: FormGroup): Promise<FormGroup> {
    return new Promise<FormGroup>((resolve, reject) => {


      this._storage.upload().subscribe(async files => {
        let evidencia = form.get('evidencia')?.value as any[]

        await this._loading.asyncForEach(
        files, (file:iUploadedFile) => {
          evidencia.push(file)
        })

        form.patchValue({ evidencia })
        this._storage.showDropzone = false

        resolve(form)
      })
    })
  }


  getOutSection() {
    if (this.editSubscription) this.editSubscription.unsubscribe()
    if (this.editingItem) delete this.editingItem
    this.extractCtrl.setValue('')
    this.filesPath = ''
    this.items$ = new Observable()
  }
}
