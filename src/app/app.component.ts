import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MxCache, MxLoading } from '@marxa/devkit';
import { filter, map } from 'rxjs/operators';

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
    private _title: Title
  ) {
    this._cache.cacheTagName = 'cmic-data';
    this._cache.storage = 'local'
    console.log( this.activatedRoute.snapshot.data )
    this._loading.collectRouteData().subscribe(data => {
      console.log( data )
    })
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        let title = 'CMIC'
        while (route.firstChild) {
          let data = route.firstChild.snapshot.data
          title = data.title ? `${title} - ${data.title}` : title
          route = route.firstChild;
        }
        this._title.setTitle(title)
      })
    ).subscribe()
  }
}
