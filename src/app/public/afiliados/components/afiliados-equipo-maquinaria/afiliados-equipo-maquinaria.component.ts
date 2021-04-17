import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
@Component({
  templateUrl: './afiliados-equipo-maquinaria.component.html',
  styleUrls: ['./afiliados-equipo-maquinaria.component.scss'],
})
export class AfiliadosEquipoMaquinariaComponent implements OnInit {
  extractCtrl: FormControl;
  eqpmaqForm: FormGroup;
  constructor(
    private _loading: GdevLoading,
    public location_: Location,
    private _cache: GdevCache,
    _formBuilder: FormBuilder
  ) {
    this.extractCtrl = new FormControl('', [Validators.required]);
    this.eqpmaqForm = _formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      propio: new FormControl(false, [Validators.requiredTrue]),
      comprobacion: new FormControl(false, [Validators.requiredTrue]),
      evidencia: new FormControl('',[]),
    });
  }

  ngOnInit(): void {}
}
