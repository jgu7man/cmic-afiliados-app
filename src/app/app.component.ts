import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MxAlert, MxCache, MxLoading } from '@marxa/devkit';
import { filter, map } from 'rxjs/operators';
import { VersionService } from './services/version.service';

@Component({
  selector: 'g-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'afiliados-app';
  constructor(
    private _cache: MxCache,
    private _loading: MxLoading,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _title: Title,
    private _alert: MxAlert,
    private _version: VersionService
  ) {
    this._version.app_version = '0.5'
    this._cache.cacheTagName = 'cmic-data';
    this._cache.storage = 'local'
    this._alert.storeError = true;
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        let title
        while (route.firstChild) {
          let data = route.firstChild.snapshot.data
          title = title ?
            data.title ?
              `${title} - ${data.title}` : title
            : data.title
          route = route.firstChild;
        }
        this._title.setTitle(title)
      })
    ).subscribe(/*val => console.log( val ) */)
  }
}
