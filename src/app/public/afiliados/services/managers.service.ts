import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { MxCache } from '@marxa/devkit';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { EmailsService } from 'src/app/admin/services/emails.service';
import { AuthService } from 'src/app/services/auth.service';
import { AfiliadoModel, iManager } from '../models/afiliados.model';
import { AfiliadosService } from './afiliados.service';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  current$: Observable<iManager | null>
  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _cache: MxCache,
    private _router: Router,
    private _alert: MxAlert,
    private _auth: AuthService,
    private _mails: EmailsService
  ) {
    this.current$ = this._afAuth.authState.pipe(
      switchMap(user => user ?
      this.retriveManager(user.email as string)
      : of(null)
      ),
      tap(user => {
        if (user) {
          this._cache.updateData('user', user)
          this._afs.doc(`afiliados/${user.RFC}/managers/${user.uid}`)
            .update({lastAccess: new Date()})
      }})
    )
  }

  /** Retorna la primera cuenta de manager que obtiene al buscar por email
   * @param {string} email
   * @returns {*}
   */
  retriveManager(email:string) {
    return this._afs.collectionGroup<iManager>('managers',
      ref => ref.where('email', '==', email)).get()
      .pipe(map(list => {
        if (list.docs.length > 0) {
          return list.docs[0].data()
        } else  return null
      } ),
        catchError( (error, user) => {
          this._alert.error( 'Error al cargar este usuario', error, false, true )
          return user
        } )
      )
  }


  /** Actualiza el último acceso del manager de la empresa afiliada
   * @param {string} RFC Clave RFC
   * @param {string} uid ID del manager a buscar
   * @returns {*}
   */
  async updateLastAccess(RFC: string, uid: string): Promise<void> {
    try {
      await this._afs.doc( `afiliados/${ RFC }/managers/${ uid }` )
        .update( { lastAccess: new Date() } )
      return
    } catch (error) {
      this._alert.error(`Error cargando el último acceso de ${RFC}`, error, false, true)
      return console.error(error)
    }
  }

  /** Obtiene la lista completa de managers de todas las empresas
   * @returns {*}  {(Observable<iManager[]>)}
   */
  getCompleteList(): Observable<iManager[]> {
    return this._afs.collectionGroup<iManager>('managers')
      .valueChanges( { idField: 'uid' } ).pipe(
        catchError( ( error ) => {
          throw this._alert.error( 'Error cargando la lista de managers', error )
        }),
      )
  }


  /** Obtiene los managers por RFC
   * @returns {*}  {(Observable<string | (iManager & { uid: string; })[]>)}
   */
  getForAfiliado(RFC?: string): Observable<(iManager & { uid: string; })[]> {
    let rfc = RFC || this._cache.getDataKey<string>('rfc')
    return this._afs.collection<iManager>( `afiliados/${ rfc }/managers` )
      .valueChanges( { idField: 'uid' } ).pipe(
        catchError( (error) => { throw this._alert.error('No se pudo obtener el afiliado', error)})
      )
  }

/** Agrega un manager a través del RFC en curso
 * @param {string} email
 * @returns {*} Promise<void>
 */
async add(email: string): Promise<void> {
    try {
      let RFC = this._cache.getDataKey<string>('rfc')
      let user: iManager = this._cache.getDataKey<iManager>('user') as iManager

      const managersRef = this._afs.collection(`afiliados/${RFC}/managers`).ref
      const list = await managersRef.where('email', '==', email).get();
      if (list.empty) {

        const perfil = await this._getPerfil(RFC as string)
        await managersRef.doc(email).set({ email, RFC })
        let urlSplited = window.location.href.split('/')
        let currentURL = urlSplited[2].includes('localhost')
          ? 'localhost:4200' : `https://${urlSplited[2]}`

        let mail = {
          to: email,
          message: {
            subject: `Invitación a CMIC`,
            text: `Se te ha invitado a ser administrador del perfil de afiliado CMIC de la empresa \n

            \t ${perfil.comercial_nombre} \n

            Por favor da click en el siguiente enlace:\n
            ${currentURL}/create?perfil=manager&email="${email}"&rfc=${RFC}"`
          }
        }
        await this._mails.sendEmail(mail)
        this._alert.notify('Correo enviado')
        return

      }

    } catch (error) {
      this._alert.error('No fue posible agregar el manager', error)
      return console.error(error)
    }
  }


  /**
   * Crea la cuenta de manager previamente esperada por la base de datos
   * @param {iManager} manager Objeto de tipo iManager
   * @returns {*}  {Promise<void>}
   */
  async   createManager({email, RFC, ...rest}:iManager): Promise<void> {
    try {
      const afiliadoRef = this._afs
        .collection<AfiliadoModel>( 'afiliados' ).doc( RFC ).ref;
      const afiliadoDoc = await afiliadoRef.get()
      const perfil = await this._getPerfil( RFC )
      email = email.replace( /\"/g, '' ).replace( /\//g, '' ).replace( /\'/g, '' ).replace( /\s/g, '' ).trim()

      console.log( email )

      if (!RFC || !perfil) {
        this._alert.message(`
          <h2 class="center">Perfil de empresa no encontrado</h2>
          <p class="center">No se encontró la empresa para esta acción. <br>
          Por favor revisa el enlace que usaste, debe ser el que recibiste por email o contacta con la CMIC</p>
        `, 'html')
      } else {

        const emailRef = afiliadoRef.collection('managers').doc(email)
        const emailDoc = await emailRef.get()

        if (!emailDoc.exists) {
          this._alert.message(`
            <h2 class="center">Email incorrecto</h2>
            <p class="center">No esperamos ninguna petición de creación de cuenta para ${perfil?.comercial_nombre}. <br> Por favor contacta con CMIC para cualquier error </p>
          `, 'html')
        } else {
          let afiliado: AfiliadoModel = afiliadoDoc.data() as AfiliadoModel
          let manager: iManager = {
            email, RFC, ...rest
          }
          await this._auth.createManagerAccount(manager)

          if (!afiliado.contacto
            || !afiliado.domicilio
            || !afiliado.representante_legal) {
            this._router.navigate(['/afiliados/afiliacion', RFC]);

          } else if (!afiliado.fuentes_de_trabajo
            || !afiliado.servicios_profesionales
            || !afiliado.tipos_de_obra) {
            this._router.navigate(['/afiliados/elegir-actividades', RFC]);

          } else {
            this._router.navigate([ '/afiliados/perfil', RFC])
          }

        }
      }

    } catch (error) {
      console.error(error)
      this._alert.error( 'No fue posible crear la cuenta', error, false, true )
      this._alert.message('No fue posible crear la cuenta. Inténtalo después o puedes ponerte en contacto con la CMIC para cualquier duda.')
    }
  }

  /**
   * Elimina la cuenta de manager de la empresa en curso de la interfaz
   * a través de id de manager
   * @param {string} id
   * @returns {*}  {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    try {
      let rfc = this._cache.getDataKey<string>('rfc')
      const managersRef = this._afs.collection(`afiliados/${rfc}/managers`).ref
      await managersRef.doc(id).delete()
      return this._alert.notify('Perfil eliminado')
    } catch (error) {
      console.error(error)
      this._alert.error('No se pudo eliminar el manager', error)
    }
  }


  private async _getPerfil(RFC: string): Promise<any> {
    const perfilRef = this._afs.collection<AfiliadoModel>('afiliados').doc(RFC)
    return await perfilRef.get().pipe(take(1),
      debounceTime(500),
      map(afiliado => afiliado.get('datos_generales') ),
    ).pipe(
      catchError( ( error ) => {
        return this._alert.error(`No pudo obtenerse los datos generales de ${RFC}`, error, true, true)
      })
    ).toPromise()
  }
}
