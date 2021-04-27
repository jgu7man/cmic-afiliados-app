import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { PerfilCol } from '../models/perfiles.model';
import firebase from 'firebase/app'
import { identity, pickBy } from 'lodash';
import { GdevAlert } from 'gdev-alert';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(
    private _afs: AngularFirestore,
    private _alert: GdevAlert
  ) { }

  async updateInfoDoc( field: string, data: any, rfc: string,) {
    // data = pickBy(data, identity)
    const ref = this._afs.doc(`afiliados/${rfc}`).ref
    await ref.update({ [field]: data, updated: new Date() })
    this._alert.sendFloatNotification('Guardado')
    return
  }

  async getInfoDoc<T>(field: string, rfc: string, ) {
    const ref = this._afs.doc(`afiliados/${rfc}`).ref
    var infoDoc = await ref.get()
    if (infoDoc.exists) {
      let data = infoDoc.get(field)
      console.log( data )
      return data
    } else {
      return
    }
  }


  async setInfoItem(rfc: string, col: string, data: any, itemId?: string,) {
    data = pickBy(data, identity)
    const ref = this._afs.collection(`afiliados/${rfc}/${col}`).ref
    await ref.doc(itemId).set({ ...data, updated: new Date() }, { merge: true })
    this._alert.sendFloatNotification(`${col} guardado`)
    return
  }

  getInfoCollection<T>(rfc: string, col: string) {
    const ref = this._afs.collection<T>(`afiliados/${rfc}/${col}`)
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

  async deleteInfoItem(rfc: string, doc: string, itemId?: string,) {
    const ref = this._afs.collection(`afiliados/${rfc}/${doc}`).ref
    await ref.doc(itemId).delete()
    return
  }
}
