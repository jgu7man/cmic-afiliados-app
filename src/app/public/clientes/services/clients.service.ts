import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { iPeticion, iUser } from 'src/app/admin/models/roles.model';
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
    private _router: Router
  ) {
    this.current$ = this._afAuth.authState.pipe(
      switchMap(user => user ?
      this.retriveClient(user.email as string)
      : of(null)
      ),
      tap(user => {
        if (user) {
          console.log( user )
          this._afs.doc(`clientes/${user.uid}`)
            .update({lastAccess: new Date()})
        }
      })
    )
  }


  async retriveClient(email: string) {
    const clients = await this._afs.collection<iCliente>('clientes').ref
      .where('email', '==', email).get()
    const peticionesRef = this._afs.collection<iCliente>('peticiones').ref
    const peticionRef = peticionesRef.doc(email)
    const peticionDoc = await peticionRef.get()

    if (!clients.empty && clients.size < 2) {
      return clients.docs[0].data()
    } else if (peticionDoc.exists) {
      return peticionDoc.data() as iCliente
    }
    else return null
  }

  updateLastAccess( uid: string) {
    this._afs.doc(`clientes/${uid}`).update({lastAccess: new Date()})
  }



  async invite(email: string) {
    let stored = await this.retriveClient(email);
    const clientsRef = this._afs.collection('clientes').ref
    const splitDomain = window.location.href.split('/')
    const domain = splitDomain[0] === 'localhost' ? splitDomain[0]
      : 'https://'+splitDomain[2]
    if (!stored) {
      clientsRef.doc(email).set({ email })
      this._afs.collection( 'mail' ).ref.add( {
        to: email,
        message: {
          subject: `Invitación a CMIC`,
          text: `Se te ha invitado a registrarte como cliente en la plataforma de CMIC

          Por favor da click en el siguiente enlace:
          ${domain}/create?perfil=client&email=${email}`
        }
      } )
      this._alert.notify('Correo enviado')
      return
    } else {
      this._alert.message('Este correo ya está registrado en la plataforma')
    }
  }





  async createSolicitud(client: iCliente) {
    let { email } = client


    const peticionRef = this._afs.collection('peticiones').ref.doc(email)
    const peticionDoc = await peticionRef.get()

    peticionRef.set({ ...client })
    this._alert.message(`
        <h1 class="center"> Petición enviada </h1>
        <p class="center"> Se ha enviado la petición a los administradores. Ahora espera un correo de confirmación.</p>
      `, 'html')
    this._alert.notify('Solicitud envida')
    return
  }

  async responseRequest(client: iCliente, acept: boolean) {
    let { email } = client
    const peticionRef = this._afs.collection('peticiones').ref.doc(email)
    const peticionDoc = await peticionRef.get()
    const clientRef = this._afs.collection<iCliente>('clientes').ref.doc(email)
    const splitDomain = window.location.href.split('/')
    const domain = splitDomain[0] === 'localhost' ? splitDomain[0]
      : 'https://'+splitDomain[2]

    if (peticionDoc.exists) {
      if (acept) {
        await clientRef.set({ ...client, status: 'pendiente' })
        await this._afs.collection( 'mail' ).ref.add( {
          to: email,
          message: {
            subject: `Petición aceptada`,
            text: `Se ha aceptado la petición para registrarte como cliente en la plataforma de CMIC

            Por favor da click en el siguiente enlace para continuar con el registro:
            ${domain}/clientes/registro?email=${email}

            Si no has mandado una solicitud de registro, omite este correo`
          }
        })
        await peticionRef.delete()
        this._alert.notify('Correo enviado')
      } else {
        await peticionRef.delete()
        await this._afs.collection( 'mail' ).ref.add( {
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
        })
        this._alert.notify('Petición rechazada')
      }


      return
    } else {
      this._alert.message('No se econtró la petición.')
    }
  }

  async createAccount(user: iUser) {
    let {email} = user
    const tempClient =  await this.retriveClient(email)

    if (!tempClient) {
      this._alert.message(`
      <h2 class="center">Email incorrecto</h2>
      <p class="center">No esperamos ninguna petición de creación de cuenta para ${email}. <br> Por favor contacta con CMIC para cualquier error </p>
    `, 'html')
    } else {
      user = { ...tempClient, ...user }
      console.log( user )
      await this._auth.createAccount(user, 'clientes')
      this._afs.doc(`clientes/${email}`).delete()
      this._router.navigate(['/'])
    }
  }


  getList() {
    return this._afs.collection<iCliente>('clientes').valueChanges()
  }

  getPeticiones() {
    return this._afs.collection<iPeticion>('peticiones')
      .valueChanges({ idField: 'id'})
  }
}
