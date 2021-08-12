import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AfiliadoModel, emptyAfiliado } from 'src/app/public/afiliados/models/afiliados.model';
import { iPerfil } from 'src/app/public/afiliados/models/perfiles.model';

@Component({
  selector: 'g-perfil-desktop',
  templateUrl: './perfil-desktop.component.html',
  styleUrls: ['./perfil-desktop.component.scss']
})
export class PerfilDesktopComponent implements OnInit, AfterViewInit {

  private _afiliado : BehaviorSubject<AfiliadoModel> = new BehaviorSubject(emptyAfiliado);
  @Input() set afiliado(afi: AfiliadoModel) { this._afiliado.next(afi); }
  get afiliado() { return this._afiliado.getValue()}

  perfil: iPerfil = { somos: '' }

  sidebarHeight!: number

  constructor() { }

  ngOnInit(): void {
    this._afiliado.subscribe(afiliado => {
      if (afiliado) {
        if (afiliado.perfil) this.perfil = afiliado.perfil  as iPerfil
      }
    })
  }

  ngAfterViewInit() {
  }

  get banner() {
    return this.afiliado.perfil?.imgBanner?.url ?
      this.afiliado.perfil?.imgBanner?.url :
      '/assets/img/cmic-perfil-banner.jpg'
  }
}
