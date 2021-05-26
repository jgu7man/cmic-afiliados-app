import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { MxCache } from '@marxa/devkit';
import { take } from 'rxjs/operators';
import { DatosGeneralesModel } from '../public/afiliados/models/afiliados.model';
import { AfiliadosService } from '../public/afiliados/services/afiliados.service';

@Pipe({
  name: 'comercialName'
})
export class ComercialNamePipe implements PipeTransform {

  afiliadosIndex: DatosGeneralesModel[] = []
  constructor(
    private _cache: MxCache,
    private _afiliados: AfiliadosService
  ) {
    this.getAfiliadosList()
  }

  getAfiliadosList() {
    this._cache.listenForChanges<DatosGeneralesModel[]>('afiliadosList')
      .subscribe(list => { this.afiliadosIndex = list})

      if (!this._cache.getDataKey('afiliadosList')) {
        this._afiliados.indexList().pipe(take(1)).subscribe()
      }
  }

  transform(value: string,): string {
    let empresa = this.afiliadosIndex.find(a => a.RFC == value)
    return empresa ? empresa.comercial_nombre : ''
  }

}
