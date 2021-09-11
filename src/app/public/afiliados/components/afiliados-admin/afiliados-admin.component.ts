import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MxCache, MxLoading } from '@marxa/devkit';
import { of, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { AfiliadoModel } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  selector: 'g-afiliados-admin',
  templateUrl: './afiliados-admin.component.html',
  styleUrls: ['./afiliados-admin.component.scss']
})
export class AfiliadosAdminComponent implements OnInit, AfterViewInit, OnDestroy {

  // invisible: boolean = true;
  afiliado?: AfiliadoModel
  private afiliadoSubscription: Subscription;
  constructor(
    private _loading: MxLoading,
    private _cache: MxCache,
    private _afiliados: AfiliadosService
  ) {
    this.afiliadoSubscription = this._loading
      .getRouteParams()
      .pipe(
        mergeMap( ( { RFC } ) => {
          this._cache.updateData('rfc', RFC)
          return this._afiliados.getPerfil( RFC )
        } ),
        distinctUntilChanged((x, y) => JSON.stringify(x) == JSON.stringify(y))
    ).subscribe( ( afiliado ) => {
        // console.log( afiliado )
        this.afiliado = afiliado
      })
   }

  async ngOnInit() {
    await this._loading.waitFor(1000)
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.afiliadoSubscription.unsubscribe()
  }


}
