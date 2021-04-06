import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfiliadosComponent } from './afiliados.component';
import { ActividadesFormComponent } from './components/actividades-form/actividades-form.component';
import { AfiliacionFormComponent } from './components/afiliacion-form/afiliacion-form.component';

const routes: Routes = [
  { path: '', component: AfiliadosComponent, children: [
    { path: 'registro', component: AfiliacionFormComponent },
    { path: 'elegir-actividades', component: ActividadesFormComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliadosRoutingModule { }
