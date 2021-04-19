import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iAfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { iPerfil, iRecHumanos } from 'src/app/public/afiliados/models/perfiles.model';
import { AfiliadosService } from 'src/app/public/afiliados/services/afiliados.service';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';

@Component({
  selector: 'g-main-perfil',
  templateUrl: './main-perfil.component.html',
  styleUrls: ['./main-perfil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPerfilComponent implements OnInit {

  afiliado: iAfiliadoModel = {};
  perfil: iPerfil = {somos:''}
  RFC: string
  perfilOutput = {
    experiencia: '',
    eqmaq: '',
    rrhh: '',
    conta: '',
    cert: '',
    personal: {} as iRecHumanos
  }
  constructor(
    private _route: ActivatedRoute,
    private _perfiles: PerfilesService,
    private _afiliados: AfiliadosService,
  ) {
    this.RFC = this._route.snapshot.params['RFC']
    this._perfiles.getInfoDoc<iPerfil>(this.RFC, 'perfil')
      .then(perfil => { if (perfil) this.perfil = perfil })
    this._afiliados.getPerfilAfiliado(this.RFC).subscribe((data) => {
      this.afiliado = data
     })
   }

  ngOnInit(): void {
  }

}
