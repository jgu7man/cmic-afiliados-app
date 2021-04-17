import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
//import { StorageService } from 'Src/app/gdev/gdev-storage/gdev-storage.module';

@Component({
  templateUrl: './afiliados-capacidad-contable.component.html',
  styleUrls: ['./afiliados-capacidad-contable.component.scss'],
})
export class AfiliadosCapacidadContableComponent implements OnInit {
  // CapacidadForm: FormGroup;
  extractCtrl: FormControl;
  capcontableform: FormGroup;
  constructor(
    private _loading: GdevLoading,
    public location_: Location,
    private _cache: GdevCache
  ) {
    this.extractCtrl = new FormControl('', [Validators.required]);
    this.capcontableform = new FormGroup({
      year: new FormControl('', [Validators.required]),
      ingreso: new FormControl('', [Validators.required]),
      evidencia: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
}
