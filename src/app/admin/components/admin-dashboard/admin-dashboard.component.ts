import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { GdevAuthService } from 'gdev-auth';
import { GdevCache } from 'gdev-cache';
import { takeWhile } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    public auth_: GdevAuthService,
    private _router: Router,
    private _admins: AdminService,
    private _cache: GdevCache,
    private _alert: GdevAlert,
  ) {
    this.auth_.user$.pipe(takeWhile(user => user)).subscribe(user => {
      console.log( user )
      if (!user) this._router.navigate(['/admin/login']);
      this._admins.retriveAdmin(user.email)
        .then(admin => {
          console.log( admin )
          if (!admin) {
            this._alert.sendMessageAlert('Esta no es una cuenta de administrador')
            this.auth_.singOut()
            this._router.navigate(['/admin/login']);
          }
          else this._cache.updateData('admin', admin);
        })
    })
   }

  ngOnInit(): void {
  }

}
