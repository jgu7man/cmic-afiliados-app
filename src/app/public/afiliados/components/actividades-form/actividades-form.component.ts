import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { GdevCache } from 'gdev-cache';
import { ActividadQuery, emptyActividadQuery } from 'src/app/models/consultas.model';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Especialidad,  Actividad, catalogoName } from '../../models/actividades.model';
import { ActividadesModel, ContactoInteres, DatosGeneralesModel, emptyContactoInteres, Intereses } from '../../models/afiliados.model';
import { ActividadesService } from '../../services/actividades.service';
import { AfiliadosService } from '../../services/afiliados.service';
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
    private _cache: GdevCache,
    private _route: ActivatedRoute,
    public perfil_: PerfilService
  ) {
    this.RFC = this._route.snapshot.params['RFC']
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



  saveCatalogo(field: catalogoName) {
    this.perfil_.updateInfoDoc(field,  this.currentCatalogo)
    this._consultas.saveActividades(field, this.currentCatalogo)
    this.actividades[field] = this.currentCatalogo
    this.currentCatalogo = []
    return true
  }

}
