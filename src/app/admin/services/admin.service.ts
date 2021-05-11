import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { iManager } from 'src/app/public/afiliados/models/afiliados.model';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _afs: AngularFirestore,
    private _alert: GdevAlert,
    private _auth: AuthService,
    private _router: Router
  ) { }





  async retriveAdmin(email: string) {
    const clients = await this._afs.collection('admins').ref
      .where('email', '==', email).get()
    if (!clients.empty && clients.size < 2) {
      return clients.docs[0].data()
    }
  }

  async invite(email: string) {
    let stored = await this.retriveAdmin(email);
    const adminsRef = this._afs.collection('admins').ref
    if (!stored) {
      adminsRef.doc(email).set({ email })
      this._afs.collection( 'mail' ).ref.add( {
        to: email,
        message: {
          subject: `Invitación a CMIC`,
          text: `Se te ha invitado a registrarte como administrador de la plataforma de CMIC \n

          Por favor da click en el siguiente enlace:\n
          https://cmic-platform.web.app/create?perfil=admin&email=${email}`
        }
      } )
      this._alert.sendFloatNotification('Correo enviado')
      return
    } else {
      this._alert.sendMessageAlert('Este correo ya está registrado en la plataforma')
    }
  }


  async createAccount({email, contrasena}: any) {
    const adminsRef = this._afs.collection('admins').ref
    const tempRef =  adminsRef.doc(email)
    const tempDoc = await tempRef.get()
    if (!tempDoc.exists) {
      this._alert.sendMessageAlert(`
      <h2 class="center">Email incorrecto</h2>
      <p class="center">No esperamos ninguna petición de creación de cuenta para ${email}. <br> Por favor contacta con CMIC para cualquier error </p>
    `, 'html')
    } else {
      this._auth.createAccount({ email, contrasena }, 'admins')
      tempRef.delete()
      this._router.navigate(['/admin'])
    }
  }

}
