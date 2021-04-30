import { AfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';
import { QueryParam } from "src/app/models/consultas.model";
import { ConsultasService } from 'src/app/services/consultas.service';
import { iPerfil } from '../../afiliados/models/perfiles.model';
import { ActividadesService } from '../../afiliados/services/actividades.service';

@Component({
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  queryValue: string
  queryKey: QueryParam
  afiliados: AfiliadoModel[] = []
  especialidad: string
  constructor(
    private _route: ActivatedRoute,
    private _consultas: ConsultasService,
    private _actividades: ActividadesService,
    private _router: Router
  ) {
    let queryParams = Object.keys(this._route.snapshot.queryParams) as QueryParam[]
    this.queryKey = queryParams[0]
    this.queryValue = this._route.snapshot.queryParams[this.queryKey]

    this.especialidad = this.queryKey == 'especialidad' ? this.queryValue
      : this._actividades.getEspecialidadByCode(this.queryValue) as string


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
    this._router.navigate(['/afiliado', slug])
  }

}
