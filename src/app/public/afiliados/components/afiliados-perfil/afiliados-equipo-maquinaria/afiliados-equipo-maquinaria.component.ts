import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PerfilService } from '../../../services/perfil.service';
import { MxStorage } from '@marxa/storage';
import { emptyMaqEquip, MaqEquipItem } from '../../../models/perfiles.model';
import { iUploadedFile } from '@marxa/storage';
import { Subscription } from 'rxjs';
@Component({
  templateUrl: './afiliados-equipo-maquinaria.component.html',
  styleUrls: ['./afiliados-equipo-maquinaria.component.scss'],
})
export class AfiliadosEquipoMaquinariaComponent implements OnInit, OnDestroy {

  eqpmaqForm: FormGroup;
  listDoc?: iUploadedFile
  items: MaqEquipItem[] = []
  private fileSubscription: Subscription;

  constructor(
    public location_: Location,
    public perfil_: PerfilService,
    private _storage: MxStorage,
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
    this.fileSubscription = this.perfil_
      .getListFile( 'equipo_maquinaria' )
      .subscribe( file => {
        // console.log( file )
        this.listDoc = file ? file : undefined
      } )
  }

  ngOnInit(): void {
    this.perfil_.editSubscription = this.perfil_
      .listenEditingItem.subscribe( item => {
        // console.log( item )
      this.eqpmaqForm.patchValue(item)
    })
   }


   get evidencias(): iUploadedFile[]{
    return this.eqpmaqForm.get('evidencia')?.value as iUploadedFile[]
  }

  onListUploaded(files: any) {
    this.perfil_.saveList(files[0], 'equipo_maquinaria')
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
    this.fileSubscription.unsubscribe()
  }

}
