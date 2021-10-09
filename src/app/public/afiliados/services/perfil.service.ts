import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { iAdtionalInfo, PerfilCol, SectionName } from '../models/perfiles.model';
import firebase from 'firebase/app'
import { identity, pickBy } from 'lodash';
import { MxAlert } from '@marxa/devkit';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxStorage } from '@marxa/storage';
import { iUploadedFile } from '@marxa/storage';
import { MxLoading } from '@marxa/devkit';
import { MxCache } from '@marxa/devkit';
import { AfiliadoModel, iManager } from '../models/afiliados.model';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  extractCtrl: FormControl
  RFC: string
  filesPath: string = ''
  metadata: any
  items$?: Observable<any[]>
  editingItem?: string


  constructor(
    private _afs: AngularFirestore,
    private _alert: MxAlert,
    private _storage: MxStorage,
    private _loading: MxLoading,
    private _cache: MxCache,
    private _as: AngularFireStorage
  ) {
    this.extractCtrl = new FormControl('', [Validators.required])
    this.RFC = this._cache.getDataKey<string>('rfc') as string
    const { email } = this._cache.getDataKey('user') || {email:''}
    this.metadata = { RFC: this.RFC, email }
  }

  initialize(section: SectionName) {
    this.filesPath = `afiliados/${this.RFC}/${section}`
    this.getExtract(section)
  }


  /**
   * Actualiza una parte de la información del perfil de la empresa
   *
   * @param {(SectionName | string)} field
   * @param {*} data
   * @returns {*}
   */
  async updateInfoDoc( field: SectionName | string, data: any, ) {
    try {
      const ref = this._afs.doc( `afiliados/${ this.RFC }` ).ref
      await ref.update( {
        [ field ]: typeof data === 'object'
          ? !Array.isArray(data) ? { ...data }
          : data : data,
        updated: new Date()
      } )
      this._alert.notify('Guardado')
      return
    } catch (error) {
      this._alert.error('No se pudo actualizar la información del perfil ', error)
      return console.error(error)
    }
  }

  /**
   * Obtiene el documento de información de la empresa
   *
   * @template T
   * @param {(SectionName | string)} field
   * @returns {*}  {Promise<any>}
   */
  async getInfoDoc<T>(field: SectionName | string): Promise<any> {
    try {
      const ref = this._afs.doc(`afiliados/${this.RFC}`).ref
      var infoDoc = await ref.get()
      if (infoDoc.exists) {
        let data = infoDoc.get(field)
        return data
      } else {
        return
      }
    } catch (error) {
      this._alert.error('No se pudo obtener la informacion de la empresa', error)
      return console.error(error)
    }
  }


  /**
   * Actualiza la información por item
   *
   * @param {SectionName} col
   * @param {*} data
   * @param {string} [itemId]
   * @returns {*}
   */
  async updateInfoItem( col: SectionName, data: any, itemId?: string,) {
    try {
      data = pickBy(data, identity)
      const ref = this._afs.collection(`afiliados/${this.RFC}/${col}`).ref
      await ref.doc(itemId).set({ ...data, updated: new Date() }, { merge: true })
      this._alert.notify(`${col} guardado`)
      return
    } catch (error) {
      this._alert.error('Error al actualiza la información e la empresa', error)
      return console.error(error)
    }
  }



  /**
   * Obtiene un observable de la colección de información de la empresa
   *
   * @template T
   * @param {SectionName} col
   * @param {string} [rfc]
   * @returns {*}  {Observable<T[]>}
   */
  public getInfoCollection<T>(col: SectionName, rfc?: string,): Observable<T[]> {
    this.RFC = this._cache.getDataKey('rfc') || this.RFC
    if (rfc) this.RFC = rfc
    const ref = this._afs.collection<T>(`afiliados/${this.RFC}/${col}`)
    return ref.valueChanges({idField:'id'}).pipe(
      map(list => list.map((item: any) => {
        if (item['updated']) {
          let updated = item['updated'] as firebase.firestore.Timestamp
          item['updated'] = new Date(updated.seconds * 1000)
        }
        return item as T
      } ) ),
      catchError( ( error ) => { throw this._alert.error('No se pudo obtener toda la información de la empresa', error)})
    )
  }


  /**
   * Elimina la información del perfil de empresa
   *
   * @param {SectionName} doc
   * @param {string} [itemId]
   * @returns {*}
   */
  async deleteInfoItem( doc: SectionName, itemId?: string,) {
    try {
      const ref = this._afs.collection(`afiliados/${this.RFC}/${doc}`).ref
      await ref.doc(itemId).delete()
      return
    } catch (error) {
      this._alert.error('Error al intentar borrar la información del perfil de empresa', error)
      return console.error(error)
    }
  }

  /**
   * Obtiene el extracto solicitado
   *
   * @param {SectionName} fieldName
   * @returns {*}
   */
  async getExtract(fieldName: SectionName) {
    try {
      let field = `adicional.extract.${fieldName}`
      let extract = await this.getInfoDoc<iAdtionalInfo>(field)
      if ( extract ) {

        //NOTE ESTO ES PROVISIONAL, QUITAR LAS CONDICIONALES
        if ( typeof extract === 'object' ) {
          const charts:string[] = []
          Object.values( extract ).forEach( char => charts.push( char as string ) )
          extract = charts.join( '' )
          this.extractCtrl.setValue( extract )
        } else {
          this.extractCtrl.setValue( extract )
        }
      }
      return extract ? extract : ''
    } catch (error) {
      this._alert.error(`No se pudo obtener la informacion de ${fieldName}`, error)
      return console.error(error)
    }
  }

  /**
   * Actualiza el extracto de la sección del perfil de empresa
   *
   * @param {SectionName} fieldName
   * @returns {*}
   */
  async updateExtract(fieldName: SectionName) {
    try {
      let field = `adicional.extract.${fieldName}`
      await this.updateInfoDoc(field,this.extractCtrl.value)
    } catch (error) {
      this._alert.error(`No se pudo actualizar el extracto ${fieldName}`, error)
      return console.error(error)
    }
  }

  editSubscription?: Subscription
  listenEditingItem: Subject<any> = new Subject()
  onEditItem({ updated, id, ...item }: any) {
    this.editingItem = id
    this.listenEditingItem.next(item)
  }


  /**
   * Guarda los items agregados al perfil de empresa
   *
   * @param {FormGroup} form
   * @param {SectionName} collection
   * @returns {*}  {Promise<void>}
   */
  async saveItems(form: FormGroup, collection: SectionName): Promise<void> {
    try {
      let evidencia = form.get('evidencia')?.value as any[]
      evidencia = evidencia ? evidencia : []

      // Valida menos de 3 archivos por proyecto
      if (evidencia.length + this._storage.files.length > 3) {
        this._alert.message(
          'No está permitido subir más de 3 imágenes por proyecto'
        )
      }


      else {
        if (this._storage.files.length > 0) {
          form = await this.saveFiles(form)
        }

        console.log( collection )
        this.updateInfoItem( collection, form.value, this.editingItem)
          .then(() => {
            console.log('done!')
            delete this.editingItem

          })
        return
      }
    } catch (error) {
      this._alert.error('No se pudieron guardar los items del perfil de empresa', error)
     return console.error(error)
    }
  }

  private async saveFiles(form: FormGroup): Promise<FormGroup> {
    return new Promise<FormGroup>((resolve, reject) => {


      this._storage.upload()
        .pipe(
          mergeMap( async files => {
            let evidencia = form.get('evidencia')?.value as any[]
            await this._loading.asyncForEach(
            files, (file:iUploadedFile) => {
              evidencia.push(file)
            })

            form.patchValue({ evidencia })
            this._storage.showDropzone$.next(false)

            resolve(form)

          })
        ).subscribe( /*val => console.log( val ) */)
    })
  }


  /**
   * Guarda la lista de la sección de items de la empresa
   *
   * @param {iUploadedFile} file
   * @param {SectionName} field
   */
  saveList(file: iUploadedFile, field: SectionName) {
    const ref = this._afs.doc(`afiliados/${this.RFC}`).ref
    ref.set({ listas: { [field]: file } }, { merge: true})
      .then( () => this._alert.notify( 'Lista guardada' ) )
      .catch( error => {
      this._alert.error('No se pudo guardar la lista', error, "perfil.service#saveList", true)
    })
  }

  /**
   * Obtiene la lista de la sección solicitada
   *
   * @param {SectionName} field
   * @returns {*}
   */
  getListFile(field: SectionName) {
    return this._afs.doc<AfiliadoModel>( `afiliados/${ this.RFC }` )
      .valueChanges().pipe(
        distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
        catchError( error => {
          this._alert.error( `No se pudo obtener el afiliado para obtener ${ field } de ${ this.RFC }`, error, 'perfil.service#getList' );
          return of(null)
        }),
        map( afiliado => {
          if ( afiliado ) {
            if ( afiliado.listas ) {
              console.log( afiliado.listas[ field ] )
              return afiliado.listas[ field ]
            } else return null
          } else return null

        } ),
      )

  }

  async deleteListFile( field: SectionName ) {
    const afiliadoDoc = await this._afs
      .doc<AfiliadoModel>( `afiliados/${ this.RFC }` ).ref.get()

    try {
      if ( afiliadoDoc.exists ) {
        const afiliado = afiliadoDoc.data()  as AfiliadoModel
        const listas = afiliado.listas
        if ( listas ) {
          let file = listas[ field ]
          let filePath = `${file.path}/${file.fileName}`
          await this._as.ref(filePath).delete()
          delete listas[ field ]
          afiliadoDoc.ref.update({listas})
        }
      }


    } catch (error: any) {
      if ('message' in error) {
        this._alert.error(error.message, error)
      } else {
        this._alert.error('No pudo borrarse el archivo', error)
      }
      return console.error(error)
    }
  }


  /**
   * Se desuscribe de todos los observables suscritos en el servicio
   *
   */
  getOutSection() {
    if (this.editSubscription) this.editSubscription.unsubscribe()
    if (this.editingItem) delete this.editingItem
    this.extractCtrl.setValue('')
    this.filesPath = ''
    this.items$ = new Observable()
  }
}
