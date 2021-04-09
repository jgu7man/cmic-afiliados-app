import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfiliadosComponent } from './afiliados.component';
import { ActividadesFormComponent } from './components/actividades-form/actividades-form.component';
import { AfiliacionFormComponent } from './components/afiliacion-form/afiliacion-form.component';
import { AfiliadosLoginComponent } from './components/afiliados-login/afiliados-login.component';

const routes: Routes = [
  { path: '', component: AfiliadosComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'registro' },
    { path: 'afiliacion', component: AfiliacionFormComponent },
    { path: 'elegir-actividades', component: ActividadesFormComponent },
    { path: 'login', component: AfiliadosLoginComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliadosRoutingModule { }
