import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { iMail, iMailResponse } from '../models/emial.model';
import firebase from 'firebase/app'
import { MxAlert } from '@marxa/devkit';
import { filter, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  mailCollection: string = 'mail'
  constructor (
    private _afs: AngularFirestore,
    private _alert: MxAlert
  ) { }


  /**
   * Envia el correo proporcionado y notifica si el envío tuvo éxito o error
   *
   * @param {iMail} mail
   * @returns {Promise<void>}  Promise<void>
   */
  async sendEmail( mail: iMail ): Promise<void> {
    try {
      const mailsCol = this._afs.collection( this.mailCollection )
      const mailRef = await mailsCol.add(mail)
      const mailId = mailRef.id
      return new Promise<void>( ( resolve, reject ) => {
        console.log( mailId )
        mailsCol.doc<iMail>( mailId ).valueChanges().pipe(
          map<iMail | undefined, iMailResponse | undefined>( doc => {
            console.log( doc )
            if ( doc && doc.delivery ) return doc.delivery
            else return undefined
          }),
        ).subscribe( delivery => {
          console.log( delivery )
          if( delivery ){
            if ( delivery.state == 'ERROR' || delivery.state == 'SUCCESS' ) {
              if ( delivery.state == 'ERROR' ) {
                this._alert.notify( 'Error al enviar el correo' )
                reject( {
                  message: 'Error al enviar el correo',
                  state: delivery.state,
                  error: delivery.error
                } )
              } else {
                resolve( this._alert.notify( 'Mail enviado con éxito' ) )
              }
          } else {
              this._alert.notify(`Email status: ${delivery.state}`)
          }
          }
        })
      })
    } catch (error) {
      this._alert.error('No se pudo enviar el correo', error)
      return console.error(error)
    }
  }
}

