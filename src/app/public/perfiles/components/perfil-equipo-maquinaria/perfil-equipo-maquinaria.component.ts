import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MxResponsive } from '@marxa/devkit';
import { iUploadedFile } from '@marxa/storage';
import {  Observable, Subscription } from 'rxjs';
import { MaqEquipItem } from 'src/app/public/afiliados/models/perfiles.model';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';

@Component({
  selector: 'g-perfil-equipo-maquinaria',
  templateUrl: './perfil-equipo-maquinaria.component.html',
  styleUrls: ['./perfil-equipo-maquinaria.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilEquipoMaquinariaComponent implements OnInit, OnDestroy {


  @Input() edit: boolean = false
  editingItem?: number;
  items$?: Observable<MaqEquipItem[]>
  listDoc?: iUploadedFile
  @Output() items: EventEmitter<MaqEquipItem[]> = new EventEmitter()
  private itemsSubscription: Subscription
  private fileSubscription: Subscription;

  constructor(
    public perfil_: PerfilService,
    public responsive: MxResponsive
  ) {

    this.items$ = this.perfil_.getInfoCollection<MaqEquipItem>( 'equipo_maquinaria' )
    this.itemsSubscription =
      this.items$.subscribe( items => {
        // console.log( items )
        this.items.emit( items )
      } )
    this.fileSubscription = this.perfil_
      .getListFile( 'equipo_maquinaria' )
      .subscribe( file => this.listDoc = file ? file : undefined )
   }

  ngOnInit(): void {
  }

  sendToEdit(item: MaqEquipItem, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe()
    this.fileSubscription.unsubscribe()
  }
}
