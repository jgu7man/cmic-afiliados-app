import { Title } from '@angular/platform-browser';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { MxAlert, MxCache, MxResponsive } from '@marxa/devkit';
import { filter, take } from 'rxjs/operators';
import { AfiliadoModel, emptyAfiliado, iAfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { iPerfil, iPersonal } from 'src/app/public/afiliados/models/perfiles.model';
import { AfiliadosService } from 'src/app/public/afiliados/services/afiliados.service';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Subscription } from 'rxjs';
import { PrintFileService } from 'src/app/services/print-file.service';

@Component({
  selector: 'g-main-perfil',
  templateUrl: './main-perfil.component.html',
  styleUrls: ['./main-perfil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPerfilComponent implements OnInit, OnDestroy {

  afiliado: AfiliadoModel = emptyAfiliado;

  RFC?: string
  perfilOutput = {
    experiencia: '',
    eqmaq: '',
    rrhh: '',
    conta: '',
    cert: '',
    personal: {} as iPersonal
  }

  authSubscription: Subscription
  constructor(
    private _afiliados: AfiliadosService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _consultas: ConsultasService,
    private _auth: MxAuth,
    private _title: Title,
    private _alert: MxAlert,
    private _cache: MxCache,
    public responsive: MxResponsive,
    public print: PrintFileService
  ) {

    this.authSubscription =
    this._auth.user$.subscribe((user) => {
      if (!user) {
        this._alert.request({
          message: 'Para ver el perfil, necesitas iniciar sesión primero.',
          trueLabel: 'Iniciar como cliente',
          falseLabel: 'Iniciar como afiliado'
        }).subscribe(confirmation => {
          if (confirmation) this._router.navigate(['/clientes/login'])
          else this._router.navigate(['/afiliados/login'])
        })
      }
    })
    let slug = this._route.snapshot.params['slug']
    this._consultas.getAfiliadoBySlug(slug).subscribe(list => {
      if (list.length == 1) {
        let afiliado = list[0]
        // console.log( afiliado )
        this.afiliado = afiliado
        this.RFC = afiliado.datos_generales.RFC
        this._cache.updateData('rfc', this.RFC)
        this._title.setTitle(`CMIC - ${afiliado.datos_generales.comercial_nombre}`)
      }
    })
    // this._perfil.getInfoDoc<iPerfil>( 'perfil')
    //   .then(perfil => { if (perfil) this.perfil = perfil })
    // this._afiliados.getPerfil(this.RFC).subscribe((data) => {
    //   if (data) this.afiliado = data
    //  })
   }

  ngOnInit(): void {
  }



  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }

}
