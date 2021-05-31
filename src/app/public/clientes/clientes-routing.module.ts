import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { ClienteLoginComponent } from './components/cliente-login/cliente-login.component';
import { ClienteRegistroComponent } from './components/cliente-registro/cliente-registro.component';
import { ClienteSolicitudComponent } from './components/cliente-solicitud/cliente-solicitud.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'login', component: ClienteLoginComponent, data:{title: 'Login'}, },
  { path: 'registro', component: ClienteRegistroComponent,data:{title: 'Registro'}, },
  { path: 'solicitud', component: ClienteSolicitudComponent, data:{title: 'Solicitud'}, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
