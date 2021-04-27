import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
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

  constructor(
    public perfil_: PerfilService,
  ) {

    this.items$ = this.perfil_.getInfoCollection<MaqEquipItem>('equipo_maquinaria')

   }

  ngOnInit(): void {
  }

  sendToEdit(item: MaqEquipItem, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }
}
