import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { iUploadedFile } from '@marxa/storage';
import { Observable, Subscription } from 'rxjs';
import { MemberModel } from 'src/app/public/afiliados/models/perfiles.model';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';

@Component({
  selector: 'g-perfil-recursos-humanos',
  templateUrl: './perfil-recursos-humanos.component.html',
  styleUrls: ['./perfil-recursos-humanos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilRecursosHumanosComponent implements OnInit, OnDestroy {


  @Input() edit: boolean = false
  editingItem?: number;
  items$?: Observable<MemberModel[]>
  listDoc?: iUploadedFile
  @Output() items: EventEmitter<MemberModel[]> = new EventEmitter()
  private itemsSubscription: Subscription
  private fileSubscription: Subscription;

  constructor(
    public perfil_: PerfilService,
  ) {

      this.items$ = this.perfil_.getInfoCollection
      <MemberModel>( 'recursos_humanos' )
    this.itemsSubscription =
      this.items$.subscribe( items => {
        // console.log( items )
        this.items.emit( items )
      } )
    this.fileSubscription = this.perfil_
      .getListFile( 'recursos_humanos' )
      .subscribe( file => this.listDoc = file ? file : undefined )

   }

  ngOnInit(): void {
  }

  sendToEdit(item: MemberModel, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe()
    this.fileSubscription.unsubscribe()
  }

}
