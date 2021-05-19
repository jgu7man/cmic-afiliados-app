import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';
import { Proyecto } from 'src/app/public/afiliados/models/perfiles.model';

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
    public  perfil_: PerfilService,
  ) {

    this.items$ = this.perfil_.getInfoCollection<Proyecto>('experiencia')
  }

  ngOnInit(): void {
  }

  sendToEdit(item: Proyecto, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

}
