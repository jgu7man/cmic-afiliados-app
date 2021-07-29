import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAuth, MxLoginFields } from '@marxa/auth';
import { MxAlert } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Component({
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  errorSubscription: Subscription

  constructor(
    private _auth: MxAuth,
    private _admin: AdminService,
    private _router: Router,
    private _alert: MxAlert
  ) {
    this._auth.onLoggedRedirectRoute = '/admin'
    this.errorSubscription =
    this._auth.listenForErros.subscribe( error => {
      this._alert.message(error)
    })
    this._auth.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this._admin.retriveAdmin(user.email).then(admin => {
          if (admin) this._router.navigate(['/admin/'])
        })
      }
    })
   }

  ngOnInit(): void {
  }

  onSubmit(fields: MxLoginFields) {
		this._auth.emailSignIn(fields.email,  fields.password)
      .catch( ( error ) => {
        this._alert.error( 'No se pudo iniciar sesión como administrador', error, false, true )
      } )
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe()
  }

}
