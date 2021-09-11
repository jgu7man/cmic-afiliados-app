import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MxResponsive } from '@marxa/devkit';
import { iUploadedFile } from '@marxa/storage';
import { Subscription } from 'rxjs';
import {  Observable } from 'rxjs';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';
import { CertificacionModel } from '../../../afiliados/models/perfiles.model';

@Component({
  selector: 'g-perfil-certificaciones',
  templateUrl: './perfil-certificaciones.component.html',
  styleUrls: ['./perfil-certificaciones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilCertificacionesComponent implements OnInit, OnDestroy {

  @Input() edit: boolean = false;
  editingItem?: number
  items$?: Observable<CertificacionModel[]>
  listDoc?: iUploadedFile
  @Output() items: EventEmitter<CertificacionModel[]> = new EventEmitter()
  private itemsSubscription: Subscription
  private fileSubscription: Subscription;

  constructor(
    public perfil_: PerfilService,
    public responsive: MxResponsive
  ) {

    this.items$ = this.perfil_.getInfoCollection
      <CertificacionModel>( 'certificaciones' )
    this.itemsSubscription =
      this.items$.subscribe( items => {
        // console.log( items )
        this.items.emit( items )
      } )

    this.fileSubscription = this.perfil_
      .getListFile( 'certificaciones' )
      .subscribe( file => this.listDoc = file ? file : undefined )

   }

  ngOnInit(): void {
  }

  sendToEdit(item: CertificacionModel, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe()
    this.fileSubscription.unsubscribe()
  }

}
