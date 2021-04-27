import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/public/afiliados/models/perfiles.model';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';

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
    public perfiles_: PerfilesService,
  ) {

      this.items$ = this.perfiles_.getInfoCollection
        <MemberModel>( 'recursos_humanos')

   }

  ngOnInit(): void {
  }

  sendToEdit(item: MemberModel, index: number) {
    this.perfiles_.onEditItem(item)
    this.editingItem = index
  }

}
