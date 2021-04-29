import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';
import { iManager } from '../public/afiliados/models/afiliados.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _afs: AngularFirestore,
    private _afAuth: AngularFireAuth,
    private _alert: GdevAlert,
    private _cache: GdevCache
  ) { }

  /** Crea la cuenta de manager en firebase
   * @param {iManager} { email, contrasena, RFC }
   * @returns {userCredentials}
   */
   async createManagerAccount({ email, contrasena, RFC }: iManager) {
    const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
    const userCredentials = await this._afAuth
      .createUserWithEmailAndPassword(email, contrasena ? contrasena :  '' )
      .catch((error) => {
        throw { message: 'No se pudo crear el usuario', error };
      });

    const userRef = afiliadoRef
      .collection('managers')
      .doc(userCredentials.user?.uid);

    userRef.set({ email, RFC, registrado: new Date() }).catch((error) => {
      throw { message: 'No se pudo guardar en base de datos', error };
    });

    let uid = userCredentials.user?.uid;
    console.log('usuario registrado');
    this._alert.sendFloatNotification('Usuario registrado');
    this._cache.updateData('user', {email, RFC, uid});
    this._cache.updateData('rfc', RFC);

    return userCredentials

  }
}
