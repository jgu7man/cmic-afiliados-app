import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';
import { take } from 'rxjs/operators';
import { GdevUploadModalComponent } from 'src/app/gdev/gdev-storage/components/upload-modal/upload-modal.component';
import { iUploadedFile, iUploadOptions } from 'src/app/gdev/gdev-storage/storage.model';
import { AfiliadoModel, emptyAfiliado, iAfiliadoModel, iManager } from '../../models/afiliados.model';
import { iPersonal } from '../../models/perfiles.model';
import { AfiliadosService } from '../../services/afiliados.service';
import { ManagersService } from '../../services/managers.service';
import { PerfilService } from '../../services/perfil.service';

@Component({
  templateUrl: './afiliados-perfil.component.html',
  styleUrls: ['./afiliados-perfil.component.scss'],
})
export class AfiliadosPerfilComponent implements OnInit {
  afiliado: AfiliadoModel = emptyAfiliado;
  somos: string = 'Escribe un contenido acerca de la empresa'
  RFC: string

  perfilOutput = {
    experiencia: '',
    eqmaq: '',
    rrhh: '',
    conta: '',
    cert: '',
    personal: {} as iPersonal
  }

  @ViewChild('img') private imgPerfil?: HTMLImageElement
  // perfilHeight: number

  constructor(
    private _afiliados: AfiliadosService,
    private _router: Router,
    private _alert: GdevAlert,
    private _route: ActivatedRoute,
    private _cache: GdevCache,
    private _dialog: MatDialog,
    public perfil_: PerfilService
  ) {

    let param = this._route.snapshot.params['RFC']
    this.RFC = param ? param
      : this._cache.getDataKey<iManager>('user')?.RFC as string

    if (!this.RFC) {
      this._alert.sendMessageAlert('Primero necesitas iniciar sesión como afiliado o administrador')
        this._router.navigate(['/afiliados/login'])
    } else {
      this._afiliados.getPerfil(this.RFC).subscribe((data) => {
        // TODO Poner un estado CARGANDO y apagarlo aquí
        if (data) {
          console.log( data )
          this.afiliado = data;
          this.RFC = data.datos_generales?.RFC as string;
          this.somos = data.perfil?.somos ? data.perfil.somos : ''

        }
        else {
          this._alert.sendMessageAlert('No se encontró el perfil')
        }
      });
    }

  }

  ngOnInit(): void { }

  uploadProfileImage(): void {

    let options: iUploadOptions = {
      path: `afiliados/${this.afiliado.datos_generales.RFC}`,
      multiple: false,
      'uploadButton': true
    }

    this._dialog.open(GdevUploadModalComponent, {
      width: '40%',
      minHeight: '40%',
      data: options
    }).afterClosed().subscribe((file: iUploadedFile[]) => {
      this.perfil_.updateInfoDoc('perfil.imgBanner', file[0])
    })

  }

  get banner() {
    return this.afiliado.perfil?.imgBanner ? this.afiliado.perfil.imgBanner.url : '/assets/img/cmic-perfil-banner.jpg'
  }

}
