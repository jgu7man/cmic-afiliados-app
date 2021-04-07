import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevCache } from 'gdev-cache';
import { iUserAfiliado, PartialAfiliado } from '../models/afiliados.model';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {

  constructor(
    private _afs: AngularFirestore,
    private _cache: GdevCache
  ) { }


  /**
   * Almacena los datos parciles que se van llenando del registro
   *
   * @param {string} field: nombre del campo de la parcialidad a guardar
   * @param {PartialAfiliado} partialAafiliado parcialidad que se ha de guardar
   */
  savePartialAfiliado(field: string, partialAafiliado: PartialAfiliado) {
    // Obtenemos del local storage la información del usuario
    const user =  this._cache.getDataKey<iUserAfiliado>('user')

    this._afs.collection('afiliados')
      // Agregamos una llave dinámica que asignará el nombre del campo obtenido del parámetro de la función
      .doc(user?.RFC).update({
        [field]: { ...partialAafiliado }
      })
      .then(() => {
        console.log('Datos guardados')
      })
  }
}
