import { Component } from '@angular/core';
import { MxCache } from '@marxa/devkit';

@Component({
  selector: 'g-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'afiliados-app';
  constructor(
    private _cache: MxCache,
  ) {
    this._cache.cacheTagName = 'cmic-data';
    this._cache.storage = 'local'
  }
}
