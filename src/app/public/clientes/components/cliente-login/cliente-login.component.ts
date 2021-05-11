import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevAuthService, GdevLoginFields } from 'gdev-auth';
import { RestorePwdComponent } from 'src/app/public/restore-pwd/restore-pwd.component';

@Component({
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})
export class ClienteLoginComponent implements OnInit {

  constructor(
    private _authService: GdevAuthService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit(fields: GdevLoginFields) {
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
