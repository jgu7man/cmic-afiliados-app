import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MxResponsive } from '@marxa/devkit';
import { iUploadedFile } from '@marxa/storage';
import {  Observable } from 'rxjs';
import { MaqEquipItem } from 'src/app/public/afiliados/models/perfiles.model';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';

@Component({
  selector: 'g-perfil-equipo-maquinaria',
  templateUrl: './perfil-equipo-maquinaria.component.html',
  styleUrls: ['./perfil-equipo-maquinaria.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilEquipoMaquinariaComponent implements OnInit {


  @Input() edit: boolean = false
  editingItem?: number;
  items$?: Observable<MaqEquipItem[]>
  listDoc?: iUploadedFile
  @Output() items: EventEmitter<MaqEquipItem[]> = new EventEmitter()

  constructor(
    public perfil_: PerfilService,
    public responsive: MxResponsive
  ) {

    this.items$ = this.perfil_.getInfoCollection<MaqEquipItem>('equipo_maquinaria')
    this.items$.subscribe(items => this.items.emit(items))
    this.perfil_.getList('equipo_maquinaria').then(file => {
      this.listDoc = file
    })
   }

  ngOnInit(): void {
  }

  sendToEdit(item: MaqEquipItem, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }
}
