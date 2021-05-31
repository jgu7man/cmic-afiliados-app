import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminAccesosComponent } from './components/admin-dashboard/admin-accesos/admin-accesos.component';
import { AdminAfiliadosTableComponent } from './components/admin-dashboard/admin-afiliados-table/admin-afiliados-table.component';
import { AdminClientesComponent } from './components/admin-dashboard/admin-clientes/admin-clientes.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminInicioComponent } from './components/admin-dashboard/admin-inicio/admin-inicio.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminSitioComponent } from './components/admin-dashboard/admin-sitio/admin-sitio.component';
import { CreateAdminAccountComponent } from './components/create-admin-account/create-admin-account.component';

const routes: Routes = [
  { path: '', component: AdminComponent, data:{title: 'Administración'}, children: [
    { path: '', component: AdminDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'panel' },
      { path: 'panel', component: AdminInicioComponent, data:{title: 'Panel'} },
      { path: 'accesos', component: AdminAccesosComponent, data:{title: 'Accesos'} },
      { path: 'afiliados', component: AdminAfiliadosTableComponent, data:{title: 'Afiliados'} },
      { path: 'clientes', component: AdminClientesComponent, data:{title: 'Clientes'} },
      { path: 'sitio', component: AdminSitioComponent, data:{title: 'Sitio'} },
    ] },
    { path: 'login', component: AdminLoginComponent, data:{title: 'Login'} },
    { path: 'create', component: CreateAdminAccountComponent, data:{title: 'Crear cuenta'} },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
