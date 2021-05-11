import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAuthService } from 'gdev-auth';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'g-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.scss']
})
export class AdminTopbarComponent implements OnInit {

  constructor(
    public auth_: GdevAuthService,
    private _admins: AdminService,
    private _router: Router
  ) {
    this.auth_.user$.subscribe(user => {
      this._admins.retriveAdmin(user.email)
        .then(admin => {
          if (!admin) this._router.navigate(['/admin/login']);
        })
    })
   }

  ngOnInit(): void {
  }

}
