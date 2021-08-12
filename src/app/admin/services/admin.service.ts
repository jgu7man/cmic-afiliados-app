import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert, MxCache } from '@marxa/devkit';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { iAdmin } from '../models/admin.model';
import { iMail } from '../models/emial.model';
import { iUser } from '../models/roles.model';
import { EmailsService } from './emails.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  current$: Observable<iAdmin | null>

  constructor(
    private _afs: AngularFirestore,
    private _afAuth: AngularFireAuth,
    private _alert: MxAlert,
    private _auth: AuthService,
    private _router: Router,
    private _cache: MxCache,
    private _mails: EmailsService
  ) {
    this.current$ = this._afAuth.authState.pipe(
      switchMap(user => user ?
        this.retriveAdmin(user.email as string) :
        of(null)
      ),
      tap(user => {
        if (user) {
          this._cache.updateData('user', user)
          this._afs.doc(`admins/${user.uid}`).update({lastAccess: new Date()})
        }
      })
    )
   }





  /**
   * Obtiene el admistrador solicitado
   *
   * @param {string} email
   * @returns {*}
   */
  async retriveAdmin(email: string) {
    try {
      const clients = await this._afs.collection('admins').ref
      .where('email', '==', email).get()
      if (!clients.empty && clients.size < 2) {
        return clients.docs[0].data() as iAdmin
      } else {
        return null
      }
    } catch (error) {
      this._alert.error('Error al obtener el administrador', error, false, true)
      console.error( error )
      return null
    }
  }

  /**
   * Envia un email de invitación para ser administrador de la plataforma
   *
   * @param {string} email
   * @returns {*}  {Promise<void>}
   */
  async invite(email: string): Promise<void> {
    try {
      let stored = await this.retriveAdmin(email);
      const adminsRef = this._afs.collection('admins').ref
      let urlSplited = window.location.href.split('/')
      let currentURL = urlSplited[2].includes('localhost')
        ? 'localhost:4200' : `https://${urlSplited[2]}`
      if (!stored) {
        await adminsRef.doc( email ).set( { email } );
        let mail: iMail = {
          to: email,
          message: {
            subject: `Invitación a CMIC`,
            text: `Se te ha invitado a registrarte como administrador de la plataforma de CMIC \n

            Por favor da click en el siguiente enlace:\n
            ${currentURL}/admin/create?perfil=admin&email="${email}"`
          }
        }
        await this._mails.sendEmail(mail)
        return
      } else {
        this._alert.message('Este correo ya está registrado en la plataforma')
      }
    } catch (error) {
      this._alert.error('Error al enviar invitación para el administrador', error)
      console.error(error)
    }
  }


  /**
   * Crea cuenta de adminitrador
   *
   * @param {iUser} user Objeto de formato `iUser`
   */
  async createAccount(user: iUser) {
    try {
      let {email} = user
      const adminsRef = this._afs.collection('admins').ref
      const tempRef =  adminsRef.doc(email)
      const tempDoc = await tempRef.get()
      if (!tempDoc.exists) {
        this._alert.message(`
        <h2 class="center">Email incorrecto</h2>
        <p class="center">No esperamos ninguna petición de creación de cuenta para ${email}. <br> Por favor contacta con CMIC para cualquier error </p>
      `, 'html')
      } else {
        this._auth.createAccount(user, 'admins')
        tempRef.delete()
        this._router.navigate(['/admin'])
      }
    } catch (error) {
      console.error(error)
      this._alert.error('Error intentado crear la cuenta de adminsitrador', error)
    }
  }

  /**
   * Obtiene la lista de adminsitradores como Observable
   *
   * @returns {*}  {(Observable<(iAdmin & { uid: string; })[]>)}
   */
  getList(): Observable<(iAdmin & { uid: string; })[]> {
    return this._afs.collection<iAdmin>('admins')
      .valueChanges( { idField: 'uid' } ).pipe(
        catchError( ( error ) => { throw this._alert.error('No se pudo obtener la lista de administradores', error)})
      )
  }

}
