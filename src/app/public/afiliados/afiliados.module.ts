import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfiliadosRoutingModule } from './afiliados-routing.module';
import { AfiliadosComponent } from './afiliados.component';
import { AfiliacionFormComponent, DialogPrivacidad, DialogRetencion } from './components/afiliacion-form/afiliacion-form.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { ComunesModule } from 'src/shared/comunes.module';
import { ActividadesFormComponent } from './components/actividades-form/actividades-form.component';
import { AfiliadosLoginComponent } from './components/afiliados-login/afiliados-login.component';
import { GdevAuthModule } from 'gdev-auth';
import { AfiliadosRegistroComponent, DialogPrivacidadRegistro } from './components/afiliados-registro/afiliados-registro.component';


@NgModule({
  declarations: [AfiliadosComponent, AfiliacionFormComponent, DialogPrivacidad,DialogPrivacidadRegistro, DialogRetencion, ActividadesFormComponent, AfiliadosLoginComponent, AfiliadosRegistroComponent],
  imports: [
    CommonModule,
    AfiliadosRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule,
    GdevAuthModule,
  ]
})
export class AfiliadosModule { }
