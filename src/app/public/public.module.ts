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


@NgModule({
  declarations: [PublicComponent, TopbarComponent, FooterComponent, InicioComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    FirebaseModule,
    ComunesModule,
    AfiliadosModule,
    ClientesModule,
    GdevResponsiveModule
  ]
})
export class PublicModule {}
