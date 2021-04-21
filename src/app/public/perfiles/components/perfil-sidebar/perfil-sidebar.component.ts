import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AfiliadoModel,  emptyAfiliado } from 'src/app/public/afiliados/models/afiliados.model';
import { iRecHumanos } from 'src/app/public/afiliados/models/perfiles.model';

@Component({
  selector: 'g-perfil-sidebar',
  templateUrl: './perfil-sidebar.component.html',
  styleUrls: ['./perfil-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilSidebarComponent implements OnInit {

  private _afiliado: BehaviorSubject<AfiliadoModel> = new BehaviorSubject(
    emptyAfiliado
  );
  @Input() set afiliado(variable: AfiliadoModel) { this._afiliado.next(variable); }
  get afiliado() { return this._afiliado.getValue() }

  @Input() personal: iRecHumanos = {} as iRecHumanos;

  constructor() { }

  ngOnInit(): void {
    console.log( this.afiliado.servicios )
  }

  get year(): number {
    return new Date().getFullYear()
  }

  get Hombres() {
    if (this.personal) {
      return (this.personal.hombres * 100) / this.personal.planta_fija
    } else {
      return 0
    }
  }
  get Mujeres() {
    if (this.personal) {
      return ( this.personal.mujeres * 100 ) / this.personal.planta_fija
    } else {
      return 0
    }
  }

}
