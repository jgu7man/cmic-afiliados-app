import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MxCache } from '@marxa/devkit';
import { MxLoading } from '@marxa/devkit';
import { Location } from '@angular/common';
import { iManager } from '../../../models/afiliados.model';
import { PerfilService } from '../../../services/perfil.service';
import { iAdtionalInfo, CertificacionModel, emptyCert } from '../../../models/perfiles.model';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';
@Component({
  templateUrl: './afiliados-certificaciones-especializaciones.component.html',
  styleUrls: ['./afiliados-certificaciones-especializaciones.component.scss'],
})
export class AfiliadosCertificacionesEspecializacionesComponent
  implements OnInit, OnDestroy {

  certForm: FormGroup;

  constructor(
    private _loading: MxLoading,
    public location_: Location,
    private _cache: MxCache,
    public perfil_: PerfilService,
    private _storage: GdevStorage
  ) {


    this.certForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      aval: new FormControl('', [Validators.required]),
      miembro: new FormControl('', [Validators.required]),
      fecha: new FormControl(new Date().getFullYear(), [Validators.required]),
      evidencia: new FormControl([], [Validators.required]),
    });

    this.perfil_.initialize('certificaciones')

  }
  ngOnInit(): void {
    this.perfil_.editSubscription = this.perfil_
      .listenEditingItem.subscribe(item => {
      this.certForm.patchValue(item)
    })
  }

  get now() {
    return new Date()
  }

  get evidencias(): iUploadedFile[]{
    return this.certForm.get('evidencia')?.value as iUploadedFile[]
  }

  catchYear(year: any) {
    this.certForm.patchValue({fecha: year});
  }


  async onSaveItem() {
    await this.perfil_.saveItems(this.certForm, 'certificaciones')
    let {updated, id, ...item} = emptyCert
    this.certForm.setValue(item)
    this.certForm.markAsPristine()
  }

  removeGalleryImg(index: number) {
    this.evidencias.splice(index, 1)
    this.certForm.markAsDirty()
  }


  get validateProjectForm() {
    return (this.certForm.invalid || this.certForm.pristine ) && this._storage.files.length < 1
  }


  ngOnDestroy() {
    this.perfil_.getOutSection()
  }
}
