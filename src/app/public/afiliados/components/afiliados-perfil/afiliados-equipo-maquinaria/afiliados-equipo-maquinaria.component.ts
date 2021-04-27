import { iUserAfiliado } from '../../../models/afiliados.model';
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
import { PerfilesService } from '../../../services/perfiles.service';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iMaqEquipItem } from '../../../models/perfiles.model';
@Component({
  templateUrl: './afiliados-equipo-maquinaria.component.html',
  styleUrls: ['./afiliados-equipo-maquinaria.component.scss'],
})
export class AfiliadosEquipoMaquinariaComponent implements OnInit {
  extractCtrl: FormControl;
  eqpmaqForm: FormGroup;

  RFC: string
  path: string
  metadata: any

  items: iMaqEquipItem[] = []

  constructor(
    private _loading: GdevLoading,
    public location_: Location,
    private _cache: GdevCache,
    _formBuilder: FormBuilder,
    public perfiles_: PerfilesService,
    private _storage: GdevStorage
  ) {
    this.extractCtrl = new FormControl('', [Validators.required]);
    this.eqpmaqForm = _formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      propio: new FormControl(false),
      comprobacion: new FormControl(false),
      evidencia: new FormControl(undefined),

    });
    const { RFC, email }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    this.RFC = RFC
    this.path = `afiliados/${RFC}/maquinaria-equipo`
    this.metadata = { RFC, email }
    this.perfiles_.getInfoCollection<iMaqEquipItem>(this.RFC, 'maquinaria-equipo')
    .subscribe(items => this.items = items)
  }

  ngOnInit(): void { }

  onSaveExtract(): void {
    this.perfiles_.updateInfoDoc( 'adicional.maqExtract', this.extractCtrl.value, this.RFC,)
    this.extractCtrl.markAsPristine()
  }


  onSaveItem() {
    this._storage.upload().subscribe(files => {
      this.eqpmaqForm.patchValue({ evidencia: files })
      this.perfiles_.setInfoItem(this.RFC, 'maquinaria-equipo', this.eqpmaqForm.value)
        .then(() => {
          console.log( 'done!' )
          this.eqpmaqForm.reset()
          this._storage.files = []
        })
    })
  }
}
