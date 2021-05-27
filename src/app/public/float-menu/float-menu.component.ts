import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MxResponsive } from '@marxa/devkit';
import { map, uniq } from 'lodash';
import { Catalogo } from '../afiliados/models/actividades.model';
import { ActividadesService } from '../afiliados/services/actividades.service';

@Component({
  selector: 'g-float-menu',
  templateUrl: './float-menu.component.html',
  styleUrls: ['./float-menu.component.scss']
})
export class FloatMenuComponent implements OnInit {

  catalogos: Catalogo[]
  show: boolean = false
  catalogSelected: any
  especialidadSelected?: number

  @ViewChild('especialidades') espSidebar?: MatDrawer


  constructor(
    private _actividades: ActividadesService,
    public responsive: MxResponsive
  ) {
    this.catalogos = this._actividades.Catalogos
    if (this.responsive.large) this.especialidadSelected = 0
   }

  ngOnInit(): void {
    // setTimeout(() => this.catalogSelected = null, 5000)
  }

  get openDrawer() {
    if (this.responsive.large) return true
    else {
      return typeof this.especialidadSelected === 'undefined'
    }
  }

  over() {
    console.log( 'over!' )
  }

  select(inde: number) {
    this.catalogSelected = this.catalogos[inde]
  }

  selectEspecialidad(index: number) {
    this.especialidadSelected = index
    if (!this.responsive.large) {
      this.espSidebar?.close()
    }
  }

  get Especialidades() {
    // console.log( this.catalogos[this.catalogSelected] )
    return this.catalogSelected && this.catalogSelected >= 0 ?
      this.catalogos[this.catalogSelected].especialidades : []
  }

  get Subespecialidades() {
    let subespecialidades: (string | undefined)[] = []
    if (this.catalogSelected !== undefined && this.especialidadSelected !== undefined) {
      let especialidad = this.catalogSelected.especialidades[this.especialidadSelected]
      subespecialidades = uniq(map(especialidad.actividades, 'subespecialidad'))
    }

    return subespecialidades

  }


}
