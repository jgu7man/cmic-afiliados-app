import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilesRoutingModule } from './perfiles-routing.module';
import { PerfilesComponent } from './perfiles.component';
import { MainPerfilComponent } from './components/main-perfil/main-perfil.component';
import { PerfilExperienciaComponent } from './components/perfil-experiencia/perfil-experiencia.component';
import { PerfilCapContableComponent } from './components/perfil-cap-contable/perfil-cap-contable.component';
import { PerfilEquipoMaquinariaComponent } from './components/perfil-equipo-maquinaria/perfil-equipo-maquinaria.component';
import { PerfilRecursosHumanosComponent } from './components/perfil-recursos-humanos/perfil-recursos-humanos.component';
import { PerfilCertificacionesComponent } from './components/perfil-certificaciones/perfil-certificaciones.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { GdevModule } from 'src/app/gdev/gdev.module';
import { PerfilSidebarComponent } from './components/perfil-sidebar/perfil-sidebar.component';

@NgModule({
  declarations: [
    PerfilesComponent,
    MainPerfilComponent,
    PerfilExperienciaComponent,
    PerfilCapContableComponent,
    PerfilEquipoMaquinariaComponent,
    PerfilRecursosHumanosComponent,
    PerfilCertificacionesComponent,
    PerfilSidebarComponent,
  ],
  imports: [
    CommonModule,
    PerfilesRoutingModule,
    MaterialModule,
    FirebaseModule,
    GdevModule
  ],
  exports: [
    MainPerfilComponent,
    PerfilExperienciaComponent,
    PerfilCapContableComponent,
    PerfilEquipoMaquinariaComponent,
    PerfilRecursosHumanosComponent,
    PerfilCertificacionesComponent,
    PerfilSidebarComponent,
  ],
})
export class PerfilesModule {}
