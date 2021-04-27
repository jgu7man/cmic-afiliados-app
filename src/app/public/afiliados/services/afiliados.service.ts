import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';
import { Observable, of, throwError } from 'rxjs';
import { debounceTime, flatMap, map, switchMap } from 'rxjs/operators';
import { AfiliadoModel, iAfiliadoModel, iUserAfiliado, PartialAfiliado } from '../models/afiliados.model';

@Injectable({
  providedIn: 'root',
})
export class AfiliadosService {

  afiliado$: Observable<iUserAfiliado | null>
  constructor(
    private _auth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _cache: GdevCache,
    private _router: Router,
    private _alert: GdevAlert,
    private _afAuth: AngularFireAuth
  ) {
    this.afiliado$ = this._afAuth.authState.pipe(
      switchMap(user => user ?
      this.retriveManager(user.email as string)
      : of(null)
      ))
  }

  retriveManager(email:string) {
    return this._afs.collectionGroup<iUserAfiliado>('managers', ref => ref.where('email', '==', email))
    .get().pipe(map(list => list.docs[0].data()))
  }

  /**
   * Almacena los datos parciles que se van llenando del registro
   *
   * @param {string} field: nombre del campo de la parcialidad a guardar
   * @param {PartialAfiliado} partialAafiliado parcialidad que se ha de guardar
   */
  savePartialAfiliado(field: string, partialAafiliado: PartialAfiliado, RFC: string) {
    // Obtenemos del local storage la información del usuario
    console.log( partialAafiliado )
    const user = this._cache.getDataKey<iUserAfiliado>('user');

    this._afs
      .collection('afiliados')
      .doc(user?.RFC)
      .update({
        [field]: typeof partialAafiliado != 'string' ?  { ...partialAafiliado } : partialAafiliado,
      })
      .then(() => {
        console.log('Datos guardados');
      });
  }

  async registAfiliado(afiliado: iUserAfiliado) {
    const { email, contrasena, RFC } = afiliado;
    try {
      const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
      const afiliadoDoc = await afiliadoRef.get();
      if (afiliadoDoc.exists) {
        throw {
          message:
            'Esta empresa ya está registrada. Si necesitas accesos, contacta a un administrador de la empresa o con CMIC directamente',
        };
      } else {
        const userCredentials = await this._auth
          .createUserWithEmailAndPassword(email, contrasena ? contrasena :  '' )
          .catch((error) => {
            throw { message: 'No se pudo crear el usuario', error };
          });

        afiliadoRef.set({ creado: new Date() });


        const userRef = afiliadoRef
          .collection('managers')
          .doc(userCredentials.user?.uid);

        userRef.set({ email, RFC, registrado: new Date() }).catch((error) => {
          throw { message: 'No se pudo guardar en base de datos', error };
        });

        afiliado.uid = userCredentials.user?.uid;
        console.log('usuario registrado');
        this._alert.sendFloatNotification('Usuario registrado');
        this._cache.updateData('user', afiliado);
        this._cache.updateData('rfc', afiliado.RFC);
        this._router.navigate(['/afiliados/afiliacion', RFC]);
      }
      /*
      console.log('usuario registrado')
      this._cache.updateData('user', userCredentials.user)
      this._router.navigate(['/afiliados/afiliacion'])*/
    } catch (e) {
      this._alert.sendMessageAlert(e.message);
      console.error(e);
    }
  }

  getPerfilAfiliado(RFC: string): Observable<AfiliadoModel | undefined>{
    return this._afs.collection('afiliados')
      .doc<AfiliadoModel>(RFC).valueChanges()
      .pipe(debounceTime(500))
  }


  // getPartialAfiliado(RFC: string):

}
