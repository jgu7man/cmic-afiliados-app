import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';
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
    public perfil_: PerfilService,
  ) {

    this.items$ = this.perfil_.getInfoCollection
      <CertificacionModel>( 'certificaciones')

   }

  ngOnInit(): void {
  }

  sendToEdit(item: CertificacionModel, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

}
