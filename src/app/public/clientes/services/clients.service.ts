import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevAlert } from 'gdev-alert';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private _afs: AngularFirestore,
    private _alert: GdevAlert
  ) { }


  async retriveClient(email: string) {
    const clients = await this._afs.collection('clientes').ref
      .where('email', '==', email).get()
    if (!clients.empty && clients.size < 2) {
      return clients.docs[0].data()
    }
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
          https://cmic-platform.web.app/clientes/registro?email=${email}`
        }
      } )
      this._alert.sendFloatNotification('Correo enviado')
      return
    } else {
      this._alert.sendMessageAlert('Este correo ya está registrado en la plataforma')
    }
  }
}
