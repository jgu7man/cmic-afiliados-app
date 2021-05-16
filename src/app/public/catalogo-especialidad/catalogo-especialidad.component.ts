import { Component, Input, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { Actividad, Especialidad } from '../afiliados/models/actividades.model';
import { ActividadesService } from '../afiliados/services/actividades.service';

@Component({
  selector: 'g-catalogo-especialidad',
  templateUrl: './catalogo-especialidad.component.html',
  styleUrls: ['./catalogo-especialidad.component.scss']
})
export class CatalogoEspecialidadComponent implements OnInit {

  @Input() especialidadName: string = ''
  @Input() actSelected: string = ''
  especialidad: Especialidad = { nombre: this.especialidadName, actividades: [] }
  constructor(
    private _actividades: ActividadesService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.especialidad = this._actividades.allEspecialidades
      .find(esp => esp.nombre === this.especialidadName) as Especialidad
    console.log(this.actSelected)

  }

  onSelect(selected: MatSelectionListChange) {
    let actSelected = selected.options[0].value as Actividad
    this._router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this._router.navigate(['/consulta'], {
        queryParams: { 'codigo': actSelected.codigo }
      })

    })
  }

}
