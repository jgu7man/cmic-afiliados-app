import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAuthService } from 'gdev-auth';
import { GdevCache } from 'gdev-cache';
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
    private _cache: GdevCache
  ) {
    this.auth_.user$.subscribe(user => {
      if (!user) this._router.navigate(['/admin/login']);
      this._admins.retriveAdmin(user.email)
        .then(admin => {
          if (!admin) this._router.navigate(['/admin/login']);
          else this._cache.updateData('admin', admin);
        })
    })
   }

  ngOnInit(): void {
  }

}
