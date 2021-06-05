import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { iUploadedFile } from '@marxa/storage';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/public/afiliados/models/perfiles.model';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';

@Component({
  selector: 'g-perfil-recursos-humanos',
  templateUrl: './perfil-recursos-humanos.component.html',
  styleUrls: ['./perfil-recursos-humanos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilRecursosHumanosComponent implements OnInit {


  @Input() edit: boolean = false
  editingItem?: number;
  items$?: Observable<MemberModel[]>
  listDoc?: iUploadedFile
  @Output() items: EventEmitter<MemberModel[]> = new EventEmitter()

  constructor(
    public perfil_: PerfilService,
  ) {

      this.items$ = this.perfil_.getInfoCollection
      <MemberModel>('recursos_humanos')
    this.items$.subscribe(items => this.items.emit(items))
    this.perfil_.getList('recursos_humanos').then(file => {
      this.listDoc = file
    })

   }

  ngOnInit(): void {
  }

  sendToEdit(item: MemberModel, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

}
