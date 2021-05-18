import { Component, Input, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { ActividadEmpresa, CatalogoEmpresa, emptyCatalogoEmpresa } from 'src/app/public/afiliados/models/afiliados.model';

@Component({
  selector: 'g-perfil-actividades',
  templateUrl: './perfil-actividades.component.html',
  styleUrls: ['./perfil-actividades.component.scss']
})
export class PerfilActividadesComponent implements OnInit {

  @Input() catalogo: CatalogoEmpresa  = emptyCatalogoEmpresa
  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSelectAct(selected: MatSelectionListChange) {
    let actividad: ActividadEmpresa = selected.options[0].value
    let {codigo} = actividad
    this._router.navigate(['/consulta' ], { queryParams: {codigo}})
  }


}
