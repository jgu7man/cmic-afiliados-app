import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PerfilService } from '../../../services/perfil.service';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { emptyMaqEquip } from '../../../models/perfiles.model';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';
@Component({
  templateUrl: './afiliados-equipo-maquinaria.component.html',
  styleUrls: ['./afiliados-equipo-maquinaria.component.scss'],
})
export class AfiliadosEquipoMaquinariaComponent implements OnInit {

  eqpmaqForm: FormGroup;

  constructor(
    public location_: Location,
    public perfil_: PerfilService,
    private _storage: GdevStorage,
    _formBuilder: FormBuilder,
  ) {
    this.eqpmaqForm = _formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      propio: new FormControl(false),
      comprobacion: new FormControl(false),
      evidencia: new FormControl([]),

    });

    this.perfil_.initialize('equipo_maquinaria')
  }

  ngOnInit(): void {
    this.perfil_.editSubscription = this.perfil_
      .listenEditingItem.subscribe(item => {
      this.eqpmaqForm.patchValue(item)
    })
   }


   get evidencias(): iUploadedFile[]{
    return this.eqpmaqForm.get('evidencia')?.value as iUploadedFile[]
  }


  async onSaveItem() {
    await this.perfil_.saveItems(this.eqpmaqForm, 'equipo_maquinaria')
    let {updated, id, ...item} = emptyMaqEquip
    this.eqpmaqForm.setValue(item)
    this.eqpmaqForm.markAsPristine()
  }

  removeGalleryImg(index: number) {
    this.evidencias.splice(index, 1)
    this.eqpmaqForm.markAsDirty()
  }

  get validateProjectForm() {
    return (this.eqpmaqForm.invalid || this.eqpmaqForm.pristine ) && this._storage.files.length < 1
  }


  ngOnDestroy() {
    this.perfil_.getOutSection()
  }

}
