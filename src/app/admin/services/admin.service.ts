import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { iManager } from 'src/app/public/afiliados/models/afiliados.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _afs: AngularFirestore,
  ) { }



  getManagers() {
    return this._afs.collectionGroup<iManager>('managers')
      .valueChanges({ idField: 'uid' })
  }


  async revokeAccess(docPath: string) {
    await this._afs.doc(docPath).update({ access: 'revoke' })
    return
  }
}
