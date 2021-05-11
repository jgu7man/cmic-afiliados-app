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


@NgModule({
  declarations: [ClientesComponent, ClienteLoginComponent, DialogClienteLoginComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    FirebaseModule,
    GdevModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
