import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { AuthService } from 'src/app/services/auth.service';
import { iAdmin } from '../models/admin.model';
import { iUser } from '../models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _afs: AngularFirestore,
    private _alert: MxAlert,
    private _auth: AuthService,
    private _router: Router
  ) { }





  async retriveAdmin(email: string) {
    const clients = await this._afs.collection('admins').ref
      .where('email', '==', email).get()
    if (!clients.empty && clients.size < 2) {
      return clients.docs[0].data() as iAdmin
    } else {
      return null
    }
  }

  async invite(email: string) {
    let stored = await this.retriveAdmin(email);
    const adminsRef = this._afs.collection('admins').ref
    let urlSplited = window.location.href.split('/')
    let currentURL = urlSplited[2].includes('localhost')
      ? 'localhost:4200' : `https://${urlSplited[2]}`
    if (!stored) {
      adminsRef.doc(email).set({ email })
      this._afs.collection( 'mail' ).ref.add( {
        to: email,
        message: {
          subject: `Invitación a CMIC`,
          text: `Se te ha invitado a registrarte como administrador de la plataforma de CMIC \n

          Por favor da click en el siguiente enlace:\n
          ${currentURL}/admin/create?perfil=admin&email=${email}`
        }
      } )
      this._alert.notify('Correo enviado')
      return
    } else {
      this._alert.message('Este correo ya está registrado en la plataforma')
    }
  }


  async createAccount(user: iUser) {
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
  }


  getList() {
    return this._afs.collection<iAdmin>('admins')
      .valueChanges({ idField: 'uid' })
  }

}
