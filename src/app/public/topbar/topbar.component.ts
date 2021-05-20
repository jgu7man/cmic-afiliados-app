import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { MxCache } from '@marxa/devkit';
import { of, race } from 'rxjs';
import { filter, mapTo, switchMap, tap } from 'rxjs/operators';

import { ManagersService } from '../afiliados/services/managers.service';
import { DialogClienteLoginComponent } from '../clientes/components/dialog-cliente-login/dialog-cliente-login.component';
import { ClientsService } from '../clientes/services/clients.service';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  logged?: string

  constructor(
    public auth_: MxAuth,
    private _managers: ManagersService,
    private _clients: ClientsService,
    private _dialog: MatDialog,
    private _router: Router,
    private _cache: MxCache
  ) {
    this.loggedBehavior()

  }

  ngOnInit(): void {
  }

  loggedBehavior(): void {
    this._managers.current$
      .pipe(
        tap(user => {
          if (user) {
            this._cache.updateData('user', user)
            this._managers.updateLastAccess(user.RFC, user.uid)
          }
        }),
        switchMap(user => user ? of('manager') : this._clients.current$
          .pipe(
            filter(client => !!client),
            tap(user => {
              if (user) {
                this._cache.updateData('user', user)
                this._clients.updateLastAccess(user.uid)
              }
            }),
            mapTo('client')
          )),
      ).subscribe(user => {
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
      .then(() => { this._router.navigate(['/']) })
    delete this.logged
  }

}
