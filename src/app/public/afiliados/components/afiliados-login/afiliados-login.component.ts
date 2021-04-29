import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAuthService, GdevLoginFields } from 'gdev-auth';
import { GdevCache } from 'gdev-cache';
import { take } from 'rxjs/operators';
import { AfiliadosService } from '../../services/afiliados.service';
import { ManagersService } from '../../services/managers.service';

@Component({
  templateUrl: './afiliados-login.component.html',
  styleUrls: ['./afiliados-login.component.scss']
})
export class AfiliadosLoginComponent implements OnInit {

  constructor(
    private _authService: GdevAuthService,
    private _cache: GdevCache,
    private _router: Router,
    private _managers: ManagersService
  ) {
    this._managers.current$.subscribe(user => {
      if (user) { this._router.navigate(['/afiliados']) }
    })
   }

  ngOnInit(): void {
  }

  onSubmit(fields:  GdevLoginFields)  {
		this._authService.emailSignIn(fields.email,  fields.password)
      .then(user => {
        if (user) {
          this._managers.retriveManager(user.email as string)
          .pipe(take(1)).subscribe(
            dataUser => {
              this._cache.updateData('user', dataUser)
              this._cache.updateData('rfc', dataUser.RFC)
            }
          )
        } else {

        }
      })
	}

}
