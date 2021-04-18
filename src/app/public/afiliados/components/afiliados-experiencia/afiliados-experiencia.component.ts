import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { Subscription } from 'rxjs';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';
import { iUserAfiliado } from '../../models/afiliados.model';
import { iExperiencia, iProyecto } from '../../models/perfiles.model';
import { PerfilesService } from '../../services/perfiles.service';

@Component({
  templateUrl: './afiliados-experiencia.component.html',
  styleUrls: ['./afiliados-experiencia.component.scss']
})
export class AfiliadosExperienciaComponent implements OnInit, OnDestroy {

  extractCtrl: FormControl
  proyectoForm: FormGroup;
  path: string
  metadata: any
  private RFC: string
  items: iProyecto[] = []
  editingItem?: number

  constructor(
    private _storage: GdevStorage,
    private _cache: GdevCache,
    public location_: Location,
    private _perfiles: PerfilesService,
    private _loading: GdevLoading
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
      evidencia: new FormArray([
        new FormControl({})
      ], ),
    })

    const { RFC, email }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    this.path = `afiliados/${RFC}/experiencia`
    this.metadata = { RFC, email }
    this.RFC = RFC ? RFC : ''

    this._perfiles.getInfoDoc<iExperiencia>(this.RFC, 'experiencia')
    .then(({extract}) => this.extractCtrl.setValue(extract))
    this._perfiles.getInfoCollection<iProyecto>(this.RFC, 'experiencia')
      .subscribe(items => {
        console.log( items )
        this.items = items
      })
   }

  ngOnInit(): void {
  }

  get evidencias(): FormArray{
    return this.proyectoForm.get('evidencia') as FormArray
  }

  async onEditItem(item: iProyecto, index: number) {
    this.proyectoForm.setValue(item)
    this.editingItem = index
  }

  onUpdateInfo() {
    this._perfiles.updateInfoDoc(this.RFC, 'experiencia', {
      extract: this.extractCtrl.value
    })
  }



  onSetProyecto() {
    this._storage.upload().subscribe(files => {
      this.proyectoForm.patchValue({ evidencia: files })
      this._perfiles.setInfoItem(this.RFC, 'experiencia', this.proyectoForm.value)
        .then(() => {
          console.log( 'done!' )
          this.proyectoForm.reset()
          delete this.editingItem
        })
    })
  }

  removeGalleryImg(index:number) {
    this.evidencias.removeAt(index)
  }



  ngOnDestroy() {
  }

}
