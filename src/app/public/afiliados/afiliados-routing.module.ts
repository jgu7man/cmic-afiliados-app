import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfiliadosComponent } from './afiliados.component';

const routes: Routes = [
  { path: '', component: AfiliadosComponent, children: [

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliadosRoutingModule { }
