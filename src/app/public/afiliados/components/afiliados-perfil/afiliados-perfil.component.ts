import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { take } from 'rxjs/operators';
import { iAfiliadoModel } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  templateUrl: './afiliados-perfil.component.html',
  styleUrls: ['./afiliados-perfil.component.scss'],
})
export class AfiliadosPerfilComponent implements OnInit {
  afiliado: iAfiliadoModel = {

  };

  constructor(
    private _afiliadosService: AfiliadosService,
    private _router: Router,
    private _alert: GdevAlert
  ) {
    this._afiliadosService.getperfilAfiliado().subscribe((data) => {
      console.log(data);
      if (data) this.afiliado = data;
      else {
        this._alert.sendMessageAlert('Primero necesitas iniciar sesión')
        // this._router.navigate(['/afiliados/login'])

      }
    });
  }

  ngOnInit(): void {}
}
