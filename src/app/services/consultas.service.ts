import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import {switchMap } from 'rxjs/operators';
import { ActividadQuery, QueryParam } from '../models/consultas.model';
import { AfiliadoModel } from '../public/afiliados/models/afiliados.model';
import { GdevLoading } from 'gdev-loading';
import { Observable, of } from 'rxjs';
import { GdevCache } from 'gdev-cache';
import { catalogoName } from '../public/afiliados/models/actividades.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(
    private _afs: AngularFirestore,
    private _loading: GdevLoading,
    private _cache: GdevCache
  ) { }


  saveActividades(catalogo: catalogoName, actividades: ActividadQuery[]) {
    const RFC = this._cache.getDataKey<string>('rfc') as string;
    const actividadesRef = this._afs.collection(`afiliados/${RFC}/actividades`)
    const batch = this._afs.firestore.batch()
    actividades.forEach((act, index )=> {
      batch.set(actividadesRef.doc(`${catalogo}-${index}`).ref, act)
    })
    batch.commit()
  }

  actividad(value: string, queryKey: 'codigo' | 'especialidad'): Observable<AfiliadoModel[]> {
    return this._afs.collectionGroup<ActividadQuery>('actividades',
      ref => ref.where(queryKey, '==', value))
      .get().pipe(switchMap<QuerySnapshot<ActividadQuery>, Promise<AfiliadoModel[]>>(
        async list => {
          if (list.empty) return []
          else {
            const afiliados: AfiliadoModel[] = []
            await this._loading.asyncForEach(list.docs,
              async (doc: QueryDocumentSnapshot<ActividadQuery>) => {
                let afiliado = await doc.ref.parent.parent?.get()
                if (afiliado) afiliados.push(afiliado.data() as AfiliadoModel)
            })
            return afiliados
          }
      }))
  }



  afiliado(value: string):Observable<AfiliadoModel[]> {
    return this._afs.collectionGroup<AfiliadoModel>('afiliados',
      ref => ref.where('datos_generales.slug', '==', value)).valueChanges()
    //   .pipe(filter(afiliado => !!afiliado))
  }

  consulta(key: QueryParam, value: string): Observable<AfiliadoModel[]> {
    const index = {
      ['codigo']: this.actividad(value, 'codigo'),
      ['especialidad']: this.actividad(value, 'especialidad'),
      ['slug']: this.afiliado(value),
    }

    return index[key]
  }
}
