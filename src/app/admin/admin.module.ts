import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { ComunesModule } from 'src/shared/comunes.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { GdevModule } from '../gdev/gdev.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [AdminComponent, AdminLoginComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule,
    GdevModule
  ]
})
export class AdminModule { }
