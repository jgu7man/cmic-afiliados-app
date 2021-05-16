import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GdevAuthService } from 'gdev-auth';
import { of, race } from 'rxjs';
import { filter, mapTo, switchMap } from 'rxjs/operators';

import { ManagersService } from '../afiliados/services/managers.service';
import { DialogClienteLoginComponent } from '../clientes/components/dialog-cliente-login/dialog-cliente-login.component';
import { ClientsService } from '../clientes/services/clients.service';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  logged: string | boolean = false

  constructor(
    public auth_: GdevAuthService,
    private _managers: ManagersService,
    private _clients: ClientsService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.loggedBehavior()

  }

  ngOnInit(): void {
  }

  loggedBehavior(): void {
    this._managers.current$
      .pipe(
        switchMap(user => user ? of('manager') : this._clients.current$
          .pipe(
            filter(client => !!client),
            mapTo('client')
          )),
      ).subscribe(user => {
      console.log( user )
      this.logged = user

    })
  }

  openClientLogin() {
    this._dialog.open(DialogClienteLoginComponent, {
      width: '370px'
    })
  }

  onSignOut() {
    this.auth_.singOut()
    this._router.navigateByUrl('/', { skipLocationChange: false })
    .then(() => {this._router.navigate(['/'])})
  }

}
