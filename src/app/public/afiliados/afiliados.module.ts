import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfiliadosRoutingModule } from './afiliados-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { ComunesModule } from 'src/shared/comunes.module';


import { AfiliadosComponent } from './afiliados.component';
import { AfiliacionFormComponent, DialogPrivacidad, DialogRetencion } from './components/afiliacion-form/afiliacion-form.component';
import { ActividadesFormComponent } from './components/actividades-form/actividades-form.component';
import { AfiliadosLoginComponent } from './components/afiliados-login/afiliados-login.component';
import { GdevAuthModule } from 'gdev-auth';
import { AfiliadosRegistroComponent, DialogPrivacidadRegistro } from './components/afiliados-registro/afiliados-registro.component';
import { AfiliadosPerfilComponent } from './components/afiliados-perfil/afiliados-perfil.component';
import { AfiliadosAdminComponent } from './components/afiliados-admin/afiliados-admin.component';
import { AfiliadosExperienciaComponent } from './components/afiliados-experiencia/afiliados-experiencia.component';
import { AfiliadosCapacidadContableComponent } from './components/afiliados-capacidad-contable/afiliados-capacidad-contable.component';
import { AfiliadosEquipoMaquinariaComponent } from './components/afiliados-equipo-maquinaria/afiliados-equipo-maquinaria.component';
import { AfiliadosRecursosHumanosComponent } from './components/afiliados-recursos-humanos/afiliados-recursos-humanos.component';
import { AfiliadosCertificacionesEspecializacionesComponent } from './components/afiliados-certificaciones-especializaciones/afiliados-certificaciones-especializaciones.component';
import { GdevStorageModule } from 'src/app/gdev/gdev-storage/gdev-storage.module';


@NgModule({
  declarations: [
    AfiliadosComponent,
    AfiliacionFormComponent,
    DialogPrivacidad,
    DialogPrivacidadRegistro,
    DialogRetencion,
    ActividadesFormComponent,
    AfiliadosLoginComponent,
    AfiliadosRegistroComponent,
    AfiliadosPerfilComponent,
    AfiliadosAdminComponent,
    AfiliadosExperienciaComponent,
    AfiliadosCapacidadContableComponent,
    AfiliadosEquipoMaquinariaComponent,
    AfiliadosRecursosHumanosComponent,
    AfiliadosCertificacionesEspecializacionesComponent,
  ],
  imports: [
    CommonModule,
    AfiliadosRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule,
    GdevAuthModule,
    GdevStorageModule,
    NgxDropzoneModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AfiliadosModule {}
