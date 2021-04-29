import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ActividadData, AfiliadoData, EspecialidadData } from '../afiliados/models/actividades.model';
import { ActividadesService } from '../afiliados/services/actividades.service';
import { AfiliadosService } from '../afiliados/services/afiliados.service';

@Component({
  selector: 'g-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  buscadorCtrl: FormControl = new FormControl('',);
  filteredActividades: Observable<(EspecialidadData | ActividadData | AfiliadoData)[]>;
  afiliadosIndex: AfiliadoData[] = []

  logged: boolean = false

  constructor(
    private _actividades: ActividadesService,
    private _afiliados: AfiliadosService
  ) {
    this._afiliados.indexList().subscribe(list => {
      console.log( list )
      list.forEach(afi => {
        if (afi) this.afiliadosIndex.push({
          RFC: afi.RFC, nombre: afi.comercial_nombre
        })
      })
    })
    this.filteredActividades = this.buscadorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filter(nombre) : this._actividades.allActividades.slice())
      );
  }

  ngOnInit(): void {
  }

  displayFn(actividad: ActividadData): string {
    return actividad && actividad.nombre ? actividad.nombre : '';
  }

  private _filter(nombre: string): (EspecialidadData | ActividadData | AfiliadoData)[] {
    const filterValue = nombre.toLowerCase();
    let espResult: EspecialidadData[] = this._actividades.allEspecialidades
      .filter(esp => esp.nombre.toLowerCase().includes(filterValue))
    let actResult: ActividadData[] = this._actividades.allActividades
      .filter(act => act.nombre.toLowerCase().includes(filterValue))
    let afiResult: AfiliadoData[] = this.afiliadosIndex
      .filter(afi => afi.nombre.toLowerCase().includes(filterValue))

    return [...espResult,...actResult, ...afiResult]
  }


}
