import { Component, OnInit } from '@angular/core';
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
  catalogSelected?: number
  especialidadSelected: number = 0


  constructor(
    private _actividades: ActividadesService
  ) {
    this.catalogos = this._actividades.Catalogos
   }

  ngOnInit(): void {
    // setTimeout(() => this.catalogSelected = null, 5000)
  }

  over() {
    console.log( 'over!' )
  }

  select(inde: number) {
    console.log( inde )
    this.catalogSelected = inde
    console.log( this.catalogSelected )
  }

  get Subespecialidades() {
    let subespecialidades: (string | undefined)[] = []
    if (this.catalogSelected !== undefined && this.especialidadSelected !== undefined) {
      let especialidad = this.catalogos[this.catalogSelected].especialidades[this.especialidadSelected]
      subespecialidades = uniq(map(especialidad.actividades, 'subespecialidad'))
    }

    console.log( subespecialidades )
    return subespecialidades

  }


}
