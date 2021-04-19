import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { GdevCache } from 'gdev-cache';
import { take } from 'rxjs/operators';
import { iAfiliadoModel, iUserAfiliado } from '../../models/afiliados.model';
import { iRecHumanos } from '../../models/perfiles.model';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  templateUrl: './afiliados-perfil.component.html',
  styleUrls: ['./afiliados-perfil.component.scss'],
})
export class AfiliadosPerfilComponent implements OnInit {
  afiliado: iAfiliadoModel = {};
  somos: string = 'Escribe un contenido acerca de la empresa'
  RFC: string

  perfilOutput = {
    experiencia: '',
    eqmaq: '',
    rrhh: '',
    conta: '',
    cert: '',
    personal: {} as iRecHumanos
  }

  @ViewChild('img') private imgPerfil?: HTMLImageElement
  // perfilHeight: number

  constructor(
    private _afiliadosService: AfiliadosService,
    private _router: Router,
    private _alert: GdevAlert,
    private _route: ActivatedRoute,
    private _cache: GdevCache,
  ) {
    // if (this.imgPerfil) this.perfilHeight = this.imgPerfil.offsetWidth
    this.RFC = this._route.snapshot.params['RFC']
    if (!this.RFC) {
      this.RFC = this._cache.getDataKey<iUserAfiliado>('user')?.RFC as string
    }
    this._afiliadosService.getPerfilAfiliado(this.RFC).subscribe((data) => {
      console.log(data);
      if (data) {
        this.afiliado = data;
        this.RFC = data.datos_generales?.RFC as string;
      }
      else {
        this._alert.sendMessageAlert('Primero necesitas iniciar sesión')
        // this._router.navigate(['/afiliados/login'])

      }
    });
  }

  ngOnInit(): void { }




}
