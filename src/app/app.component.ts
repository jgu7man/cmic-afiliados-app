import { Component } from '@angular/core';
import { GdevCache } from '@jgu7man/gdev-tools';

@Component({
  selector: 'g-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'afiliados-app';
  constructor(
    private _cache: GdevCache,
  ) {
    this._cache.cacheTagName = 'cmic-data';
    this._cache.storage = 'local'
  }
}
