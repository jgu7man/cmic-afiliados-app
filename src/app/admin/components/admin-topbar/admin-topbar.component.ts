import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAuthService } from 'gdev-auth';
import { GdevCache } from 'gdev-cache';
import { iAdmin } from '../../models/admin.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'g-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.scss']
})
export class AdminTopbarComponent implements OnInit {

  admin?: iAdmin
  constructor(
    public auth_: GdevAuthService,
    private _admins: AdminService,
    private _router: Router,
    private _cache: GdevCache
  ) {
    this.auth_.user$.subscribe(user => {
      if (!user) this._router.navigate(['/admin/login']);
      this._admins.retriveAdmin(user.email)
        .then(admin => {
          console.log( admin )
          if (!admin) this._router.navigate(['/admin/login']);
          else {
            this.admin = admin;
            this._cache.updateData('admin', this.admin);
          }
        })
    })
   }

  ngOnInit(): void {
  }

}
