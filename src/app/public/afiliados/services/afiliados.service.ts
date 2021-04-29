import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';
import { Observable, of, throwError } from 'rxjs';
import { debounceTime, flatMap, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AfiliadoModel, DatosGeneralesModel, iAfiliadoModel, iManager, PartialAfiliado } from '../models/afiliados.model';
import { ManagersService } from './managers.service';

@Injectable({
  providedIn: 'root',
})
export class AfiliadosService {


  constructor(
    private _afs: AngularFirestore,
    private _cache: GdevCache,
    private _router: Router,
    private _alert: GdevAlert,
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


  /** Registra un afiliado cuando un RFC no se ha registrado antes y registra el manager que está registrando
   * @param {iManager} afiliado
   */
  async regist(afiliado: iManager) {
    const { RFC } = afiliado;
    try {
      const afiliadoRef = this._afs.collection('afiliados').doc(RFC).ref;
      const afiliadoDoc = await afiliadoRef.get();
      if (afiliadoDoc.exists) {
        throw {
          message:
            'Esta empresa ya está registrada. Si necesitas accesos, contacta a un administrador de la empresa o con CMIC directamente',
        };
      } else {

        await this._auth.createManagerAccount(afiliado)
        afiliadoRef.set({ creado: new Date() });
        this._router.navigate(['/afiliados/afiliacion', RFC]);
      }

    } catch (e) {
      this._alert.sendMessageAlert(e.message);
      console.error(e);
    }
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



}
