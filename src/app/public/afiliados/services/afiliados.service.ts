import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GdevCache } from 'gdev-cache';
import { iUserAfiliado, PartialAfiliado } from '../models/afiliados.model';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {

  constructor(
    private _auth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _cache: GdevCache,
    private _router: Router
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


  async registAfiliado({ email, contrasena, RFC }: iUserAfiliado) {
    try {
      const userCredentials = await this._auth.createUserWithEmailAndPassword(email, contrasena)
        .catch(error => {
        throw {mensaje: 'No se pudo crear el usuario', error}
      })

      const userRef = this._afs.collection('afiliados').doc(RFC)
        .collection('managers').doc(userCredentials.user?.uid)

      userRef.set(<iUserAfiliado>{ email, RFC })
        .catch(error => {
        throw {mensaje: 'No se pudo guardar en base de datos', error}
        })

      console.log('usuario registrado')
      this._cache.updateData('user', userCredentials.user)
      this._router.navigate(['/afiliados/registro'])
    } catch (e) {
      alert('No se pudo autenticar')
      console.error(e)
    }
  }


}
