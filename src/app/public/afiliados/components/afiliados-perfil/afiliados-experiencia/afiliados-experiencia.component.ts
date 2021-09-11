import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxStorage } from '@marxa/storage';
import { emptyProyecto, Proyecto } from '../../../models/perfiles.model';
import { PerfilService } from '../../../services/perfil.service';
import { iUploadedFile } from '@marxa/storage';
import { MxText } from '@marxa/devkit';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './afiliados-experiencia.component.html',
  styleUrls: ['./afiliados-experiencia.component.scss'],

})
export class AfiliadosExperienciaComponent implements OnInit, OnDestroy {

  proyectoForm: FormGroup;
  listDoc?: iUploadedFile
  items: Proyecto[] = []
  private fileSubscription!: Subscription;

  constructor(
    public storage_: MxStorage,
    public perfil_: PerfilService,
    public location_: Location,
    public text: MxText
  ) {

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

    this.perfil_.initialize('experiencia')
   }

  async ngOnInit(){
    this.perfil_.editSubscription = this.perfil_
      .listenEditingItem.subscribe( item => {
        // console.log( item )
        this.proyectoForm.patchValue(item)
      })
    this.fileSubscription = this.perfil_
      .getListFile( 'experiencia' )
      .subscribe( file => this.listDoc = file ? file : undefined )
  }

  get now() {
    return new Date()
  }

  get evidencias(): iUploadedFile[]{
    return this.proyectoForm.get('evidencia')?.value as iUploadedFile[]
  }

  onListUploaded(files: any) {
    this.perfil_.saveList(files[0], 'experiencia')
  }

  catchYear(year: any) {
    this.proyectoForm.patchValue({fecha: year});
  }

  async onSetProyecto() {
    console.log( this.proyectoForm )
    await this.perfil_.saveItems(this.proyectoForm, 'experiencia')
    let {updated, id, ...item} = emptyProyecto
    this.proyectoForm.setValue(item)
    this.proyectoForm.markAsPristine()
  }


  removeGalleryImg(index: number) {
    this.evidencias.splice(index, 1)
    this.proyectoForm.markAsDirty()
  }


  get validateProjectForm() {
    let ubicacion = this.proyectoForm.get('ubicacion') as FormControl
    return (this.proyectoForm.invalid || this.proyectoForm.pristine  || ubicacion.invalid) && this.storage_.files.length < 1
  }


  ngOnDestroy() {
    this.perfil_.getOutSection()
    this.fileSubscription.unsubscribe()
  }

}
