import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject } from 'rxjs';
import { AfiliadoModel, emptyAfiliado } from 'src/app/public/afiliados/models/afiliados.model';
import { iPerfil } from 'src/app/public/afiliados/models/perfiles.model';

@Component({
  selector: 'g-perfil-mobile',
  templateUrl: './perfil-mobile.component.html',
  styleUrls: ['./perfil-mobile.component.scss']
})
export class PerfilMobileComponent implements OnInit, AfterViewInit {

  private _afiliado : BehaviorSubject<AfiliadoModel> = new BehaviorSubject(emptyAfiliado);
  @Input() set afiliado(afi: AfiliadoModel) { this._afiliado.next(afi); }
  get afiliado() { return this._afiliado.getValue()}

  perfil: iPerfil = { somos: '' }

  @ViewChild('infoZone') private infoZone?: MatAccordion

  constructor() { }

  ngOnInit(): void {
    this._afiliado.subscribe(afiliado => {
      if (afiliado) {
        if (afiliado.perfil) this.perfil = afiliado.perfil  as iPerfil
      }
    })
  }

  ngAfterViewInit() {
    console.log( this.infoZone )
    this.infoZone?.openAll()
  }

  get banner() {
    return this.afiliado.perfil?.imgBanner?.url ?
      this.afiliado.perfil?.imgBanner?.url :
      '/assets/img/cmic-perfil-banner.jpg'
  }

}
