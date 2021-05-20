import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAuth, MxLoginFields } from '@marxa/auth';
import { take, takeWhile } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Component({
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private _auth: MxAuth,
    private _admin: AdminService,
    private _router: Router
  ) {
    this._auth.onLoggedRedirectRoute = '/admin'
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
      .then(user => {
        // console.log( user )
      })
	}

}
