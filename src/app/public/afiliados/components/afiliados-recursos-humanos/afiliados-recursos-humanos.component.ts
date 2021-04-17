import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevStorage } from '../../../../gdev/gdev-storage/storage-service.service';

@Component({
  templateUrl: './afiliados-recursos-humanos.component.html',
  styleUrls: ['./afiliados-recursos-humanos.component.scss'],
})
export class AfiliadosRecursosHumanosComponent implements OnInit {
  extractCtrl: FormControl;
  rrhhForm: FormGroup;
  constructor(
    private _storage: GdevStorage,
    private _cache: GdevCache,
    public location_: Location
  ) {
    this.extractCtrl = new FormControl('', [Validators.required]);
    this.rrhhForm = new FormGroup({
      planta_fija: new FormControl('', [Validators.required]),
      capacidad_proyecto: new FormControl('', [Validators.required]),
      hombres: new FormControl('', [Validators.required]),
      mujeres: new FormControl('', [Validators.required]),
      team: new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        cargo: new FormControl('', [Validators.required]),
        contacto: new FormControl('', [Validators.required]),
      }),
    });
  }

  ngOnInit(): void {}
}
