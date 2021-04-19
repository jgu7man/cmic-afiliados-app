import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MainPerfilComponent } from './perfiles/components/main-perfil/main-perfil.component';

import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', component: PublicComponent  , children:[
    { path: '', component: InicioComponent },
    {
      path: 'afiliados',
      loadChildren: () => import('./afiliados/afiliados.module').then(m => m.AfiliadosModule)
    },
    {
      path: 'clientes',
      loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
    },
    { path: 'afiliado/:RFC', component: MainPerfilComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
