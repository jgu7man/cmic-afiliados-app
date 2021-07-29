import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { take } from 'rxjs/operators';
import { ManagersService } from 'src/app/public/afiliados/services/managers.service';
import { ClientsService } from 'src/app/public/clientes/services/clients.service';
import { iMail } from '../models/emial.model';
import { iAccessInvitation, iRol } from '../models/roles.model';
import { AdminService } from './admin.service';
import { EmailsService } from './emails.service';

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
    private _router: Router,
    private _mails: EmailsService
  ) { }

  /**
   * Envía invitación al perfil solicitado
   *
   * @param {iAccessInvitation} invitation Objeto de tipo iAccessInvitation:
   * { email: `string`; perfil: `'manager' | 'client' | 'admin'` }
   */
  sendAccessInvitation(invitation: iAccessInvitation): void {
    switch (invitation.perfil) {
      case 'manager': this.inviteManager(invitation.email)
        break;
      case 'client': this._clients.invite(invitation.email)
        break;
      case 'admin': this._admins.invite(invitation.email)
        break;
    }
  }



  /**
   * Envia la invitación por correo electrónico de manager al correo proporcionado
   *
   * @private
   * @param {string} email
   * @returns {*}  {Promise<void>}
   */
  private async inviteManager(email:string): Promise<void> {
    try {
      let stored = await this._managers.retriveManager(email)
        .pipe(take(1))
        .toPromise()

      let urlSplited = window.location.href.split('/')
      let currentURL = urlSplited[2].includes('localhost')
        ? 'localhost:4200' : `https://${urlSplited[2]}`


      if (!stored) {
        let mail: iMail = {
          to: email,
          message: {
            subject: `Invitación a CMIC`,
            text: `Se te ha invitado a registrarte como afiliado CMIC \n

            Por favor da click en el siguiente enlace:\n
            ${currentURL}/afiliados/registro`
          }
        }
        await this._mails.sendEmail( mail)
        return
      } else {
        this._alert.message('Este correo ya está registrado en la plataforma')
      }
    } catch (error) {
      this._alert.error('No se pudo enviar la invitación para ser manager', error)
      return console.error(error)
    }
  }

/**
 * Realiza una petición de acceso como cliente a la plataforma
 *
 * @param {string} email Correo con el cuál se solicita el acceso
 * @returns {*}  {Promise<void>} Alerta de confirmación
 */
async requestAsClient(email: string): Promise<void> {
    try {
      await this._afs.collection('peticiones').add({
        email, request: new Date()
      })
      this._alert.notify('Petición realizada con éxito')
      this._router.navigate(['/'])
    } catch (error) {
      this._alert.error('Error al hacer la petición de acceso', error)
      return console.error(error)
    }
  }


  /**
   * Elimina las peticiones de acceso a través del ID proporcionado
   *
   * @param {string} id
   * @returns {*}  {Promise<void>} Notificación de eliminación
   */
  async deleteRequest(id: string): Promise<void> {
    try {
      await this._afs.collection( 'peticiones' ).doc( id ).delete()
      this._alert.notify('Petición de acceso de cliente eliminada')
    } catch (error) {
      this._alert.error('Error al eliminar la petición de acceso', error)
      return console.error(error)
    }
  }


  /**
   * Revoca el acceso al perfil proporcionado
   *
   * @param {string} docPath ruta de acceso al perfil
   * @returns {*}
   */
  async revokeAdmin(docPath: string) {
    try {
      await this._afs.doc(docPath).update({ access: 'revoke' })
      return this._alert.notify('Acceso de administrador revocado')
    } catch (error) {
      this._alert.error('Error al revocar el acceso de administrador', error)
      return console.error(error)
    }
  }

  Roles: iRol[] = [
    { name: 'manager', displayName: 'Manager de afiliado'},
    { name: 'client', displayName: 'Cliente'},
    { name: 'admin', displayName: 'Administrador'},
  ]
}
