import { Component, Input, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActividadEmpresa, CatalogoEmpresa, emptyCatalogoEmpresa } from 'src/app/public/afiliados/models/afiliados.model';

@Component({
  selector: 'g-perfil-actividades',
  templateUrl: './perfil-actividades.component.html',
  styleUrls: ['./perfil-actividades.component.scss']
})
export class PerfilActividadesComponent implements OnInit {

  @Input() catalogo: CatalogoEmpresa  = emptyCatalogoEmpresa
  constructor() { }

  ngOnInit(): void {
  }

  onSelectAct(selected: MatSelectionListChange) {

  }


}
