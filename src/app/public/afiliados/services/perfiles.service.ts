import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { PerfilDoc, PerfilCol } from '../models/perfiles.model';
import firebase from 'firebase/app'
import { identity, pickBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(
    private _afs: AngularFirestore,
  ) { }

  async updateInfoDoc(rfc: string, doc: string, data: any) {
    data = pickBy(data, identity)
    const ref = this._afs.doc(`afiliados/${rfc}/info/${doc}`).ref
    await ref.set({...data, updated: new Date()}, { merge: true })
    return
  }

  async getInfoDoc<PerfilDoc>(rfc: string, doc: string, ) {
    const ref = this._afs.doc(`afiliados/${rfc}/info/${doc}`).ref
    var infoDoc = await ref.get()
    var data:PerfilDoc = infoDoc.data() as PerfilDoc
    data['updated' as keyof PerfilDoc] = infoDoc.get('updated').toDate()
    return data
  }


  async setInfoItem(rfc: string, doc: string, data: any, itemId?: string,) {
    data = pickBy(data, identity)
    const ref = this._afs.collection(`afiliados/${rfc}/info/${doc}/items`).ref
    await ref.doc(itemId).set({...data, updated: new Date()}, { merge: true })
    return
  }

  getInfoCollection(rfc: string, doc: string) {
    const ref = this._afs.collection<PerfilCol>(`afiliados/${rfc}/info/${doc}/items`)
    return ref.valueChanges().pipe(
      map(list => list.map(item => {
        let updated = item['updated'] as firebase.firestore.Timestamp
        item['updated' as keyof PerfilCol] = new Date(updated.seconds * 1000)
        return item
      }))
    )
  }

  async deleteInfoItem(rfc: string, doc: string, itemId: string,) {
    const ref = this._afs.collection(`afiliados/${rfc}/info/${doc}/items`).ref
    await ref.doc(itemId).delete()
    return
  }
}
