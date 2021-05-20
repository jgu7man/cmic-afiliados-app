import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MxAuth, MxLoginFields } from '@marxa/auth';
import { takeWhile } from 'rxjs/operators';
import { RestorePwdComponent } from 'src/app/public/restore-pwd/restore-pwd.component';

@Component({
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})
export class ClienteLoginComponent implements OnInit {

  constructor(
    private _authService: MxAuth,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this._authService.user$.pipe(takeWhile(user => !user)).subscribe(user => {
      if (user) this._router.navigate(['/'])
    })
   }

  ngOnInit(): void {
  }

  onSubmit(fields: MxLoginFields) {
    this._authService.emailSignIn(fields.email, fields.password)
      .then(user => {
        console.log( user )
      })

   }

  onRestorePwd(): void {
    this._dialog.open(RestorePwdComponent, {
      minWidth: 320
    })
  }
}
