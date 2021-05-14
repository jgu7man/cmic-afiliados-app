import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminAccesosComponent } from './components/admin-dashboard/admin-accesos/admin-accesos.component';
import { AdminAfiliadosTableComponent } from './components/admin-dashboard/admin-afiliados-table/admin-afiliados-table.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminInicioComponent } from './components/admin-dashboard/admin-inicio/admin-inicio.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', component: AdminDashboardComponent, children:[
      { path: '', component: AdminInicioComponent },
      { path: 'accesos', component: AdminAccesosComponent },
      { path: 'afiliados', component: AdminAfiliadosTableComponent },
    ] },
  ] },
  { path: 'login', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
