import { Component, OnInit } from '@angular/core';
import { GdevAuthService, GdevLoginFields } from 'gdev-auth';
import { GdevCache } from 'gdev-cache';

@Component({
  templateUrl: './afiliados-login.component.html',
  styleUrls: ['./afiliados-login.component.scss']
})
export class AfiliadosLoginComponent implements OnInit {

  constructor(
    private _authService: GdevAuthService,
    private _cache: GdevCache
  ) {
    
   }

  ngOnInit(): void {
  }

  onSubmit(fields:  GdevLoginFields)  {
		this._authService.emailSignIn(fields.email,  fields.password)
    // This emit a Promise with firebase.User
      .then(user => {
        console.log(user)
        this._cache.updateData('user', user)
      })
	}

}
