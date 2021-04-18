import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { PerfilDoc, PerfilCol } from '../models/perfiles.model';
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

  async updateInfoDoc(rfc: string, doc: string, data: any) {
    data = pickBy(data, identity)
    const ref = this._afs.doc(`afiliados/${rfc}/info/${doc}`).ref
    await ref.set({ ...data, updated: new Date() }, { merge: true })
    this._alert.sendFloatNotification('Guardado')
    return
  }

  async getInfoDoc<T>(rfc: string, doc: string, ) {
    const ref = this._afs.doc(`afiliados/${rfc}/info/${doc}`).ref
    var infoDoc = await ref.get()
    var data:T = infoDoc.data() as T
    data['updated' as keyof T] = infoDoc.get('updated').toDate()
    return data
  }


  async setInfoItem(rfc: string, doc: string, data: any, itemId?: string,) {
    data = pickBy(data, identity)
    const ref = this._afs.collection(`afiliados/${rfc}/info/${doc}/items`).ref
    await ref.doc(itemId).set({ ...data, updated: new Date() }, { merge: true })
    this._alert.sendFloatNotification(`${doc} guardado`)
    return
  }

  getInfoCollection<T>(rfc: string, doc: string) {
    const ref = this._afs.collection<T>(`afiliados/${rfc}/info/${doc}/items`)
    return ref.valueChanges().pipe(
      map(list => list.map((item: any) => {
        let updated = item['updated'] as firebase.firestore.Timestamp
        item['updated'] = new Date(updated.seconds * 1000)
        return item as T
      }))
    )
  }

  async deleteInfoItem(rfc: string, doc: string, itemId: string,) {
    const ref = this._afs.collection(`afiliados/${rfc}/info/${doc}/items`).ref
    await ref.doc(itemId).delete()
    return
  }
}
