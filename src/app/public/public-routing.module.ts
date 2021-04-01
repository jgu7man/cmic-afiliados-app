import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent, data: { page: 'inicio' }
  },
  {
    path: 'afiliados',
    loadChildren: () => import('../public/afiliados/afiliados.module').then(m => m.AfiliadosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
