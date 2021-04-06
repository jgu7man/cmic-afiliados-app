import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PartialAfiliado } from '../models/afiliados.model';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {

  constructor(
    private  _afs: AngularFirestore
  ) { }


  savePartialAfiliado(rfc: string,  partialAafiliado: PartialAfiliado) {
    this._afs.collection('afiliados')
      .doc(rfc).set({ ...partialAafiliado }, { merge: true })
      .then(() => console.log( 'Datos guardados' ))
  }
}
