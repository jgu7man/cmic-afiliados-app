import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AfiliadoModel, iManager } from '../models/afiliados.model';
import { AfiliadosService } from './afiliados.service';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  current$: Observable<iManager | null>
  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _cache: GdevCache,
    private _router: Router,
    private _alert: GdevAlert,
    private _auth: AuthService
  ) {
    this.current$ = this._afAuth.authState.pipe(
      switchMap(user => user ?
      this.retriveManager(user.email as string)
      : of(null)
      ),
      tap(user => {
        if (user) {
          console.log( user )
          this._afs.doc(`afiliados/${user.RFC}/managers/${user.uid}`)
            .update({lastAccess: new Date()})
      }})
    )
  }

  /** Retorna la primera cuenta de manager que obtiene al buscar por email */
  retriveManager(email:string) {
    return this._afs.collectionGroup<iManager>('managers',
      ref => ref.where('email', '==', email)).get()
      .pipe(map(list => {
        if (list.docs.length > 0) {
          return list.docs[0].data()
        } else  return null
      }))
  }


  getCompleteList() {
    return this._afs.collectionGroup<iManager>('managers')
      .valueChanges({ idField: 'uid' })
  }



    getForAfiliado() {
      let rfc = this._cache.getDataKey<string>('rfc')
      return this._afs.collection<iManager>(`afiliados/${rfc}/managers`).valueChanges({idField: 'uid'})
    }


    async add(email: string) {
      let RFC = this._cache.getDataKey<string>('rfc')
      let user: iManager = this._cache.getDataKey<iManager>('user') as iManager

      const managersRef = this._afs.collection(`afiliados/${RFC}/managers`).ref
      const list = await managersRef.where('email', '==', email).get();
      if (list.empty) {

        const perfil = await this._getPerfil(RFC as string)
        await managersRef.doc(email).set({ email, RFC })

        this._afs.collection( 'mail' ).ref.add( {
          to: email,
          message: {
            subject: `Invitación a CMIC`,
            text: `Se te ha invitado a ser administrador del perfil de afiliado CMIC de la empresa \n

            \t ${perfil.comercial_nombre} \n

            Por favor da click en el siguiente enlace:\n
            https://cmic-platform.web.app/create?perfil=manager&email=${email}&rfc=${RFC}"`
          }
        } )
        this._alert.sendFloatNotification('Correo enviado')
        return

      }

    }


    async createManager({email, contrasena, RFC}:iManager) {
      const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
      const perfil = await this._getPerfil(RFC)

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
            <p class="center">No esperamos ninguna petición de creación de cuenta para ${perfil?.comercial_nombre}. <br> Por favor contacta con CMIC para cualquier error </p>
          `, 'html')
        } else {

          await this._auth.createManagerAccount({ email, contrasena, RFC })
          emailRef.delete()
          this._router.navigate(['/afiliados/perfil']);
        }
      }

    }


    async delete(id: string) {
      let rfc = this._cache.getDataKey<string>('rfc')
      let user: iManager = this._cache.getDataKey<iManager>('user') as iManager
      const managersRef = this._afs.collection(`afiliados/${rfc}/managers`).ref
      await managersRef.doc(id).delete()
      this._alert.sendFloatNotification('Perfil eliminado')
      return
    }


  private async _getPerfil(RFC: string) {
    const perfilRef = this._afs.collection<AfiliadoModel>('afiliados').doc(RFC)
    return await perfilRef.get().pipe(take(1),
      debounceTime(500),
      map(afiliado => afiliado.get('datos_generales') ),
    ).toPromise()
  }
}
