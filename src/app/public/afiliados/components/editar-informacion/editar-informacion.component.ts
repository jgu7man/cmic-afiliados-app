import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { MxCache } from '@marxa/devkit';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AfiliadoModel, AfiliadoProperty, emptyAfiliado, iAfiliadoModel, iManager, PartialAfiliado } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  templateUrl: './editar-informacion.component.html',
  styleUrls: ['./editar-informacion.component.scss']
})
export class EditarInformacionComponent implements OnInit {

  user?: iManager
  afiliado: AfiliadoModel = emptyAfiliado
  RFC: string


  constructor(
    private _cache: MxCache,
    private _afiliados: AfiliadosService,
    private _route: ActivatedRoute,
    private _alert: MxAlert,
    public location_: Location,
  ) {
    this.RFC = this._route.snapshot.params['RFC']
    if (this.RFC) {
      this._afiliados.getPerfil(this.RFC).subscribe((data) => {
        // TODO Poner un estado CARGANDO y apagarlo aquí
        if (data) {
          this.afiliado = data;
          this.RFC = data.datos_generales?.RFC as string;
        }
        else {
          this._alert.message('No se encontró el perfil')
        }
      });
    }
  }

  ngOnInit(): void {
  }

  onChanges(form: AfiliadoProperty, data: any) {
    this.afiliado[form] = data
  }

}
