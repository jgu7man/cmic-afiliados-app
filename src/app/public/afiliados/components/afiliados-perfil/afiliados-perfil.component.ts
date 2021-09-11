import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { MxCache } from '@marxa/devkit';
import { first, take } from 'rxjs/operators';
import { iAdmin } from 'src/app/admin/models/admin.model';
import { MxUploadModalComponent } from '@marxa/storage';
import { iUploadedFile, iUploadOptions } from '@marxa/storage';
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
  admin: iAdmin | null

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
    private _alert: MxAlert,
    private _route: ActivatedRoute,
    private _cache: MxCache,
    private _dialog: MatDialog,
    public perfil_: PerfilService
  ) {

    this.RFC = this._route.snapshot.params['RFC']
    this._cache.updateData('rfc', this.RFC)
    this.admin = this._cache.getDataKey<iAdmin>('admin')

    if (!this.RFC && !this.admin) {
      this._alert.message('Primero necesitas iniciar sesión como afiliado o administrador')
        this._router.navigate(['/afiliados/login'])
    } else {
      this._afiliados.getPerfil( this.RFC )
        .pipe(first())
        .subscribe( ( data ) => {
          // console.log( data )
        // TODO Poner un estado CARGANDO y apagarlo aquí
        if (data) {
          if (data.datos_generales.fisica_nombre || data.datos_generales.moral_nombre) {
            this.afiliado = data;
            this.RFC = data.datos_generales?.RFC as string;
            this.somos = data.perfil?.somos ? data.perfil.somos : ''
          } else {
            console.log( 'to afiliacion' )
            this._router.navigate(['/afiliados/afiliacion', this.RFC])
          }

        }
        else {
          this._alert.message('No se encontró el perfil')
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

    this._dialog.open(MxUploadModalComponent, {
      width: '40%',
      minHeight: '40%',
      data: options
    }).afterClosed().pipe(first()).subscribe((file: iUploadedFile[]) => {
      this.perfil_.updateInfoDoc('perfil.imgBanner', file[0])
    })

  }

  get banner() {
    return this.afiliado.perfil?.imgBanner ? this.afiliado.perfil.imgBanner.url : '/assets/img/cmic-perfil-banner.jpg'
  }

}
