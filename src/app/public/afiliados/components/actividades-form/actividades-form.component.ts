import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { GdevCache } from 'gdev-cache';
import { Especialidad,  Actividad, catalogoName } from '../../models/actividades.model';
import { ContactoInteres, DatosGeneralesAfiliado, Intereses } from '../../models/afiliados.model';
import { ActividadesService } from '../../services/actividades.service';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  templateUrl: './actividades-form.component.html',
  styleUrls: ['./actividades-form.component.scss']
})
export class ActividadesFormComponent implements OnInit {

  afiliado: DatosGeneralesAfiliado | null
  especialidadSelected: Especialidad = { nombre: '', actividades: [] };
  afiliadoIntereses: Intereses
  contacto_1: ContactoInteres = {
    intereses: [],
    nombre: '',
    telefono: '',
    puesto: '',
    email: ''
  }
  contacto_2: ContactoInteres = { ...this.contacto_1 }

  actividad: FormGroup = new FormGroup({
    especialidad: new FormControl(''),
    subespecialidad: new FormControl('')
  })

  actividadesForm: FormGroup = new FormGroup({
    tipos_de_obra: new FormArray([
      this.actividad,
      this.actividad,
      this.actividad,
    ]),
    servicios_profesionales: new FormArray([
      this.actividad,
      this.actividad,
      this.actividad,
    ]),
    fuentes_de_trabajo: new FormArray([
      this.actividad,
      this.actividad,
      this.actividad,
    ]),
  })


  constructor(
    public actividades_: ActividadesService,
    public afiliados_: AfiliadosService,
    private _cache: GdevCache
  ) {
    this.afiliadoIntereses = new Intereses([], [], [], this.contacto_1, this.contacto_2, false, false,)
    this.afiliado = this._cache.getDataKey<DatosGeneralesAfiliado>('datos_generales')
   }

  ngOnInit(): void {
  }



  onSelectActividad(catalogo: catalogoName, change: MatSelectChange) {
    this.afiliadoIntereses[catalogo].push(change.value)
    this.especialidadSelected = { nombre: '', actividades: [] }
  }

  removeActividad(catalogoId: catalogoName, actividad: Actividad) {
    const index = this.afiliadoIntereses[catalogoId]
      .findIndex(a => a.codigo === actividad.codigo)
      if (index >= 0)
        this.afiliadoIntereses[catalogoId].splice(index, 1)
  }

}
