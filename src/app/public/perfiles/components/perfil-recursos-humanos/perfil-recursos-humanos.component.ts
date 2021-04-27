import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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

  constructor(
    public perfil_: PerfilService,
  ) {

      this.items$ = this.perfil_.getInfoCollection
        <MemberModel>( 'recursos_humanos')

   }

  ngOnInit(): void {
  }

  sendToEdit(item: MemberModel, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

}
