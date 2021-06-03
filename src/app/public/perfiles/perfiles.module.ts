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
import { PerfilSidebarComponent } from './components/perfil-sidebar/perfil-sidebar.component';
import { PerfilActividadesComponent } from './components/perfil-actividades/perfil-actividades.component';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MxResponsiveModule } from '@marxa/devkit';
import { PerfilMobileComponent } from './components/perfil-mobile/perfil-mobile.component';
import { DirectivesModule } from '../../directives/directives.module';
import { PerfilDesktopComponent } from './components/perfil-desktop/perfil-desktop.component';
import { PerfilMobileSidebarComponent } from './components/perfil-mobile-sidebar/perfil-mobile-sidebar.component';

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
    PerfilActividadesComponent,
    FileViewerComponent,
    PerfilMobileComponent,
    PerfilDesktopComponent,
    PerfilMobileSidebarComponent
  ],
  imports: [
    CommonModule,
    PerfilesRoutingModule,
    MaterialModule,
    FirebaseModule,
    SharedModule,
    PipesModule,
    MxResponsiveModule,
    DirectivesModule
  ],
  exports: [
    MainPerfilComponent,
    PerfilExperienciaComponent,
    PerfilCapContableComponent,
    PerfilEquipoMaquinariaComponent,
    PerfilRecursosHumanosComponent,
    PerfilCertificacionesComponent,
    PerfilSidebarComponent,
    FileViewerComponent,
  ],
})
export class PerfilesModule {}
