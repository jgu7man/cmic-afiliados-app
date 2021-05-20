import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MxAuth } from '@marxa/auth';

@Component({
  templateUrl: './restore-pwd.component.html',
  styleUrls: ['./restore-pwd.component.scss']
})
export class RestorePwdComponent implements OnInit {

  emailCtrl: FormControl = new FormControl('', [Validators.required, Validators.email])

  constructor(
    public dialog: MatDialogRef<RestorePwdComponent>,
    private _auth: MxAuth
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this._auth.restorePwd(this.emailCtrl.value)
    this.dialog.close()
  }

}
