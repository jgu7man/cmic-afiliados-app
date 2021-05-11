import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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
    private _alert: GdevAlert,
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
    if (!clients.empty && clients.size < 2) {
      return clients.docs[0].data()
    } else return null
  }


  async invite(email: string) {
    let stored = await this.retriveClient(email);
    const clientsRef = this._afs.collection('clientes').ref
    if (!stored) {
      clientsRef.doc(email).set({ email })
      this._afs.collection( 'mail' ).ref.add( {
        to: email,
        message: {
          subject: `Invitación a CMIC`,
          text: `Se te ha invitado a registrarte como cliente en la plataforma de CMIC \n

          Por favor da click en el siguiente enlace:\n
          https://cmic-platform.web.app/create?perfil=client&email=${email}`
        }
      } )
      this._alert.sendFloatNotification('Correo enviado')
      return
    } else {
      this._alert.sendMessageAlert('Este correo ya está registrado en la plataforma')
    }
  }



  async createAccount({email, contrasena}: any) {
    const clientsRef = this._afs.collection('clientes').ref
    const tempClient =  clientsRef.doc(email)
    const tempDoc = await tempClient.get()
    if (!tempDoc.exists) {
      this._alert.sendMessageAlert(`
      <h2 class="center">Email incorrecto</h2>
      <p class="center">No esperamos ninguna petición de creación de cuenta para ${email}. <br> Por favor contacta con CMIC para cualquier error </p>
    `, 'html')
    } else {
      this._auth.createAccount({ email, contrasena }, 'clientes')
      tempClient.delete()
      this._router.navigate(['/'])
    }
  }


  getList() {
    return this._afs.collection<iCliente>('clientes').valueChanges()
  }
}
