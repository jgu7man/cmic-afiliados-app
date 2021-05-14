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
import { AdminSidebarComponent } from './components/admin-dashboard/admin-sidebar/admin-sidebar.component';
import { AdminAccesosComponent } from './components/admin-dashboard/admin-accesos/admin-accesos.component';
import { AdminManagersTableComponent } from './components/admin-dashboard/admin-accesos/admin-managers-table/admin-managers-table.component';
import { DialogAccesoComponent } from './components/admin-dashboard/admin-accesos/dialog-acceso/dialog-acceso.component';
import { DialogRevokeAccesoComponent } from './components/admin-dashboard/admin-accesos/dialog-revoke-acceso/dialog-revoke-acceso.component';
import { AdminClientesTableComponent } from './components/admin-dashboard/admin-accesos/admin-clientes-table/admin-clientes-table.component';
import { AdminsTableComponent } from './components/admin-dashboard/admin-accesos/admins-table/admins-table.component';
import { AdminTopbarComponent } from './components/admin-topbar/admin-topbar.component';
import { AdminAfiliadosTableComponent } from './components/admin-dashboard/admin-afiliados-table/admin-afiliados-table.component';
import { PublicModule } from '../public/public.module';
import { AdminInicioComponent } from './components/admin-dashboard/admin-inicio/admin-inicio.component';
import { DialogAceptClientComponent } from './components/admin-dashboard/dialog-acept-client/dialog-acept-client.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminAccesosComponent,
    AdminManagersTableComponent,
    DialogAccesoComponent,
    DialogRevokeAccesoComponent,
    AdminClientesTableComponent,
    AdminsTableComponent,
    AdminTopbarComponent,
    AdminAfiliadosTableComponent,
    AdminInicioComponent,
    DialogAceptClientComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule,
    GdevModule,
    PublicModule,
  ],
})
export class AdminModule {}
