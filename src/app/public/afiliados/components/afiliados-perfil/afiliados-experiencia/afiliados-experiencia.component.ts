import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iUserAfiliado } from '../../../models/afiliados.model';
import { emptyProyecto, iAdtionalInfo, iProyecto } from '../../../models/perfiles.model';
import { PerfilesService } from '../../../services/perfiles.service';
import { MatDatepicker } from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { GdevAlert } from 'gdev-alert';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';


@Component({
  templateUrl: './afiliados-experiencia.component.html',
  styleUrls: ['./afiliados-experiencia.component.scss'],

})
export class AfiliadosExperienciaComponent implements OnInit, OnDestroy {

  extractCtrl: FormControl
  proyectoForm: FormGroup;
  path: string
  metadata: any
  public RFC: string
  items: iProyecto[] = []
  editingItem?: string

  constructor(
    public storage_: GdevStorage,
    private _cache: GdevCache,
    public location_: Location,
    public _perfiles: PerfilesService,
    private _loading: GdevLoading,
    private _alert: GdevAlert
  ) {
    this.extractCtrl = new FormControl('', [Validators.required])
    this.proyectoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required]),
      fecha: new FormControl(new Date().getFullYear(), [Validators.required]),
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
      sector: new FormControl('Público', [Validators.required]),
      evidencia: new FormControl([] ),
    })

    const { RFC, email }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    this.path = `afiliados/${RFC}/experiencia`
    this.metadata = { RFC, email }
    this.RFC = RFC ? RFC : ''

    this._perfiles.getInfoDoc<iAdtionalInfo>(this.RFC, 'adicional.expExtract')
    .then(data =>{ if (data) this.extractCtrl.setValue(data.extract)})
    this._perfiles.getInfoCollection<iProyecto>(this.RFC, 'experiencia')
      .subscribe(items => { this.items = items })
   }

  ngOnInit(): void {
  }

  get now() {
    return new Date()
  }

  get evidencias(): iUploadedFile[]{
    return this.proyectoForm.get('evidencia')?.value as iUploadedFile[]
  }

  async onEditItem({ updated, id, ...item }: iProyecto) {
    console.log( item )
    this.editingItem = id
    this.proyectoForm.patchValue(item)


  }

  onUpdateInfo() {
    this._perfiles.updateInfoDoc(
      'adicional.expExtract', this.extractCtrl.value, this.RFC
    )
  }

  catchYear(year: any) {
    this.proyectoForm.patchValue({fecha: year});
  }

  async onSetProyecto() {
    let evidencia = this.proyectoForm.get('evidencia') as FormArray

    // Valida menos de 3 archivos por proyecto
    if (evidencia.length + this.storage_.files.length > 3) {
      this._alert.sendMessageAlert(
        'No está permitido subir más de 3 imágenes por proyecto'
      )
    }


    else {
      if (this.storage_.files.length > 0) {
        console.log( 'Subir archivos' )
        await this.saveFiles()
        console.log( 'Archivos subidos' )
      }

      this._perfiles.setInfoItem(this.RFC, 'experiencia', this.proyectoForm.value, this.editingItem)
        .then(() => {
          console.log('done!')
          let {updated, id, ...item} = emptyProyecto

          this.proyectoForm.setValue(item)
          this.proyectoForm.markAsPristine()
          delete this.editingItem
        })

      }
  }

  async saveFiles(): Promise<iUploadedFile[]> {
    return new Promise<iUploadedFile[]>((resolve, reject) => {


      this.storage_.upload().subscribe(async files => {
        console.log( files )
        let evidencia = this.proyectoForm.get('evidencia')?.value as any[]

        await this._loading.asyncForEach(
        files, (file:iUploadedFile) => {
          evidencia.push(file)
        })

        console.log( {evidencia} )
        this.proyectoForm.patchValue({ evidencia })
        this.storage_.showDropzone = false

        resolve(files)
      })
    })
  }




  removeGalleryImg(index: number) {
    this.evidencias.splice(index, 1)
    this.proyectoForm.markAsDirty()
  }


  get validateProjectForm() {
    let ubicacion = this.proyectoForm.get('ubicacion') as FormControl
    // console.log({
    //   filesLength: this.storage_.files.length < 1,
    //   form: (this.proyectoForm.invalid && this.proyectoForm.pristine  && ubicacion.invalid),
    //   ubicacion: ubicacion.invalid,
    //   all: (this.proyectoForm.invalid && this.proyectoForm.pristine  && ubicacion.invalid) && this.storage_.files.length < 1
    // })
    return (this.proyectoForm.invalid || this.proyectoForm.pristine  || ubicacion.invalid) && this.storage_.files.length < 1
  }


  ngOnDestroy() {
  }

}
