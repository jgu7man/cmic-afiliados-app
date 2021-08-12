import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert, MxCache } from '@marxa/devkit';
import { Observable } from 'rxjs';
import { catchError, debounceTime, map, tap } from 'rxjs/operators';
import { EmailsService } from 'src/app/admin/services/emails.service';
import { AfiliadoModel, DatosGeneralesModel, iAfiliadoRequest, PartialAfiliado } from '../models/afiliados.model';

@Injectable({
  providedIn: 'root',
})
export class AfiliadosService {


  constructor(
    private _afs: AngularFirestore,
    private _cache: MxCache,
    private _router: Router,
    private _alert: MxAlert,
    private _mails: EmailsService
  ) {

  }

  /**
   * Almacena los datos parciles que se van llenando del registro
   *
   * @param {string} field: nombre del campo de la parcialidad a guardar
   * @param {PartialAfiliado} partialAafiliado parcialidad que se ha de guardar
   */
  patch(field: string, partialAafiliado: PartialAfiliado) {
    // Obtenemos del local storage la el rfc en cuestión
    const RFC = this._cache.getDataKey<string>('rfc') as string;

    this._afs
      .collection('afiliados')
      .doc(RFC)
      .update({
        [field]: typeof partialAafiliado != 'string' ?  { ...partialAafiliado } : partialAafiliado,
      })
      .then(() => {
        console.log( 'Datos guardados' );
        this._alert.notify('Datos guardados')
      } ).catch( ( error ) => {
        this._alert.error('No se pudo actualizar la información', error)
      })
  }


  //  1 SEND REQUEST OF AFILIADO
  /**
   * Genera una petición de registro de la empresa. Si la empresa ya existe, regresa error
   *
   * @param {iAfiliadoRequest} request
   * @returns {*}  {Promise<void>}
   */
  async registRequest(request: iAfiliadoRequest): Promise<void> {
    const { RFC } = request.empresa;
    try {
      const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
      const afiliadoDoc = await afiliadoRef.get();

      if (afiliadoDoc.exists) {
        throw {
          message:
            'Esta empresa ya está registrada. Si necesitas accesos, contacta a un administrador de la empresa o con CMIC directamente',
        };
      } else {

        await this._afs.collection('afiliaciones').doc(RFC)
          .set({...request, request: new Date()})
        this._alert.message(`
          <h1 class="center">Petición enviada</h1>
          <p class="center">Se ha enviado la petición a los administradores. Ahora toca esperar el correo de confirmación.</p>
          <p>Es posible que también tengas que revisar tu bandeja de spam</p>
        `, 'html').subscribe(() => { this._router.navigate(['/']) })
      }
    } catch ( e ) {
      console.error(e);
      this._alert.error( e.message, e );
      return
    }

  }


  // 2 ACEPT AFILIADO
  /**
   *Registra un afiliado cuando un RFC no se ha registrado antes y registra el manager que está registrando
   *
   * @param {string} RFC El RFC de la empresa
   * @param {boolean} acept guarda o elimina la data de la petición
   * @returns {*}  {Promise<void>}
   */
  async aceptRegist(RFC: string, acept: boolean): Promise<void> {
    try {
      const requestRef = this._afs.doc<iAfiliadoRequest>(`afiliaciones/${RFC}`).ref
      const requestDoc = await requestRef.get()
      const afiliadoRef = this._afs.doc(`afiliados/${RFC}`).ref;



      if (requestDoc.exists) {
        let {empresa: afiliado, email, file } = requestDoc.data() as iAfiliadoRequest
        if ( acept ) {

          await afiliadoRef.set({
            datos_generales: afiliado,
            constancia: file,
            creado: new Date()
          } );
          await afiliadoRef.collection( 'managers' ).add( {
            email, RFC, registrado: new Date()
          } )
          await this._alert.notify( 'Se agregó el afiliado' )
          await this.sendAceptedMail(email, RFC)
        }

        // Always remove request?
        // await requestRef.delete()

      } else {
        throw { message: 'No se encontró esta petición quizá se perdió o ya se aceptó antes'}
      }


    } catch (e) {
      this._alert.error(e.message || e, e);
      return console.error(e);
    }
  }


  async sendAceptedMail( email: string, RFC: string ) {
    const splitDomain = window.location.href.split('/')
    const domain = splitDomain[0] === 'localhost' ? splitDomain[0]
      : 'https://' + splitDomain[2]
    let mail = {
      to: email,
      message: {
        subject: `Petición aceptada`,
        html: `
        <p>Se ha aceptado la petición para registrarte como afiliado en la plataforma de CMIC</p>
        <br>
        <p>Por favor da click en el siguiente enlace para continuar con el registro:
        <a href='${domain}/afiliados/create?email="${ email }"&rfc=${ RFC}'>
          ${domain }/afiliados/create?email="${ email }"&rfc=${ RFC}
        </a>
        <br>
        <p> Si no has mandado una solicitud de registro, omite este correo </p>
        `
      }
    }
    await this._mails.sendEmail( mail ).catch( error => {
      throw this._alert.error(`No pudo enviarse el correo de notificación.`, error, true)
    } )
  }

  /**
   * Obtiene la peticiones de registro de los afiliados
   * @returns {*}  {(Observable<(iAfiliadoRequest & { RFC: string; })[]>)}
   */
  getPeticiones(): Observable<(iAfiliadoRequest & { RFC: string; })[]> {
    return this._afs.collection<iAfiliadoRequest>('afiliaciones')
      .valueChanges( { idField: 'RFC' } ).pipe(
        catchError( (error) => {
          throw this._alert
            .error( 'No se pudieron cargar las peticiones de afiliación', error )
        } )
    )
  }

  /**
   * Obtiene el perfil a través de la clave RFC solicitada.
   * Si no se encuentra, retorna `undefined`
   *
   * @param {string} RFC
   * @returns {*}  {(Observable<AfiliadoModel | undefined>)}
   */
  getPerfil(RFC: string): Observable<AfiliadoModel | undefined>{
    return this._afs.collection('afiliados')
      .doc<AfiliadoModel>(RFC).valueChanges()
      .pipe( debounceTime( 500 ),
        catchError( error => {
          throw this._alert.error( 'No se pudo conseguir el perfil', error )
        })
      )
  }

  /**
   * Obtiene los datos generales de las empresas afiliadas para mostrar en el index
   *
   * @returns {*}  {Observable<DatosGeneralesModel[]>}
   */
  indexList(): Observable<DatosGeneralesModel[]> {
    return this._afs.collection<AfiliadoModel>('afiliados').valueChanges()
      .pipe(debounceTime(500),
        map<AfiliadoModel[], DatosGeneralesModel[]>(list => list.map(a => a.datos_generales)),
        tap( list => this._cache.updateData( 'afiliadosList', list ) ),
        catchError( (error) => {
          throw this._alert.error( 'Error al cargar la lista de afiliados', error )
        })
    )
  }

  /**
   * Obtiene la lista completa de empresas afiliadas
   *
   * @returns {*}  {(Observable<(AfiliadoModel & { RFC: string; })[]>)}
   */
  getFullList(): Observable<(AfiliadoModel & { RFC: string; })[]> {
    return this._afs.collection<AfiliadoModel>('afiliados')
      .valueChanges( { idField: 'RFC' } ).pipe(
        catchError( error => {
        throw this._alert.error('No se pudo cargar la lista de los afiliados', error)
      })
    )
  }

  /**
   * Obtiene la lista de los afiliados recientemente registrados
   *
   * @param {number} [cant=6] Cantidad solicitada de perfiles
   * @returns {*}  {Observable<AfiliadoModel[]>}
   */
  getRecentAfiliados(cant: number = 6): Observable<AfiliadoModel[]> {
    return this._afs.collection<AfiliadoModel>('afiliados',
      ref => ref.orderBy( 'creado', 'desc' ).limit( cant ) ).valueChanges()
      .pipe(catchError( (error) => { throw this._alert.error('No se pudieron obtener los afiliados recientes', error, false, true)}))
  }



}


