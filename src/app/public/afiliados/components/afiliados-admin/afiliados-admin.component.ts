import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GdevLoading } from 'gdev-loading';
import { of } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'g-afiliados-admin',
  templateUrl: './afiliados-admin.component.html',
  styleUrls: ['./afiliados-admin.component.scss']
})
export class AfiliadosAdminComponent implements OnInit, AfterViewInit {

  // invisible: boolean = true;
  constructor(
    private _loading: GdevLoading,
  ) { }

  async ngOnInit() {
    await this._loading.waitFor(1000)
    // this.invisible = false
  }

  ngAfterViewInit() {

  }

  get footerTop() {
    let footer: any = document.querySelector('#footer')
    return of( footer.offsetTop).pipe(delay(1000),)
  }

}
