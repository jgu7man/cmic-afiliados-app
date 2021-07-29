import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MxAuth, MxLoginFields } from '@marxa/auth';
import { MxAlert } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { RestorePwdComponent } from 'src/app/public/restore-pwd/restore-pwd.component';

@Component({
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})
export class ClienteLoginComponent implements OnInit, OnDestroy {


  errorSubscription: Subscription;
  constructor(
    private _authService: MxAuth,
    private _dialog: MatDialog,
    private _router: Router,
    private _alert: MxAlert
  ) {
    this.errorSubscription = this._authService.listenForErros
    .subscribe(err => { this._alert.message(err)})
    this._authService.user$.pipe(takeWhile(user => !user)).subscribe(user => {
      if (user) this._router.navigate(['/'])
    })
   }

  ngOnInit(): void {
  }

  onSubmit(fields: MxLoginFields) {
    this._authService.emailSignIn(fields.email, fields.password)
    .catch(error => { this._alert.error('No se pudo iniciar sesión como cliente', error, false, true)})
   }

  onRestorePwd(): void {
    this._dialog.open(RestorePwdComponent, {
      minWidth: 320
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe()
  }
}
