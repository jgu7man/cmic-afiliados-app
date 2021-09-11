import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../../services/perfil.service';
import { emptyMember, MemberModel } from '../../../models/perfiles.model';
import { iUploadedFile } from '@marxa/storage';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './afiliados-recursos-humanos.component.html',
  styleUrls: ['./afiliados-recursos-humanos.component.scss'],
})
export class AfiliadosRecursosHumanosComponent implements OnInit, OnDestroy{

  memberForm: FormGroup;
  listDoc?: iUploadedFile
  items: MemberModel[] = []
  private fileSubscription: Subscription;

  constructor(
    public location_: Location,
    public perfil_: PerfilService,
  ) {


    this.memberForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
    })

    this.perfil_.initialize('recursos_humanos')
    this.fileSubscription = this.perfil_
      .getListFile( 'recursos_humanos' )
      .subscribe( file => this.listDoc = file ? file : undefined )
  }

  ngOnInit(): void {
    this.perfil_.editSubscription = this.perfil_
      .listenEditingItem.subscribe( item => {
        // console.log( item )
      this.memberForm.patchValue(item)
    })

  }

  onListUploaded(files: any) {
    this.perfil_.saveList(files[0], 'recursos_humanos')
  }

  async onSaveItem() {
    await this.perfil_.saveItems(this.memberForm, 'recursos_humanos')
    let {updated, id, ...item} = emptyMember
    this.memberForm.setValue(item)
    this.memberForm.markAsPristine()
  }

  ngOnDestroy() {
    this.perfil_.getOutSection()
    this.fileSubscription.unsubscribe()
  }


}
