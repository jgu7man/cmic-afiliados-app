import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MxCache, MxLoading } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { iManager } from '../../../models/afiliados.model';

@Component({
  selector: 'g-afiliado-sidebar',
  templateUrl: './afiliado-sidebar.component.html',
  styleUrls: ['./afiliado-sidebar.component.scss']
})
export class AfiliadoSidebarComponent implements OnInit, OnDestroy {

  RFC?: string
  @Input() slug?: string
  private paramsSubscription: Subscription

  constructor(
    private _cache: MxCache,
    private _loading: MxLoading,
  ) {
    this.paramsSubscription =
    this._loading.getRouteParams()
      .subscribe( ( { RFC } ) => {
        // console.log( RFC )
      this.RFC = RFC
    })

   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
  }

}
