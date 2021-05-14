import { Component, OnInit } from '@angular/core';
import { GdevAuthService, GdevLoginFields } from 'gdev-auth';

@Component({
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private _auth: GdevAuthService
  ) {
    this._auth.onLoggedRedirectRoute = '/admin'
   }

  ngOnInit(): void {
  }

  onSubmit(fields: GdevLoginFields) {
		this._auth.emailSignIn(fields.email,  fields.password)
      .then(user => {
        console.log( user )
      })
	}

}
