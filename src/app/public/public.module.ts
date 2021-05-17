import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { ComunesModule } from 'src/shared/comunes.module';
import { TopbarComponent } from './topbar/topbar.component';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { ClientesModule } from './clientes/clientes.module';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GdevResponsiveModule } from 'gdev-responsive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatMenuComponent } from './float-menu/float-menu.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { SearcherComponent } from './searcher/searcher.component';
import { RestorePwdComponent } from './restore-pwd/restore-pwd.component';
import { CatalogoEspecialidadComponent } from './catalogo-especialidad/catalogo-especialidad.component';
import { AvisoPrivacidadComponent } from './pages/aviso-privacidad/aviso-privacidad.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ContactoFormComponent } from './contacto-form/contacto-form.component';
import { GdevModule } from '../gdev/gdev.module';
// import { MxResponsiveModule } from '../responsive/responsive.module';

@NgModule({
  declarations: [
    PublicComponent,
    TopbarComponent,
    FooterComponent,
    InicioComponent,
    FloatMenuComponent,
    ConsultasComponent,
    SearcherComponent,
    RestorePwdComponent,
    CatalogoEspecialidadComponent,
    AvisoPrivacidadComponent,
    ContactoComponent,
    ContactoFormComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule,
    AfiliadosModule,
    ClientesModule,
    GdevResponsiveModule,
    ReactiveFormsModule,
    FormsModule,
    GdevModule
    // MxResponsiveModule
  ],
  exports: [
    SearcherComponent,
  ],
})
export class PublicModule {}
