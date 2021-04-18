import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormArrayName, FormControl, FormGroup, Validators } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';
import { iUserAfiliado } from '../../models/afiliados.model';
import { iDeclaracionModel } from '../../models/perfiles.model';
import { PerfilesService } from '../../services/perfiles.service';
//import { StorageService } from 'Src/app/gdev/gdev-storage/gdev-storage.module';

@Component({
  templateUrl: './afiliados-capacidad-contable.component.html',
  styleUrls: ['./afiliados-capacidad-contable.component.scss'],
})
export class AfiliadosCapacidadContableComponent implements OnInit {
  // CapacidadForm: FormGroup;
  extractCtrl: FormControl;
  declaracionesForm: FormGroup;
  declaracionesList: FormArray;
  capContableForm: FormGroup;
  path: string
  metadata: any
  RFC: string

  constructor(
    private _loading: GdevLoading,
    public location_: Location,
    private _cache: GdevCache,
    private _perfiles: PerfilesService,
    private _storage: GdevStorage
  ) {
    this.extractCtrl = new FormControl('', [Validators.required]);
    this.capContableForm = new FormGroup({
      extract: new FormControl('', [Validators.required]),
      capacidad: new FormControl('', [Validators.required]),
    });
    this.declaracionesForm = new FormGroup({
      declaraciones: this.declaracionesList = new FormArray([
        new FormGroup({
          year: new FormControl(new Date().getFullYear() - 1),
          ingreso: new FormControl('', [Validators.required]),
          evidencia: new FormControl(undefined, [Validators.required]),
        }),
        new FormGroup({
          year: new FormControl(new Date().getFullYear() - 2),
          ingreso: new FormControl('', [Validators.required]),
          evidencia: new FormControl(undefined, [Validators.required]),
        }),
        new FormGroup({
          year: new FormControl(new Date().getFullYear() - 3),
          ingreso: new FormControl('', [Validators.required]),
          evidencia: new FormControl(undefined, [Validators.required]),
        }),
      ])

    });
    const { RFC, email }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    this.RFC = RFC
    this.path = `afiliados/${RFC}/cap-contable`
    this.metadata = { RFC, email }
  }

  ngOnInit(): void { }

  get declaraciones(): FormArray {
    return this.declaracionesForm.get('declaraciones') as FormArray;
  }

  onUploadedFile(file: iUploadedFile, index: number): void {
    let list = this.declaracionesForm.get(['declaraciones']) as FormArray;
    list.at(index).patchValue({ evidencia: file })
    this._storage.files = []
  }



  saveDeclaracion(declaracion: AbstractControl, index: number): void {
    console.log( declaracion.value )
    this._perfiles.setInfoItem(this.RFC, 'cap-contable', declaracion.value)
      .then(() => {
        let list = this.declaracionesForm.get(['declaraciones']) as FormArray;
        list.at(index).markAsPristine()
    })
  }
}
