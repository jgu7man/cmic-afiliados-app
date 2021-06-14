import { Component, OnInit } from '@angular/core';
import { MxAuth } from '@marxa/auth';
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
    public auth_: MxAuth,
    private _admins: AdminService,
  ) {
    this.auth_.unloggedPath = '/admin/login'
    this.auth_.user$.subscribe(user => {
      if (user) {
        this._admins.retriveAdmin(user.email)
          .then(admin => { if (admin) { this.admin = admin;} })
      }
    })
   }

  ngOnInit(): void {
  }

  onSingOut() {
    this.auth_.signOut()
    delete this.admin
  }

}
