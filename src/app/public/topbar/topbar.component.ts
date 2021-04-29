import { Component, OnInit } from '@angular/core';
import { GdevAuthService } from 'gdev-auth';

import { ManagersService } from '../afiliados/services/managers.service';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  logged: boolean = false

  constructor(
    public auth_: GdevAuthService,
    private _managers: ManagersService,
  ) {
    this.loggedBehavior()

  }

  ngOnInit(): void {
  }

  loggedBehavior(): void {
    this._managers.current$.subscribe(user => {
      this.logged = user ? true : false
    })
  }



}
