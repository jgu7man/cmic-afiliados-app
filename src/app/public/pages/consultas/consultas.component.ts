import { AfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParam } from "src/app/models/consultas.model";
import { ConsultasService } from 'src/app/services/consultas.service';
import { iPerfil } from '../../afiliados/models/perfiles.model';
import { ActividadesService } from '../../afiliados/services/actividades.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { GdevAlert } from 'gdev-alert';
import { MatDialog } from '@angular/material/dialog';
import { DialogClienteLoginComponent } from '../../clientes/components/dialog-cliente-login/dialog-cliente-login.component';

@Component({
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  queryValue: string
  queryKey: QueryParam
  afiliados: AfiliadoModel[] = []
  especialidad: string = ''
  actividad: string = ''

  constructor(
    private _route: ActivatedRoute,
    private _consultas: ConsultasService,
    private _actividades: ActividadesService,
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _alert: GdevAlert,
    private _dialog: MatDialog
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

    let result =  this._consultas.consulta(this.queryKey, this.queryValue)
    result.subscribe(data => {
      console.log( data )
      this.afiliados = data
    })

   }

  ngOnInit(): void {

  }

  avatar(perfil?: iPerfil) {
    return perfil?.imgPerfil ? perfil.imgPerfil.url : ''
  }

  goPerfil(slug: string) {
    this._afAuth.authState.subscribe(user => {
      if (user) this._router.navigate(['/afiliado', slug])
      else this._dialog.open(DialogClienteLoginComponent, {
        width: '370px',
        data: slug
      }).afterClosed().subscribe(slug => {
        if(slug) this._router.navigate(['/afiliado', slug])
      })
    })
  }

}
