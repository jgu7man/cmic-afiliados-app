import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { Location } from '@angular/common';
import { iUserAfiliado } from '../../models/afiliados.model';
import { PerfilesService } from '../../services/perfiles.service';
import { iCertificacion, iCertificaciones } from '../../models/perfiles.model';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
@Component({
  templateUrl: './afiliados-certificaciones-especializaciones.component.html',
  styleUrls: ['./afiliados-certificaciones-especializaciones.component.scss'],
})
export class AfiliadosCertificacionesEspecializacionesComponent
  implements OnInit {

  extractCtrl: FormControl;
  cerespForm: FormGroup;
  RFC: string
  path: string
  metadata: any
  items: iCertificacion[] = []

  constructor(
    private _loading: GdevLoading,
    public location_: Location,
    private _cache: GdevCache,
    public perfiles_: PerfilesService,
    private _storage: GdevStorage
  ) {

    this.extractCtrl = new FormControl('', [Validators.required]);

    this.cerespForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      aval: new FormControl('', [Validators.required]),
      miembro: new FormControl('', [Validators.required]),
      evidencia: new FormControl(undefined, [Validators.required]),
    });

    const { RFC, email }: iUserAfiliado = this._cache.getDataKey('user') as iUserAfiliado
    this.RFC = RFC
    this.path = `afiliados/${RFC}/certificaciones`
    this.metadata = { RFC, email }
    this.perfiles_.getInfoDoc<iCertificaciones>(this.RFC, 'certificaciones')
      .then(data =>{ if(data) this.extractCtrl.setValue(data.extract)})
    this.perfiles_.getInfoCollection<iCertificacion>(this.RFC, 'certificaciones')
    .subscribe(items => this.items = items)
  }
  ngOnInit(): void { }

  onSaveInfo() {
    this.perfiles_.updateInfoDoc(this.RFC, 'certificaciones', {extract: this.extractCtrl.value})
  }

  onSaveItem() {
    this._storage.upload().subscribe(files => {
      this.cerespForm.patchValue({ evidencia: files })
      this.perfiles_.setInfoItem(this.RFC, 'certificaciones', this.cerespForm.value)
        .then(() => {
          console.log( 'done!' )
          this.cerespForm.reset()
          this.cerespForm.markAsPristine()
          this._storage.files = []
        })
    })
  }
}
