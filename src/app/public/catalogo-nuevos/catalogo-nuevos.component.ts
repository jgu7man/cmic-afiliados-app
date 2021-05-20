import { Component, Input, OnInit } from '@angular/core';
import { iUploadedFile } from '@marxa/storage';
import { AfiliadoModel } from '../afiliados/models/afiliados.model';
import { iPerfil } from '../afiliados/models/perfiles.model';
import { AfiliadosService } from '../afiliados/services/afiliados.service';

@Component({
  selector: 'g-catalogo-nuevos',
  templateUrl: './catalogo-nuevos.component.html',
  styleUrls: ['./catalogo-nuevos.component.scss']
})
export class CatalogoNuevosComponent implements OnInit {

  afiliados: AfiliadoModel[] = []
  @Input() cantidad: number = 4
  constructor(
    private _afiliados: AfiliadosService
  ) {
    this._afiliados.getRecentAfiliados(this.cantidad).subscribe(list => {
      this.afiliados = list
    })
   }

  ngOnInit(): void {
  }

  logoImage(img: iUploadedFile) {
    return `url('${img.url}')`
  }

  avatar(perfil?: iPerfil) {
    return perfil?.imgPerfil ? perfil.imgPerfil.url : ''
  }

}
