import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPerfilComponent } from './components/main-perfil/main-perfil.component';

import { PerfilesComponent } from './perfiles.component';

const routes: Routes = [
  { path: '', component: PerfilesComponent },
  // { path: 'afiliado/:RFC', component: MainPerfilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilesRoutingModule { }
