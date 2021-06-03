import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MxDate } from '@marxa/devkit';
import { AfiliadoModel,  emptyAfiliado } from 'src/app/public/afiliados/models/afiliados.model';
import { iPersonal } from 'src/app/public/afiliados/models/perfiles.model';

@Component({
  selector: 'g-perfil-mobile-sidebar',
  templateUrl: './perfil-mobile-sidebar.component.html',
  styleUrls: ['./perfil-mobile-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilMobileSidebarComponent implements OnInit {

  private _afiliado: BehaviorSubject<AfiliadoModel> = new BehaviorSubject(
    emptyAfiliado
  );
  @Input() set afiliado(variable: AfiliadoModel) { this._afiliado.next(variable); }
  get afiliado() { return this._afiliado.getValue() }

  @Input() personal: iPersonal = {} as iPersonal;

  constructor(
    public date_: MxDate
  ) { }

  ngOnInit(): void {

  }

  get ImageSrc() {
    return this.afiliado.perfil
      ? this.afiliado.perfil.imgPerfil
        ? this.afiliado.perfil.imgPerfil.url
        : ''
      : ''
  }

  get year(): number {
    return new Date().getFullYear()
  }



}
