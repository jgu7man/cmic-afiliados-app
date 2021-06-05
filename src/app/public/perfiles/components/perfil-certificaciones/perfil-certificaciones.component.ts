import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MxResponsive } from '@marxa/devkit';
import { iUploadedFile } from '@marxa/storage';
import {  Observable } from 'rxjs';
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
  listDoc?: iUploadedFile
  @Output() items: EventEmitter<CertificacionModel[]> = new EventEmitter()

  constructor(
    public perfil_: PerfilService,
    public responsive: MxResponsive
  ) {

    this.items$ = this.perfil_.getInfoCollection
      <CertificacionModel>('certificaciones')
    this.items$.subscribe(items => this.items.emit(items))
    this.perfil_.getList('certificaciones').then(file => {
      this.listDoc = file
    })

   }

  ngOnInit(): void {
  }

  sendToEdit(item: CertificacionModel, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

}
