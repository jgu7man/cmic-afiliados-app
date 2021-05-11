import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { ClienteLoginComponent } from './components/cliente-login/cliente-login.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'login', component: ClienteLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
