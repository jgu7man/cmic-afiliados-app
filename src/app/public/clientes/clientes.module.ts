import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { GdevModule } from 'src/app/gdev/gdev.module';


@NgModule({
  declarations: [ClientesComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    FirebaseModule,
    GdevModule
  ]
})
export class ClientesModule { }
