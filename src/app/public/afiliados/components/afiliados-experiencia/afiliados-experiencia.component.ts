import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service.service';
import { iUploadedFile } from 'src/app/services/storage.model';
import { iUserAfiliado } from '../../models/afiliados.model';

@Component({
  templateUrl: './afiliados-experiencia.component.html',
  styleUrls: ['./afiliados-experiencia.component.scss']
})
export class AfiliadosExperienciaComponent implements OnInit, OnDestroy {

  // experienciaForm: FormGroup;
  extractCtrl: FormControl
  proyectoForm: FormGroup;
  files: any[] = []
  showDropzone: boolean = false
  uploadingFiles: boolean = false
  cantUploaded: number = 0
  fileSubscription?: Subscription

  constructor(
    private _loading: GdevLoading,
    private _storage: StorageService,
    private _cache: GdevCache
  ) {
    this.extractCtrl = new FormControl('', [Validators.required])
    this.proyectoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      ubicacion: new FormGroup({
        calle: new FormControl(''),
        num_ext: new FormControl(''),
        num_int: new FormControl(''),
        colonia: new FormControl(''),
        codigo_postal: new FormControl(''),
        municipio_alcaldia: new FormControl('', [Validators.required]),
        entidad_federativa: new FormControl('', [Validators.required]),
      }, [Validators.required]),
      privado: new FormControl(false),
      evidencia: new FormControl([], [Validators.required]),
    })
   }

  ngOnInit(): void {
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }
  }

  onRemove(file: any) {
    this.files.splice(this.files.indexOf(file), 1);
  }

  loadFiles() {
    const { RFC }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado

    this.uploadingFiles = true;
    this._loading.asyncForEach(this.files, (file: any) => {
      this.fileSubscription = this._storage
        .uploadFile(file, {RFC, folder:'experiencia'})
        .subscribe(
          (res: iUploadedFile) => {
            if (res.uploadedState === true)
              this.cantUploaded = ++this.cantUploaded
            console.log( this.cantUploaded )
          },
          (err: any) => console.error(err)

        )
    })

  }

  get UploadedPercent(): void | number {
    let percent = (100 / this.files.length) * this.cantUploaded
    if (percent === 100) {
      this.showDropzone = false
      if (this.fileSubscription) this.fileSubscription.unsubscribe()
    }
    else return percent
  }

  ngOnDestroy() {
  }

}
