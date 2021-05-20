import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { MxCache } from '@marxa/devkit';
import { takeWhile } from 'rxjs/operators';
import { ActividadQuery, emptyActividadQuery } from 'src/app/models/consultas.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Especialidad,  Actividad, catalogoName } from '../../models/actividades.model';
import { ActividadesModel, ContactoInteres, DatosGeneralesModel, emptyContactoInteres, Intereses } from '../../models/afiliados.model';
import { ActividadesService } from '../../services/actividades.service';
import { AfiliadosService } from '../../services/afiliados.service';
import { ManagersService } from '../../services/managers.service';
import { PerfilService } from '../../services/perfil.service';

@Component({
  templateUrl: './actividades-form.component.html',
  styleUrls: ['./actividades-form.component.scss']
})
export class ActividadesFormComponent implements OnInit {

  RFC: string
  afiliado: DatosGeneralesModel | null

  intereses: Intereses
  actividades: ActividadesModel

  emptyActividad: ActividadQuery = emptyActividadQuery
  currentCatalogo: ActividadQuery[] = []


  constructor(
    public actividades_: ActividadesService,
    public afiliados_: AfiliadosService,
    private _consultas: ConsultasService,
    private _cache: MxCache,
    private _route: ActivatedRoute,
    public perfil_: PerfilService,
    private _router: Router,
    private _auth: MxAuth,
    private _managers: ManagersService
  ) {
    this.RFC = this._route.snapshot.params['RFC']
    this._auth.user$.pipe(takeWhile(user => user)).subscribe(user => {
      if (!user) this._router.navigate(['/'])
      else this._managers.retriveManager(user.email)
        .subscribe(manager => {
          if (!manager || manager.RFC != this.RFC) this._router.navigate(['/'])
        })
    })
    this.actividades = new ActividadesModel(
      [
        emptyActividadQuery, emptyActividadQuery, emptyActividadQuery
      ], [
        emptyActividadQuery, emptyActividadQuery, emptyActividadQuery
      ], [
        emptyActividadQuery, emptyActividadQuery, emptyActividadQuery
      ]
    )
    this.intereses = new Intereses( emptyContactoInteres, emptyContactoInteres, true)
    this.afiliado = this._cache.getDataKey<DatosGeneralesModel>('datos_generales')
  }

  ngOnInit(): void {

  }


  onActividadSelected(data: ActividadQuery, index: number, ) {
    this.currentCatalogo.splice(index, 0, data)
  }

  updateIntereses(field: string, data: ContactoInteres) {
    if (!Object.values(data).find(v => v == undefined)) {
      this.perfil_.updateInfoDoc(field, data)
    }
  }


  saveCatalogo(field: catalogoName) {
    this.perfil_.updateInfoDoc(field,  this.currentCatalogo)
    this._consultas.saveActividades(field, this.currentCatalogo)
    this.actividades[field] = this.currentCatalogo
    this.currentCatalogo = []
    return true
  }

}
