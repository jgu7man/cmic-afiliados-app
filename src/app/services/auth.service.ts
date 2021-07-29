import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert } from '@marxa/devkit';
import { MxCache } from '@marxa/devkit';
import { iUser } from '../admin/models/roles.model';
import { iManager } from '../public/afiliados/models/afiliados.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _afs: AngularFirestore,
    private _afAuth: AngularFireAuth,
    private _alert: MxAlert,
    private _cache: MxCache
  ) { }

  /** Crea la cuenta de manager en firebase
   * @param {iManager} { email, contrasena, RFC }
   * @returns {userCredentials}
   */
  async createManagerAccount(manager: iManager) {
    let { email, contrasena, RFC, confcontrasena, ...managerData  } = manager;
    try {
      const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
      const userCredentials = await this._afAuth
        .createUserWithEmailAndPassword(email, contrasena ? contrasena :  '' )
        .catch((error) => {
          throw { message: 'No se pudo crear el usuario', error };
        });

      const userRef = afiliadoRef
        .collection('managers')
        .doc(userCredentials.user?.uid);

      userRef.set({
        ...managerData,
        email, RFC,
        uid: userCredentials.user?.uid,
        registrado: new Date()
      }).catch((error) => {
        throw { message: 'No se pudo guardar en base de datos', error };
      });

      let uid = userCredentials.user?.uid;
      this._alert.notify('Usuario registrado');
      this._cache.updateData('user', {...manager.personal_data, RFC, uid});
      this._cache.updateData('rfc', RFC);

      return userCredentials
    } catch (error) {
      this._alert.error(`No fue posible crear la cuenta de manager para ${email} en ${RFC}`, error)
      return console.error(error)
    }

  }



  async createAccount(user: iUser, collection: 'clientes' | 'admins') {
    let { email, contrasena, confcontrasena, ...userData } = user
    try {
      const clientsRef = this._afs.collection(collection)
      const userCredentials = await this._afAuth
        .createUserWithEmailAndPassword(email, contrasena ? contrasena :  '' )
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            throw this._alert.message('No se pudo crear el usuario por que el correo ya está en uso')
          } else {
            this._alert.error('No se pudo crear el usuario firebase authentication', error)
            throw { message: 'No se pudo crear el usuario en firebase authentication', error }
          };
        });

      const userRef = clientsRef.doc(userCredentials.user?.uid);

      userRef.set({
        ...userData,
        email,
        uid: userCredentials.user?.uid,
        registrado: new Date()
      }).catch((error) => {
        throw { message: 'No se pudo guardar en base de datos', error };
      });

      let uid = userCredentials.user?.uid;
      this._alert.notify('Usuario registrado');
      this._cache.updateData('user', {...userData, email, uid});

      return userCredentials
    } catch (error) {
      this._alert.error(`No fue posible crear la cuenta en ${collection} para ${email}`, error)
      return console.error(error)
    }

  }
}
