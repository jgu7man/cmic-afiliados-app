import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert, MxCache } from '@marxa/devkit';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { iMail } from 'src/app/admin/models/emial.model';
import { iPeticion, iUser } from 'src/app/admin/models/roles.model';
import { EmailsService } from 'src/app/admin/services/emails.service';
import { AuthService } from 'src/app/services/auth.service';
import { iCliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  current$: Observable<iCliente | null>
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
      this.retriveClient(user.email as string)
      : of(null)
      ),
      tap(user => {
        if (user) {
          console.log(user)
          this._cache.updateData('user', user)
          this._afs.doc(`clientes/${user.uid}`)
            .update({lastAccess: new Date()})
        }
      })
    )
  }


  /**
   * Obtiene el perfil del cliente solicitado por email
   *
   * @param {string} email
   * @returns {*}  {(Promise<iCliente | null>)}
   */
  async retriveClient(email: string): Promise<iCliente | null> {
    try {
      const clients = await this._afs.collection<iCliente>('clientes').ref
      .where('email', '==', email).get()
      const solicitudesRef = this._afs.collection<iCliente>('solicitudes').ref
      const peticionRef = solicitudesRef.doc(email)
      const peticionDoc = await peticionRef.get()

      if (!clients.empty && clients.size < 2) {
        return clients.docs[0].data()
      } else if (peticionDoc.exists) {
        return peticionDoc.data() as iCliente
      }
      else return null
    } catch (error) {
      console.error(error)
      this._alert.error( 'No se pudo obtener el perfil de cliente', error )
      return null
    }
  }


  /**
   * Actualiza el último acceso del cliente
   *
   * @param {string} uid
   */
  async updateLastAccess( uid: string): Promise<void> {
    try {
      await this._afs.doc( `clientes/${ uid }` ).update( { lastAccess: new Date() } )
      return
    } catch (error) {
      this._alert.error('No se pudo guardar el último acceso del cliente', error, "clients.service#updateLastAccess", false, true)
      return console.error(error)
    }
  }



  /**
   * Envia un corre de invitación a crear un perfil de cliente
   * y agrega la petición e la base de datos
   *
   * @param {string} email
   * @returns {*}  {Promise<void>}
   */
  async invite(email: string): Promise<void> {
    try {
      let stored = await this.retriveClient(email);
      const clientsRef = this._afs.collection('clientes').ref
      const splitDomain = window.location.href.split('/')
      const domain = splitDomain[0] === 'localhost' ? splitDomain[0]
        : 'https://'+splitDomain[2]
      if (!stored) {
        await clientsRef.doc( email ).set( { email } )
        let mail: iMail =  {
          to: email,
          message: {
            subject: `Invitación a CMIC`,
            text: `Se te ha invitado a registrarte como cliente en la plataforma de CMIC

            Por favor da click en el siguiente enlace:
            ${domain}/create?perfil=client&email=${email}`
          }
        }
        await this._mails.sendEmail(mail)
        return
      } else {
        this._alert.message( 'Este correo ya está registrado en la plataforma' )
        return
      }
    } catch (error) {
      this._alert.error('Error al enviar la invitación', error)
      return console.error(error)
    }
  }




/**
 * Crea una solicitud de cliente
 *
 * @param {iCliente} client
 * @returns {*}  {Promise<void>}
 */
async createSolicitud(client: iCliente): Promise<void> {
    try {
      let { email } = client
      const peticionRef = this._afs.collection('solicitudes').ref.doc(email)
      const peticionDoc = await peticionRef.get()

      await peticionRef.set({ ...client })
      this._alert.message(`
          <h1 class="center"> Petición enviada </h1>
          <p class="center"> Se ha enviado la petición a los administradores. Ahora espera un correo de confirmación.</p>
        `, 'html')
      this._alert.notify('Solicitud envida')
      return
    } catch (error) {
      this._alert.error('Error creando la solicitud de cliente', error)
      return console.error(error)
    }
  }


  async responseRequest(client: iCliente, acept: boolean) {
    try {
      let { email } = client
      const peticionRef = this._afs.collection('solicitudes').ref.doc(email)
      const peticionDoc = await peticionRef.get()
      const clientRef = this._afs.collection<iCliente>('clientes').ref.doc(email)
      const splitDomain = window.location.href.split('/')
      const domain = splitDomain[0] === 'localhost' ? splitDomain[0]
        : 'https://'+splitDomain[2]

      if (peticionDoc.exists) {
        if (acept) {
          await clientRef.set( { ...client, status: 'pendiente' } )
          let mail: iMail = {
            to: email,
            message: {
              subject: `Petición aceptada`,
              text: `Se ha aceptado la petición para registrarte como cliente en la plataforma de CMIC

              Por favor da click en el siguiente enlace para continuar con el registro:
              ${domain}/clientes/registro?email=${email}

              Si no has mandado una solicitud de registro, omite este correo`
            }
          }
          await this._mails.sendEmail(mail)
          await peticionRef.delete()
        } else {
          await peticionRef.delete()
          let mail: iMail = {
            to: email,
            message: {
              subject: `Petición denegada`,
              text: `Se ha rechazado la petición para registrarte como cliente en la plataforma de CMIC

              Para mayor información, comunícate a la CMIC Colima:
              WhatsApp: 312 319 48 20
              Facebook: https://www.facebook.com/ColimaCMIC/
              Instagram: https://instagram.com/cmiccolima
              Twitter: https://twitter.com/cmiccolima2

              Si no has mandado una solicitud de registro, omite este correo`
            }
          }
          await this._mails.sendEmail(mail)
          this._alert.notify('Petición rechazada')
        }

        return
      } else {
        this._alert.message( 'No se econtró la petición.' )
        return
      }
    } catch (error) {
      this._alert.error('Error intentando responder la petición de cliente', error)
      return console.error(error)
    }
  }

  /**
   * Crea una cuenta de cliente
   *
   * @param {iUser} user Objeto de tipo [iUser](../../../admin/models/roles.model.ts )
   * {@link ../../../admin/models/roles.model.ts#iUser}}
   * @returns {*}  {Promise<void>}
   */
  async createAccount(user: iUser): Promise<void> {
    try {
      let {email} = user
      const tempClient =  await this.retriveClient(email)

      if (!tempClient) {
        this._alert.message(`
        <h2 class="center">Email incorrecto</h2>
        <p class="center">No esperamos ninguna petición de creación de cuenta para ${email}. <br> Por favor contacta con CMIC para cualquier error </p>
      `, 'html')
      } else {
        user = { ...tempClient, ...user }
        await this._auth.createAccount(user, 'clientes')
        await this._afs.doc(`clientes/${email}`).delete()
        this._router.navigate(['/'])
      }
    } catch (error) {
      this._alert.error('Error creando cuenta de cliente', error)
     return console.error(error)
    }
  }


  /**
   * Obtiene la lista de clientes completa
   *
   * @returns {*}  {Observable<iCliente[]>}
   */
  getList(): Observable<iCliente[]> {
    return this._afs.collection<iCliente>( 'clientes' )
      .valueChanges().pipe(
        catchError( ( error ) => { throw this._alert.error('Error obteniendo la lista de clientes', error, "clients.service#getList", false, true)})
      )
  }

  /**
   * Obtiene la lista de solicitudes de clientes
   *
   * @returns {*}  Observable<(iPeticion & { id: string; })[]>
   */
  getSolicitudes(): Observable<(iPeticion & { id: string; })[]> {
    return this._afs.collection<iPeticion>('solicitudes')
      .valueChanges({ idField: 'id'}).pipe(
        catchError( ( error ) => { throw this._alert.error('Error obteniendo la lista de solicitudes de cliente', error, "clients.service#getSolicitudes", false, true)})
      )
  }
}
