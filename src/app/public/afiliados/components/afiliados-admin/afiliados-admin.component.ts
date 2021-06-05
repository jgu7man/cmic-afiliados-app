import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MxCache, MxLoading } from '@marxa/devkit';
import { of } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import { AfiliadoModel } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  selector: 'g-afiliados-admin',
  templateUrl: './afiliados-admin.component.html',
  styleUrls: ['./afiliados-admin.component.scss']
})
export class AfiliadosAdminComponent implements OnInit, AfterViewInit {

  // invisible: boolean = true;
  afiliado?: AfiliadoModel
  constructor(
    private _loading: MxLoading,
    private _cache: MxCache,
    private _afiliados: AfiliadosService
  ) {
    this._loading.getRouteParams().subscribe(({RFC}) => {
      this._cache.updateData('rfc', RFC)
      this._afiliados.getPerfil(RFC).subscribe(afiliado => {
        this.afiliado = afiliado
      })
    })
   }

  async ngOnInit() {
    await this._loading.waitFor(1000)
  }

  ngAfterViewInit() {

  }


}
