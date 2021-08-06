import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { ComunesModule } from 'src/shared/comunes.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './components/admin-dashboard/admin-sidebar/admin-sidebar.component';
import { AdminAccesosComponent } from './components/admin-dashboard/admin-accesos/admin-accesos.component';
import { AdminManagersTableComponent } from './components/admin-dashboard/admin-accesos/admin-managers-table/admin-managers-table.component';
import { DialogAccesoComponent } from './components/admin-dashboard/admin-accesos/dialog-acceso/dialog-acceso.component';
import { DialogRevokeAccesoComponent } from './components/admin-dashboard/admin-accesos/dialog-revoke-acceso/dialog-revoke-acceso.component';
import { AdminClientesTableComponent } from './components/admin-dashboard/admin-accesos/admin-clientes-table/admin-clientes-table.component';
import { AdminsTableComponent } from './components/admin-dashboard/admin-accesos/admins-table/admins-table.component';
import { AdminTopbarComponent } from './components/admin-topbar/admin-topbar.component';
import { AdminAfiliadosTableComponent, BottomAdminAfiliado } from './components/admin-dashboard/admin-afiliados-table/admin-afiliados-table.component';
import { PublicModule } from '../public/public.module';
import { AdminInicioComponent } from './components/admin-dashboard/admin-inicio/admin-inicio.component';
import { CreateAdminAccountComponent } from './components/create-admin-account/create-admin-account.component';
import { AdminClientesComponent } from './components/admin-dashboard/admin-clientes/admin-clientes.component';
import { AdminSeeClientComponent } from './components/admin-dashboard/admin-clientes/admin-see-client/admin-see-client.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AdminSitioComponent } from './components/admin-dashboard/admin-sitio/admin-sitio.component';
import { AdminSliderComponent } from './components/admin-dashboard/admin-sitio/admin-slider/admin-slider.component';
import { AdminSlideComponent } from './components/admin-dashboard/admin-sitio/admin-slide/admin-slide.component';
import { MxStorageModule } from '@marxa/storage';
import { MxResponsiveModule } from '@marxa/devkit';
import { SharedModule } from '../shared/shared.module';
import { AdminSolicitudesClientesComponent } from './components/admin-dashboard/admin-inicio/admin-solicitudes-clientes/admin-solicitudes-clientes.component';
import { AdminSolicitudesAfiliadosComponent, DialogAceptAfiliadoComponent } from './components/admin-dashboard/admin-inicio/admin-solicitudes-afiliados/admin-solicitudes-afiliados.component';
import { DialogAceptClientComponent } from './components/admin-dashboard/admin-inicio/admin-solicitudes-clientes/admin-solicitudes-clientes.component';
import { PipesModule } from '../pipes/pipes.module';
import { AdminContactoComponent, DialogContactoMensajeComponent } from './components/admin-dashboard/admin-inicio/admin-contacto/admin-contacto.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminAccesosComponent,
    AdminManagersTableComponent,
    DialogAccesoComponent,
    DialogRevokeAccesoComponent,
    AdminClientesTableComponent,
    AdminsTableComponent,
    AdminTopbarComponent,
    AdminAfiliadosTableComponent,
    AdminInicioComponent,
    DialogAceptClientComponent,
    DialogAceptAfiliadoComponent,
    DialogContactoMensajeComponent,
    CreateAdminAccountComponent,
    AdminClientesComponent,
    AdminSeeClientComponent,
    AdminSitioComponent,
    AdminSliderComponent,
    AdminSlideComponent,
    AdminSolicitudesClientesComponent,
    AdminSolicitudesAfiliadosComponent,
    AdminContactoComponent,
    BottomAdminAfiliado
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule,
    SharedModule,
    PublicModule,
    PdfViewerModule,
    MxResponsiveModule,
    MxStorageModule,
    PipesModule,

  ],
})
export class AdminModule {}
