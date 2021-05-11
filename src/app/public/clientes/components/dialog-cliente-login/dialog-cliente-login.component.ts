import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GdevAuthService, GdevLoginFields } from 'gdev-auth';
import { AccesosService } from 'src/app/admin/services/accesos.service';
import { RestorePwdComponent } from 'src/app/public/restore-pwd/restore-pwd.component';

@Component({
  templateUrl: './dialog-cliente-login.component.html',
  styleUrls: ['./dialog-cliente-login.component.scss']
})
export class DialogClienteLoginComponent implements OnInit {

  emailCtrl: FormControl = new FormControl('', [Validators.required, Validators.email])

  constructor(
    private _auth: GdevAuthService,
    private _dialog: MatDialog,
    public accesos: AccesosService,
    public dialog: MatDialogRef<DialogClienteLoginComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(fields: GdevLoginFields) {
    this._auth.emailSignIn(fields.email, fields.password)
      .then(user => {
        console.log(user)
        this.dialog.close(user)
      })

   }

  onRestorePwd(): void {
    this._dialog.open(RestorePwdComponent, {
      minWidth: 320
    })
  }



}
