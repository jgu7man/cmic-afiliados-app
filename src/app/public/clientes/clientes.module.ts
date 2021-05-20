import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { GdevModule } from 'src/app/gdev/gdev.module';
import { ClienteLoginComponent } from './components/cliente-login/cliente-login.component';
import { DialogClienteLoginComponent } from './components/dialog-cliente-login/dialog-cliente-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MxResponsiveModule } from 'src/app/responsive/responsive.module';
import { ClienteRegistroComponent } from './components/cliente-registro/cliente-registro.component';
import { ClienteSolicitudComponent } from './components/cliente-solicitud/cliente-solicitud.component';
import { MxStorageModule } from '@marxa/storage';


@NgModule({
  declarations: [ClientesComponent, ClienteLoginComponent, DialogClienteLoginComponent, ClienteRegistroComponent, ClienteSolicitudComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    FirebaseModule,
    GdevModule,
    ReactiveFormsModule,
    MxResponsiveModule,
    MxStorageModule,
  ]
})
export class ClientesModule { }
