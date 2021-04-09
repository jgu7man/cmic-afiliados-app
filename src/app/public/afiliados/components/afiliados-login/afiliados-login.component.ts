import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAuthService, GdevLoginFields } from 'gdev-auth';
import { GdevCache } from 'gdev-cache';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  templateUrl: './afiliados-login.component.html',
  styleUrls: ['./afiliados-login.component.scss']
})
export class AfiliadosLoginComponent implements OnInit {

  constructor(
    private _authService: GdevAuthService,
    private _cache: GdevCache,
    private _afiliados: AfiliadosService,
    private _router: Router
  ) {
    this._afiliados.afiliado$.subscribe(user => {
      if (user) { this._router.navigate(['/afiliados']) }
    })
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
