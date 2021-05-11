import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevAuthService } from 'gdev-auth';
import { race } from 'rxjs';

import { ManagersService } from '../afiliados/services/managers.service';
import { DialogClienteLoginComponent } from '../clientes/components/dialog-cliente-login/dialog-cliente-login.component';
import { ClientsService } from '../clientes/services/clients.service';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  logged: 'client' | 'manager' | boolean = false

  constructor(
    public auth_: GdevAuthService,
    private _managers: ManagersService,
    private _clients: ClientsService,
    private _dialog: MatDialog
  ) {
    this.loggedBehavior()

  }

  ngOnInit(): void {
  }

  loggedBehavior(): void {
    race(
      this._managers.current$,
      this._clients.current$
    ).subscribe(user => {
      if (user && 'RFC' in user) {
        this.logged = 'manager'
      } else  {
        this.logged = user ? 'client' : false
      }
    })
  }

  openClientLogin() {
    this._dialog.open(DialogClienteLoginComponent, {
      width: '370px'
    })
  }


}
