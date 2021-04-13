import { AfterViewInit, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { iAfiliadoModel } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  templateUrl: './afiliados-perfil.component.html',
  styleUrls: ['./afiliados-perfil.component.scss'],
})
export class AfiliadosPerfilComponent implements OnInit {
  afiliado: iAfiliadoModel = {};

  constructor(private _afiliadosService: AfiliadosService) {
    this._afiliadosService.getperfilAfiliado().subscribe((data) => {
      //console.log(data);
      this.afiliado = data;
    });
  }

  ngOnInit(): void {}
}
