import { iUserAfiliado } from '../../../models/afiliados.model';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevStorage } from '../../../../../gdev/gdev-storage/storage-service.service';
import { PerfilesService } from '../../../services/perfiles.service';
import { iPersonal, iMemberModel } from '../../../models/perfiles.model';
import { GdevAlert } from 'gdev-alert';

@Component({
  templateUrl: './afiliados-recursos-humanos.component.html',
  styleUrls: ['./afiliados-recursos-humanos.component.scss'],
})
export class AfiliadosRecursosHumanosComponent implements OnInit {
  rrhhForm: FormGroup;
  memberForm: FormGroup;

  RFC: string
  path: string
  metadata: any
  items: iMemberModel[] = []
  constructor(
    private _storage: GdevStorage,
    private _cache: GdevCache,
    public location_: Location,
    public perfiles_: PerfilesService,
    public alert_: GdevAlert
  ) {

    this.rrhhForm = new FormGroup({
      extract: new FormControl('', [Validators.required]),
      planta_fija: new FormControl('', [Validators.required]),
      capacidad_proyecto: new FormControl('', [Validators.required]),
      hombres: new FormControl('',),
      mujeres: new FormControl('',),
    });

    this.memberForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      contacto: new FormControl('', [Validators.required]),
    })
    const { RFC, email }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    this.RFC = RFC
    this.path = `afiliados/${RFC}/recursos-humanos`
    this.metadata = { RFC, email }

    this.perfiles_.getInfoCollection<iMemberModel>(this.RFC, 'recursos-humanos')
    .subscribe(items => this.items = items)
  }

  ngOnInit(): void {

  }

  onSaveInfo(): void {
    this.perfiles_.updateInfoDoc('adicional.rrhhExtract', this.rrhhForm.value['extract'], this.RFC)
  }

  onSaveItem() {
    this.perfiles_.setInfoItem(this.RFC, 'recursos-humanos', this.memberForm.value)
      .then(() => {
        console.log( 'done!' )
        this.memberForm.reset()
        this.memberForm.markAsPristine()
      })
  }

}
