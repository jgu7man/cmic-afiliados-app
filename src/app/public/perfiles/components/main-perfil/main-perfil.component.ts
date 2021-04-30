import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AfiliadoModel, emptyAfiliado, iAfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { iPerfil, iPersonal } from 'src/app/public/afiliados/models/perfiles.model';
import { AfiliadosService } from 'src/app/public/afiliados/services/afiliados.service';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'g-main-perfil',
  templateUrl: './main-perfil.component.html',
  styleUrls: ['./main-perfil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPerfilComponent implements OnInit {

  afiliado: AfiliadoModel = emptyAfiliado;
  perfil: iPerfil = {somos:''}
  RFC?: string
  perfilOutput = {
    experiencia: '',
    eqmaq: '',
    rrhh: '',
    conta: '',
    cert: '',
    personal: {} as iPersonal
  }
  constructor(
    private _route: ActivatedRoute,
    private _perfil: PerfilService,
    private _afiliados: AfiliadosService,
    private _consultas: ConsultasService,
  ) {
    let slug = this._route.snapshot.params['slug']
    this._consultas.consulta('slug', slug).subscribe(list => {
      if (list.length == 1) {
        let afiliado = list[0]
        this.perfil = afiliado.perfil as iPerfil
        this.afiliado = afiliado
        this.RFC = afiliado.datos_generales.RFC
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

  get banner() {
    return this.afiliado.perfil?.imgBanner ? this.afiliado.perfil.imgBanner.url : '/assets/img/cmic-perfil-banner.jpg'
  }

}
