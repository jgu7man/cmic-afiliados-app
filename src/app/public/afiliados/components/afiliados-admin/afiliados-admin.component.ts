import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MxLoading } from '@marxa/devkit';
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
    private _loading: MxLoading,
  ) { }

  async ngOnInit() {
    await this._loading.waitFor(1000)
    // this.invisible = false
  }

  ngAfterViewInit() {

  }


}
