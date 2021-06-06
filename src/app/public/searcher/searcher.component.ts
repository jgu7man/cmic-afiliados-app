import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MxCache } from '@marxa/devkit';
import { Observable } from 'rxjs';
import { map, startWith, take, takeWhile } from 'rxjs/operators';
import { ActividadQuery, AfiliadoQuery, EspecialidadQuery } from 'src/app/models/consultas.model';
import { ConsultasService } from 'src/app/services/consultas.service';
import { DatosGeneralesModel } from '../afiliados/models/afiliados.model';
import { ActividadesService } from '../afiliados/services/actividades.service';
import { AfiliadosService } from '../afiliados/services/afiliados.service';
import { DialogClienteLoginComponent } from '../clientes/components/dialog-cliente-login/dialog-cliente-login.component';

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
    private _consultas: ConsultasService,
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _dialog: MatDialog,
    private _cache: MxCache
  ) {
    // this._afiliados.indexList().subscribe(list => {
    //   list.forEach(afi => {
    //     if (afi) this.afiliadosIndex.push({
    //        nombre: afi.comercial_nombre, slug: afi.slug
    //     })
    //   })
    // })
    this.getAfiliadosList()
    this.filteredActividades = this.buscadorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filter(nombre) : this._actividades.allActividades.slice())
      );
  }

  ngOnInit(): void {
  }

  getAfiliadosList() {
    this._cache.listenForChanges<DatosGeneralesModel[]>('afiliadosList')
      .subscribe(list => {
        list.forEach(afi => {
          if (afi) this.afiliadosIndex.push({
            nombre: afi.comercial_nombre, slug: afi.slug
          })
        })
      })

    if (!this._cache.getDataKey('afiliadosList')) {
      this._afiliados.indexList().pipe(take(1)).subscribe()
    }
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
      let slug = value.slug
      this._afAuth.authState
        .pipe(takeWhile(user => !user, true))
        .subscribe(user => {
          if (user) this._router.navigate(['/afiliado', slug])
          else this._dialog.open(DialogClienteLoginComponent, {
              width: '370px',
              data: slug
            }).afterClosed().subscribe(slug => {
              if(slug) this._router.navigate(['/afiliado', slug])
            })
        })
    }
    else if ('codigo' in value) {
      this._router.navigate(['/consulta'], { queryParams: {codigo: value.codigo}})
    }
    else {
      this._router.navigate(['/consulta'], { queryParams: {especialidad: value.nombre}})
    }

  }


}
