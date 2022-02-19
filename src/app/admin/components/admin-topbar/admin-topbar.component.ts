import { Component, OnDestroy, OnInit } from '@angular/core';
import { MxAuth } from '@marxa/auth';
import { Subscription } from 'rxjs';
import { iAdmin } from '../../models/admin.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'g-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.scss']
})
export class AdminTopbarComponent implements OnInit, OnDestroy {

  admin?: iAdmin
  private userSubscription: Subscription;
  constructor(
    public auth_: MxAuth,
    private _admins: AdminService,
  ) {
    this.auth_.unloggedPath = '/admin/login'
    this.userSubscription = this.auth_.user$
      .subscribe( user => {
        // console.log( user )
        if (user) {
          this._admins.retriveAdmin(user.email!)
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

}
