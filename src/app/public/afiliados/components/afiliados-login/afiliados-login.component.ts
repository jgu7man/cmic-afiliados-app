import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAuth, MxLoginFields } from '@marxa/auth';
import { MxCache } from '@marxa/devkit';
import { take } from 'rxjs/operators';
import { AfiliadosService } from '../../services/afiliados.service';
import { ManagersService } from '../../services/managers.service';

@Component({
  templateUrl: './afiliados-login.component.html',
  styleUrls: ['./afiliados-login.component.scss']
})
export class AfiliadosLoginComponent implements OnInit {

  constructor(
    private _authService: MxAuth,
    private _cache: MxCache,
    private _router: Router,
    private _managers: ManagersService
  ) {
    this._managers.current$.pipe(take(1)).subscribe(user => {
      console.log( 'ejecucion' )
      if (user) { this._router.navigate(['/afiliados']) }
    })
   }

  ngOnInit(): void {
  }

  onSubmit(fields:  MxLoginFields)  {
		this._authService.emailSignIn(fields.email,  fields.password)
      .then(user => {
        if (user) {
          this._managers.retriveManager(user.email as string)
          .pipe(take(1)).subscribe(
            dataUser => {
              if (dataUser) {
                this._cache.updateData('user', dataUser)
                this._cache.updateData('rfc', dataUser.RFC)
              }
            }
          )
        } else {

        }
      })
	}

}
