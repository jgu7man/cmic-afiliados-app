import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { Location } from '@angular/common';
@Component({
  templateUrl: './afiliados-certificaciones-especializaciones.component.html',
  styleUrls: ['./afiliados-certificaciones-especializaciones.component.scss'],
})
export class AfiliadosCertificacionesEspecializacionesComponent
  implements OnInit {

  extractCtrl: FormControl;
  cerespForm: FormGroup;

  constructor(
    private _loading: GdevLoading,
    public location_: Location,
    private _cache: GdevCache
  ) {
    
    this.extractCtrl = new FormControl('', [Validators.required]);

    this.cerespForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      aval: new FormControl('', [Validators.required]),
      miembro: new FormControl('', [Validators.required]),
      evidencia: new FormControl(''),
    });
  }
  ngOnInit(): void {}
}
