import { AfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParam, RequestItem } from "src/app/models/consultas.model";
import { ConsultasService } from 'src/app/services/consultas.service';
import { iPerfil } from '../../afiliados/models/perfiles.model';
import { ActividadesService } from '../../afiliados/services/actividades.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MxAlert } from '@marxa/devkit';
import { MatDialog } from '@angular/material/dialog';
import { DialogClienteLoginComponent } from '../../clientes/components/dialog-cliente-login/dialog-cliente-login.component';
import { first, takeWhile } from 'rxjs/operators';
import { PrintFileService } from 'src/app/services/print-file.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit, OnDestroy {

  queryValue: string
  queryKey: QueryParam
  afiliados?: RequestItem[]
  especialidad: string = ''
  actividad: string = ''
  querySubscription: Subscription

  constructor(
    private _route: ActivatedRoute,
    private _consultas: ConsultasService,
    private _actividades: ActividadesService,
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _alert: MxAlert,
    private _dialog: MatDialog,
    public print: PrintFileService
  ) {
    let queryParams = Object.keys(this._route.snapshot.queryParams) as QueryParam[]
    this.queryKey = queryParams[0]
    this.queryValue = this._route.snapshot.queryParams[this.queryKey]

    if (this.queryKey == 'codigo') {
      let actividad = this._actividades.allActividades
        .find(act => act.codigo === this.queryValue)
      if (actividad) {
        this.actividad = actividad.nombre
        this.especialidad = actividad.especialidad
      }
    } else {
      this.especialidad = this.queryValue
    }

    let result = this._consultas.consulta( this.queryKey, this.queryValue )
    this.querySubscription =
      result.subscribe( data => {
        // console.log( data )
        this.afiliados = data
      } )

   }

  ngOnInit(): void {

  }

  avatar(perfil?: iPerfil) {
    return perfil?.imgPerfil ? perfil.imgPerfil.url : ''
  }

  goPerfil(slug: string) {
    this._afAuth.authState
      .pipe(takeWhile(user => !user, true))
      .subscribe( user => {
        // console.log( user )
        if (user) this._router.navigate(['/afiliado', slug])
        else this._dialog.open(DialogClienteLoginComponent, {
          width: '370px',
          data: slug
        }).afterClosed().pipe(first()).subscribe(slug => {
          if(slug) this._router.navigate(['/afiliado', slug])
        })
    })
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe()
  }

}
