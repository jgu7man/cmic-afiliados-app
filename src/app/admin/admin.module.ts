import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { ComunesModule } from 'src/shared/comunes.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule
  ]
})
export class AdminModule { }
