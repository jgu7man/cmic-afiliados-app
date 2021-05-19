import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActividadQuery, AfiliadoQuery, EspecialidadQuery } from 'src/app/models/consultas.model';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ActividadesService } from '../afiliados/services/actividades.service';
import { AfiliadosService } from '../afiliados/services/afiliados.service';

@Component({
  selector: 'g-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  buscadorCtrl: FormControl = new FormControl('',);
  filteredActividades: Observable<(EspecialidadQuery | ActividadQuery | AfiliadoQuery)[]>;
  afiliadosIndex: AfiliadoQuery[] = []

  logged: boolean = false

  constructor(
    private _actividades: ActividadesService,
    private _afiliados: AfiliadosService,
    private _: ConsultasService,
    private _router: Router
  ) {
    this._afiliados.indexList().subscribe(list => {
      list.forEach(afi => {
        if (afi) this.afiliadosIndex.push({
           nombre: afi.comercial_nombre, slug: afi.slug
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

  displayFn(actividad: ActividadQuery): string {
    return actividad && actividad.nombre ? actividad.nombre : '';
  }

  private _filter(nombre: string): (EspecialidadQuery | ActividadQuery | AfiliadoQuery)[] {
    const filterValue = nombre.toLowerCase();
    let espResult: EspecialidadQuery[] = this._actividades.allEspecialidades
      .filter(esp => esp.nombre.toLowerCase().includes(filterValue))
    let actResult: ActividadQuery[] = this._actividades.allActividades
      .filter(act => act.nombre.toLowerCase().includes(filterValue))
    let afiResult: AfiliadoQuery[] = this.afiliadosIndex
      .filter(afi => afi.nombre.toLowerCase().includes(filterValue))

    return [...espResult,...actResult, ...afiResult]
  }


  onSubmit() {
    let value = this.buscadorCtrl.value as (EspecialidadQuery | ActividadQuery | AfiliadoQuery)
    if ('slug' in value) {
      this._router.navigate(['/afiliado', value.slug])
    }
    else if ('codigo' in value) {
      this._router.navigate(['/consulta'], { queryParams: {codigo: value.codigo}})
    }
    else {
      this._router.navigate(['/consulta'], { queryParams: {especialidad: value.nombre}})
    }

  }


}
