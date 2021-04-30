import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActividadQuery, emptyActividadQuery } from 'src/app/models/consultas.model';
import { Catalogo, emptyCatalog, Especialidad } from '../../../models/actividades.model';

@Component({
  selector: 'g-actividades-selector',
  templateUrl: './actividades-selector.component.html',
  styleUrls: ['./actividades-selector.component.scss']
})
export class ActividadesSelectorComponent implements OnInit {

  actividadForm: FormGroup = new FormGroup({
    especialidad: new FormControl(''),
    actividad: new FormControl(''),
  })

  @Input() catalogo: Catalogo = emptyCatalog
  @Input() value?: ActividadQuery
  @Input() disable: boolean = false
  especialidadSelected: Especialidad = { nombre: '', actividades: [] };
  actividadData: ActividadQuery = emptyActividadQuery
  @Output() selected: EventEmitter<ActividadQuery> = new EventEmitter()

  constructor() {

   }

  ngOnInit(): void {
    // console.log( this.value )
    if (this.value) {
      this.especialidadSelected.nombre = this.value.especialidad
      this.actividadData = this.value
      // console.log( this.actividadData )
    }
  }

  onSelectActividad(change: MatSelectChange) {
    this.actividadData = {
      catalogo: this.catalogo.id,
      especialidad: this.especialidadSelected.nombre,
      ...change.value
    }
    this.selected.emit(this.actividadData)
  }

}
