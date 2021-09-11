import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { MxAuth } from '@marxa/auth';
import { MxCache } from '@marxa/devkit';
import { takeWhile } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    public auth_: MxAuth,
    private _router: Router,
    private _admins: AdminService,
    private _cache: MxCache,
    private _alert: MxAlert,
  ) {
    this.auth_.user$.pipe( takeWhile( user => user ) ).subscribe( user => {
      // console.log( user )
      if (!user) this._router.navigate(['/admin/login']);
      this._admins.retriveAdmin(user.email)
        .then(admin => {
          if (!admin) {
            this._alert.message('Esta no es una cuenta de administrador')
            this.auth_.signOut()
            this._router.navigate(['/admin/login']);
          }
          else this._cache.updateData('admin', admin);
        })
    })
   }

  ngOnInit(): void {
  }

}
