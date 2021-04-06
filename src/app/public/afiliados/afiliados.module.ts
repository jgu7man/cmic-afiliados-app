import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfiliadosRoutingModule } from './afiliados-routing.module';
import { AfiliadosComponent } from './afiliados.component';
import { AfiliacionFormComponent, DialogPrivacidad, DialogRetencion } from './components/afiliacion-form/afiliacion-form.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { ComunesModule } from 'src/shared/comunes.module';
import { ActividadesFormComponent } from './components/actividades-form/actividades-form.component';


@NgModule({
  declarations: [AfiliadosComponent, AfiliacionFormComponent, DialogPrivacidad, DialogRetencion, ActividadesFormComponent],
  imports: [
    CommonModule,
    AfiliadosRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule
  ]
})
export class AfiliadosModule { }
