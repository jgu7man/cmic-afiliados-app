import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { MxCache } from '@marxa/devkit';
import { iUploadedFile } from '@marxa/storage';
import { Observable, of, throwError } from 'rxjs';
import { debounceTime, flatMap, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AfiliadoModel, DatosGeneralesModel, iAfiliadoModel, iAfiliadoRequest, iManager, PartialAfiliado } from '../models/afiliados.model';
import { ManagersService } from './managers.service';

@Injectable({
  providedIn: 'root',
})
export class AfiliadosService {


  constructor(
    private _afs: AngularFirestore,
    private _cache: MxCache,
    private _router: Router,
    private _alert: MxAlert,
    private _auth: AuthService
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
        console.log('Datos guardados');
      });
  }


  // 1 AFILIADO REQUEST
  async registRequest(request: iAfiliadoRequest) {
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
        `, 'html').subscribe(() => { this._router.navigate(['/']) })
      }
    } catch (e) {
      this._alert.message(e.message);
      console.error(e);
    }

  }


  // 2 ACEPT AFILIADO
  /** Registra un afiliado cuando un RFC no se ha registrado antes y registra el manager que está registrando
   *
   */
  async aceptRegist(RFC: string, acept: boolean) {
    try {
      const requestRef = this._afs.doc<iAfiliadoRequest>(`afiliaciones/${RFC}`).ref
      const requestDoc = await requestRef.get()
      const afiliadoRef = this._afs.doc(`afiliados/${RFC}`).ref;
      const splitDomain = window.location.href.split('/')
      const domain = splitDomain[0] === 'localhost' ? splitDomain[0] : splitDomain[2]


      if (requestDoc.exists) {
        let {empresa: afiliado, email, file } = requestDoc.data() as iAfiliadoRequest
        if (acept) {
          afiliadoRef.set({
            datos_generales: afiliado,
            constancia: file,
            creado: new Date()
          });

          await this._afs.collection( 'mail' ).ref.add( {
            to: email,
            message: {
              subject: `Petición aceptada`,
              text: `Se ha aceptado la petición para registrarte como afiliado en la plataforma de CMIC

              Por favor da click en el siguiente enlace para continuar con el registro:
              https://${domain}/afiliados/create?email=${email}&rfc=${RFC}"

              Si no has mandado una solicitud de registro, omite este correo`
            }
          })
          this._alert.notify('Correo enviado')
        }
        requestRef.delete()
      } else {
        throw { message: 'No se encontró esta petición quizá se perdió o ya se aceptó antes'}
      }


    } catch (e) {
      this._alert.message(e.message);
      console.error(e);
    }
  }


  getPeticiones() {
    return this._afs.collection<iAfiliadoRequest>('afiliaciones')
    .valueChanges({ idField: 'RFC' })
  }


  getPerfil(RFC: string): Observable<AfiliadoModel | undefined>{
    return this._afs.collection('afiliados')
      .doc<AfiliadoModel>(RFC).valueChanges()
      .pipe(debounceTime(500))
  }


  indexList(): Observable<DatosGeneralesModel[]> {
    return this._afs.collection<AfiliadoModel>('afiliados').valueChanges()
      .pipe(debounceTime(500),
        map<AfiliadoModel[], DatosGeneralesModel[]>(list => list.map(a => a.datos_generales)),
        tap(list => this._cache.updateData('afiliadosList', list))
    )
  }


  getFullList() {
    return this._afs.collection<AfiliadoModel>('afiliados')
    .valueChanges({ idField: 'RFC'})
  }

  getRecentAfiliados(cant: number = 6) {
    return this._afs.collection<AfiliadoModel>('afiliados',
    ref => ref.orderBy('creado', 'desc').limit(cant)).valueChanges()
  }



}


