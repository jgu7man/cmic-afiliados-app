import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';
import { Proyecto } from 'src/app/public/afiliados/models/perfiles.model';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'g-perfil-experiencia',
  templateUrl: './perfil-experiencia.component.html',
  styleUrls: ['./perfil-experiencia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilExperienciaComponent implements OnInit {



  @Input() edit: boolean = false;
  editingItem?: number

  items$?: Observable<Proyecto[]>

  constructor(
    public  perfiles_: PerfilesService,
  ) {

    this.items$ = this.perfiles_.getInfoCollection<Proyecto>('experiencia')
  }

  ngOnInit(): void {
  }

  sendToEdit(item: Proyecto, index: number) {
    this.perfiles_.onEditItem(item)
    this.editingItem = index
  }

}
