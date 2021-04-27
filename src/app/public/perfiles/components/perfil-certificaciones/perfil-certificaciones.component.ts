import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';
import { CertificacionModel } from '../../../afiliados/models/perfiles.model';

@Component({
  selector: 'g-perfil-certificaciones',
  templateUrl: './perfil-certificaciones.component.html',
  styleUrls: ['./perfil-certificaciones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilCertificacionesComponent implements OnInit {

  @Input() edit: boolean = false;
  editingItem?: number
  items$?: Observable<CertificacionModel[]>

  constructor(
    public perfiles_: PerfilesService,
  ) {

    this.items$ = this.perfiles_.getInfoCollection
      <CertificacionModel>( 'certificaciones')

   }

  ngOnInit(): void {
  }

  sendToEdit(item: CertificacionModel, index: number) {
    this.perfiles_.onEditItem(item)
    this.editingItem = index
  }

}
