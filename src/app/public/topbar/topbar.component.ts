import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { MxCache, MxResponsive } from '@marxa/devkit';
import { forkJoin, merge, of, race, Subscription, zip } from 'rxjs';
import { filter, mapTo, switchMap, take, tap } from 'rxjs/operators';
import { AdminService } from 'src/app/admin/services/admin.service';

import { ManagersService } from '../afiliados/services/managers.service';
import { DialogClienteLoginComponent } from '../clientes/components/dialog-cliente-login/dialog-cliente-login.component';
import { ClientsService } from '../clientes/services/clients.service';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  logged?: string
  logSubscription: Subscription
  currentRFC?: string

  constructor(
    public auth_: MxAuth,
    private _managers: ManagersService,
    private _clients: ClientsService,
    private _admin: AdminService,
    private _dialog: MatDialog,
    private _router: Router,
    public responsive: MxResponsive
  ) {
    this.logSubscription = this.loggedBehavior()

  }

  ngOnInit(): void {
  }

  loggedBehavior() {
    return merge(
      this._managers.current$.pipe(
        filter(manager => !!manager),
        tap(manager => { this.currentRFC = manager?.RFC }),
        mapTo('manager')
      ),
      this._clients.current$.pipe(
        filter(client => !!client),
        // tap(user => {console.log( user )}),
        mapTo('client')
      ),
      this._admin.current$.pipe(
        filter(admin => !!admin),
        // tap(user => { console.log(user) }),
        mapTo('admin')
      )

    ).subscribe(user => this.logged = user)
  }

  openClientLogin() {
    this._dialog.open(DialogClienteLoginComponent, {
      width: '370px'
    })
  }

  onSignOut() {
    this.auth_.signOut()
    this._router.navigateByUrl('/', { skipLocationChange: false })
      .then(() => { this._router.navigate(['/']) })
    delete this.logged
  }


  ngOnDestroy() {
    this.logSubscription.unsubscribe()
  }

}
