import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MainPerfilComponent } from './perfiles/components/main-perfil/main-perfil.component';

import { PublicComponent } from './public.component';
import { AvisoPrivacidadComponent } from './pages/aviso-privacidad/aviso-privacidad.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

const routes: Routes = [
  { path: '', component: PublicComponent  , children:[
    { path: '', component: InicioComponent, data: {title: 'Inicio'}},
    {
      path: 'afiliados',
      loadChildren: () => import('./afiliados/afiliados.module').then(m => m.AfiliadosModule)
    },
    {
      path: 'clientes',
      loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
    },
    { path: 'afiliado/:slug', component: MainPerfilComponent },
    { path: 'consulta', component: ConsultasComponent,data:{title: 'Consulta'} },
    { path: 'aviso-de-privacidad', component: AvisoPrivacidadComponent, data:{title: 'Aviso de privacidad'}, },
    { path: 'contacto', component: ContactoComponent, data:{title: 'Contacto'}, },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
