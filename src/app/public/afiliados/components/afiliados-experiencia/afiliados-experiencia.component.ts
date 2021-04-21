import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iUserAfiliado } from '../../models/afiliados.model';
import { iExperiencia, iProyecto } from '../../models/perfiles.model';
import { PerfilesService } from '../../services/perfiles.service';
import { MatDatepicker } from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as _moment from 'moment';
// import * as moment from 'moment';
const moment = _moment

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  templateUrl: './afiliados-experiencia.component.html',
  styleUrls: ['./afiliados-experiencia.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AfiliadosExperienciaComponent implements OnInit, OnDestroy {

  extractCtrl: FormControl
  proyectoForm: FormGroup;
  path: string
  metadata: any
  public RFC: string
  items: iProyecto[] = []
  editingItem?: number

  constructor(
    private _storage: GdevStorage,
    private _cache: GdevCache,
    public location_: Location,
    public _perfiles: PerfilesService,
    private _loading: GdevLoading
  ) {
    this.extractCtrl = new FormControl('', [Validators.required])
    this.proyectoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required]),
      fecha: new FormControl({value:'', disabled: true}, [Validators.required]),
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
      evidencia: new FormControl([], ),
    })

    const { RFC, email }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    this.path = `afiliados/${RFC}/experiencia`
    this.metadata = { RFC, email }
    this.RFC = RFC ? RFC : ''

    this._perfiles.getInfoDoc<iExperiencia>(this.RFC, 'experiencia')
    .then(data =>{ if (data) this.extractCtrl.setValue(data.extract)})
    this._perfiles.getInfoCollection<iProyecto>(this.RFC, 'experiencia')
      .subscribe(items => { this.items = items })
   }

  ngOnInit(): void {
  }

  get evidencias(): FormArray{
    console.log(this.proyectoForm.get('evidencia'))
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

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    console.log( normalizedYear.year() )
    //  this.proyectoForm.get('fecha')?.value;
    this.proyectoForm.patchValue({fecha: moment().year( normalizedYear.year())});
    datepicker.close();
  }

  onSetProyecto() {
    this._storage.upload().subscribe(files => {
      let evidencia = this.proyectoForm.get('evidencia')?.value as any[]
      files.forEach((file, index) => {
        evidencia.push(file as FormGroup)
      })
      this.proyectoForm.patchValue({ evidencia })
      this._storage.showDropzone = false
      this._perfiles.setInfoItem(this.RFC, 'experiencia', this.proyectoForm.value)
        .then(() => {
          console.log('done!')
          this.proyectoForm.reset()
          console.log( this.proyectoForm.value )
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
