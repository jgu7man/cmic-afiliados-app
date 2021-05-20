import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { take } from 'rxjs/operators';
import { ManagersService } from 'src/app/public/afiliados/services/managers.service';
import { ClientsService } from 'src/app/public/clientes/services/clients.service';
import { iAccessInvitation, iRol } from '../models/roles.model';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AccesosService {

  constructor(
    private _afs: AngularFirestore,
    private _managers: ManagersService,
    private _clients: ClientsService,
    private _admins: AdminService,
    private _alert: MxAlert,
    private _router: Router
  ) { }


  sendAccessInvitation(invitation: iAccessInvitation) {
    switch (invitation.perfil) {
      case 'manager': this.inviteManager(invitation.email)
        break;
      case 'client': this._clients.invite(invitation.email)
        break;
      case 'admin': this._admins.invite(invitation.email)
        break;
    }
  }

  private async inviteManager(email:string) {
    let stored = await this._managers.retriveManager(email)
      .pipe(take(1))
      .toPromise()

    if (!stored) {
      this._afs.collection( 'mail' ).ref.add( {
        to: email,
        message: {
          subject: `Invitación a CMIC`,
          text: `Se te ha invitado a registrarte como afiliado CMIC \n

          Por favor da click en el siguiente enlace:\n
          https://cmic-platform.web.app/afiliados/registro`
        }
      } )
      this._alert.notify('Correo enviado')
      return
    } else {
      this._alert.message('Este correo ya está registrado en la plataforma')
    }
  }


  async request(email: string) {
    await this._afs.collection('peticiones').add({
      email, request: new Date()
    })
    this._alert.notify('Petición realizada con éxito')
    this._router.navigate(['/'])
  }

  async deleteRequest(id: string) {
    this._afs.collection('peticiones').doc(id).delete()
  }


  async revoke(docPath: string) {
    await this._afs.doc(docPath).update({ access: 'revoke' })
    return
  }

  Roles: iRol[] = [
    { name: 'manager', displayName: 'Manager de afiliado'},
    { name: 'client', displayName: 'Cliente'},
    { name: 'admin', displayName: 'Administrador'},
  ]
}
