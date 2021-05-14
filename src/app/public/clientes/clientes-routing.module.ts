import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { ClienteLoginComponent } from './components/cliente-login/cliente-login.component';
import { ClienteRegistroComponent } from './components/cliente-registro/cliente-registro.component';
import { ClienteSolicitudComponent } from './components/cliente-solicitud/cliente-solicitud.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'login', component: ClienteLoginComponent },
  { path: 'registro', component: ClienteRegistroComponent },
  { path: 'solicitud', component: ClienteSolicitudComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
