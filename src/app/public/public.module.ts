import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { ComunesModule } from 'src/shared/comunes.module';


@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule
  ]
})
export class PublicModule { }
