import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import {catchError, map, switchMap } from 'rxjs/operators';
import { ActividadQuery, QueryParam, RequestItem } from '../models/consultas.model';
import { AfiliadoModel } from '../public/afiliados/models/afiliados.model';
import { MxAlert, MxLoading } from '@marxa/devkit';
import { Observable } from 'rxjs';
import { MxCache } from '@marxa/devkit';
import { catalogoName } from '../public/afiliados/models/actividades.model';
import { uniq, uniqBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(
    private _afs: AngularFirestore,
    private _loading: MxLoading,
    private _cache: MxCache,
    private _alert: MxAlert
  ) { }


  /**
   * Guarda las actividades de empresa que el afiliado seleccione
   *
   * @param {catalogoName} catalogo
   * @param {ActividadQuery[]} actividades
   * @returns {*}
   */
  async saveActividades(catalogo: catalogoName, actividades: ActividadQuery[]) {
    const RFC = this._cache.getDataKey<string>('rfc') as string;
    try {
      const actividadesRef = this._afs.collection(`afiliados/${RFC}/actividades`)
      const batch = this._afs.firestore.batch()
      actividades.forEach((act, index )=> {
        batch.set(actividadesRef.doc(`${catalogo}-${index}`).ref, act)
      })
      await batch.commit()
      return
    } catch (error) {
      this._alert.error(`No se pudieron guardar las actividades de ${RFC}`, error)
      return console.error(error)
    }
  }


  /**
   * Busca actividades por especialidad o código
   *
   * @param {string} value
   * @param {('codigo' | 'especialidad')} queryKey
   * @returns {*}  {Observable<RequestItem[]>}
   */
  private actividad(value: string, queryKey: 'codigo' | 'especialidad'): Observable<RequestItem[]> {
    return this._afs.collectionGroup<ActividadQuery>('actividades',
      ref => ref.where(queryKey, '==', value))
      .get().pipe(
        switchMap<QuerySnapshot<ActividadQuery>, Promise<AfiliadoModel[]>>(
        async list => {
          if (list.empty) return []
          else {
            const afiliados: AfiliadoModel[] = []
            console.log( list.size )
            await this._loading.asyncForEach(list.docs,
              async (doc: QueryDocumentSnapshot<ActividadQuery>) => {
                let afiliado = await doc.ref.parent.parent?.get()
                if (afiliado) afiliados.push(afiliado.data() as AfiliadoModel)
              })
            let uniqAfiliados = uniqBy(afiliados, 'datos_generales.RFC')
            return uniqAfiliados
          }
          } ),
        catchError( ( error ) => { throw this._alert.error(`No se pudieron obtener las actividades de ${queryKey} que coincidan con ${value}`, error)})
      ).pipe( map<AfiliadoModel[], RequestItem[]>( ( list ) =>
            list.map(({ datos_generales, perfil }) => {
              return <RequestItem>{datos_generales, perfil}
            } ),
            catchError( ( error ) => { throw this._alert.error(`No se pudieron obtener los datos generales`, error, false, true)})
          ) )
  }



  /**
   * Obtiene como observable los perfiles que coinciden con el slug
   *
   * @param {string} value
   * @returns {*}  {Observable<AfiliadoModel[]>}
   */
  getAfiliadoBySlug(value: string):Observable<AfiliadoModel[]> {
    return this._afs.collectionGroup<AfiliadoModel>('afiliados',
      ref => ref.where( 'datos_generales.slug', '==', value ) ).valueChanges()
    .pipe( catchError( ( error ) => { throw this._alert.error(`No fue posible obtener afiliados por SLUG`, error)}))

  }


  /**
   * Filtra el tipo de consulta a través de código, especialidad o por slug
   *
   * @param {QueryParam} key
   * @param {string} value
   * @returns {*}  {Observable<RequestItem[]>}
   */
  consulta(key: QueryParam, value: string): Observable<RequestItem[]> {
    const index = {
      ['codigo']: this.actividad(value, 'codigo'),
      ['especialidad']: this.actividad(value, 'especialidad'),
      // ['slug']: this.getAfiliadoBySlug(value),
    }

    return index[key]
  }
}
