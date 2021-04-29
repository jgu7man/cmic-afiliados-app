import { Component, OnInit } from '@angular/core';
import { GdevCache } from 'gdev-cache';
import { iManager } from '../../../models/afiliados.model';

@Component({
  selector: 'g-afiliado-sidebar',
  templateUrl: './afiliado-sidebar.component.html',
  styleUrls: ['./afiliado-sidebar.component.scss']
})
export class AfiliadoSidebarComponent implements OnInit {

  RFC?:string
  constructor(
    private _cache: GdevCache
  ) {
    const user = this._cache.getDataKey<iManager>('user')
    if (user) this.RFC = user.RFC
    else {

    }
   }

  ngOnInit(): void {
  }

}
