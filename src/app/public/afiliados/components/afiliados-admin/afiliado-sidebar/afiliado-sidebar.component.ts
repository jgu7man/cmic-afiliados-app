import { Component, Input, OnInit } from '@angular/core';
import { MxCache, MxLoading } from '@marxa/devkit';
import { iManager } from '../../../models/afiliados.model';

@Component({
  selector: 'g-afiliado-sidebar',
  templateUrl: './afiliado-sidebar.component.html',
  styleUrls: ['./afiliado-sidebar.component.scss']
})
export class AfiliadoSidebarComponent implements OnInit {

  RFC?: string
  @Input() slug?: string
  constructor(
    private _cache: MxCache,
    private _loading: MxLoading,
  ) {
    this._loading.getRouteParams().subscribe(({ RFC }) => {
      this.RFC = RFC
    })

   }

  ngOnInit(): void {
  }

}
