import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';
import { Observable, of, throwError } from 'rxjs';
import { debounceTime, flatMap, map, switchMap, take } from 'rxjs/operators';
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
    const { RFC } = afiliado;
    try {
      const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
      const afiliadoDoc = await afiliadoRef.get();
      if (afiliadoDoc.exists) {
        throw {
          message:
            'Esta empresa ya está registrada. Si necesitas accesos, contacta a un administrador de la empresa o con CMIC directamente',
        };
      } else {

        await this._createFirebaseUser(afiliado)
        afiliadoRef.set({ creado: new Date() });
        this._router.navigate(['/afiliados/afiliacion', RFC]);
      }

    } catch (e) {
      this._alert.sendMessageAlert(e.message);
      console.error(e);
    }
  }


  private async _createFirebaseUser({ email, contrasena, RFC }: iUserAfiliado) {
    const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
    const userCredentials = await this._auth
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

  getPerfilAfiliado(RFC: string): Observable<AfiliadoModel | undefined>{
    return this._afs.collection('afiliados')
      .doc<AfiliadoModel>(RFC).valueChanges()
      .pipe(debounceTime(500))
  }


  getManagers() {
    let rfc = this._cache.getDataKey<string>('rfc')
    return this._afs.collection<iUserAfiliado>(`afiliados/${rfc}/managers`).valueChanges({idField: 'uid'})
  }


  async addManager(email: string) {
    let RFC = this._cache.getDataKey<string>('rfc')
    let user: iUserAfiliado = this._cache.getDataKey<iUserAfiliado>('user') as iUserAfiliado

    const managersRef = this._afs.collection(`afiliados/${RFC}/managers`).ref
    const list = await managersRef.where('email', '==', email).get();
    if (list.empty) {

      const perfil = await this.getPerfilAfiliado(RFC as string).pipe(take(1)).toPromise()
      await managersRef.doc(email).set({ email, RFC })

      this._afs.collection( 'mail' ).ref.add( {
        to: email,
        message: {
          subject: `Invitación a CMIC`,
          text: `Se te ha invitado a ser administrador del perfil de afiliado CMIC de la empresa \n

          \t ${perfil?.datos_generales.comercial_nombre} \n

          Por favor da click en el siguiente enlace:\n
          https://cmic-platform.web.app/create?email=${email}&rfc=${RFC}"`
        }
      } )
      this._alert.sendFloatNotification('Correo enviado')
      return



    }

  }


  async createManager({email, contrasena, RFC}:iUserAfiliado) {
    const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
    const perfil = await this.getPerfilAfiliado(RFC).pipe(take(1)).toPromise()

    console.log( { email, RFC, perfil} )
    if (!RFC || !perfil) {
      this._alert.sendMessageAlert(`
        <h2 class="center">Perfil de empresa no encontrado</h2>
        <p class="center">No se encontró la empresa para esta acción. <br>
        Por favor revisa el enlace que usaste, debe ser el que recibiste por email o contacta con la CMIC</p>
      `, 'html')
    } else {

      const emailRef = afiliadoRef.collection('managers').doc(email)
      const emailDoc = await emailRef.get()

      if (!emailDoc.exists) {
        this._alert.sendMessageAlert(`
          <h2 class="center">Email incorrecto</h2>
          <p class="center">No esperamos ninguna petición de creación de cuenta para ${perfil?.datos_generales.comercial_nombre}. <br> Por favor contacta con CMIC para cualquier error </p>
        `, 'html')
      } else {

        await this._createFirebaseUser({ email, contrasena, RFC })
        emailRef.delete()
        this._router.navigate(['/afiliados/perfil']);
      }
    }

  }


  async deleteManager(id: string) {
    let rfc = this._cache.getDataKey<string>('rfc')
    let user: iUserAfiliado = this._cache.getDataKey<iUserAfiliado>('user') as iUserAfiliado
    const managersRef = this._afs.collection(`afiliados/${rfc}/managers`).ref
    await managersRef.doc(id).delete()
    this._alert.sendFloatNotification('Perfil eliminado')
    return
  }

}
