import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AfiliadoModel, AfiliadoProperty, emptyAfiliado, iAfiliadoModel, iUserAfiliado, PartialAfiliado } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  templateUrl: './editar-informacion.component.html',
  styleUrls: ['./editar-informacion.component.scss']
})
export class EditarInformacionComponent implements OnInit {

  user?: iUserAfiliado
  afiliado: AfiliadoModel = emptyAfiliado

  constructor(
    private _cache: GdevCache,
    private _afiliados: AfiliadosService
  ) {
    const user = this._cache.getDataKey<iUserAfiliado>('user')
    if (user) this.user = user
    else { }
    this._afiliados.getPerfilAfiliado(this.user?.RFC as string)
      .subscribe(data => {
        this.afiliado = data
        console.log( data.datos_generales?.fisica_apellido_mat )
      })
    // .pipe(tap(data => console.log( data)))
  }

  ngOnInit(): void {
  }

  onChanges(form: AfiliadoProperty, data: any) {
    this.afiliado[form] = data
  }

}
