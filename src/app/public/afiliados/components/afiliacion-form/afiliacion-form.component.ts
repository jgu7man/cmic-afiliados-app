import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from '../../afiliados.model';

@Component({
  selector: 'g-afiliados-form',
  templateUrl: './afiliacion-form.component.html',
  styleUrls: ['./afiliacion-form.component.scss']
})
export class AfiliacionFormComponent implements OnInit {

  // REVIEW La forma de cargarlos los datos con clase hace más simple su iniciación
  public datosGenerales: DatosGenerales

  constructor() {
    this.datosGenerales = new DatosGenerales('','','','','','','','');
  }


  ngOnInit(): void {
  }



}
