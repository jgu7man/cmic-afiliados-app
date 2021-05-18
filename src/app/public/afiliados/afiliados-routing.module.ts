import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfiliadosComponent } from './afiliados.component';
import { ActividadesFormComponent } from './components/actividades-form/actividades-form.component';
import { AfiliacionFormComponent } from './components/afiliacion-form/afiliacion-form.component';
import { AfiliadosLoginComponent } from './components/afiliados-login/afiliados-login.component';
import { AfiliadosRegistroComponent } from './components/afiliados-registro/afiliados-registro.component';
import { AfiliadosPerfilComponent } from './components/afiliados-perfil/afiliados-perfil.component';
import { AfiliadosAdminComponent } from './components/afiliados-admin/afiliados-admin.component';
import { AfiliadosExperienciaComponent } from './components/afiliados-perfil/afiliados-experiencia/afiliados-experiencia.component';
import { AfiliadosCapacidadContableComponent } from './components/afiliados-perfil/afiliados-capacidad-contable/afiliados-capacidad-contable.component';
import { AfiliadosEquipoMaquinariaComponent } from './components/afiliados-perfil/afiliados-equipo-maquinaria/afiliados-equipo-maquinaria.component';
import { AfiliadosRecursosHumanosComponent } from './components/afiliados-perfil/afiliados-recursos-humanos/afiliados-recursos-humanos.component';
import { AfiliadosCertificacionesEspecializacionesComponent } from './components/afiliados-perfil/afiliados-certificaciones-especializaciones/afiliados-certificaciones-especializaciones.component';
import { EditarInformacionComponent } from './components/editar-informacion/editar-informacion.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { AfiliadosAccesosComponent } from './components/afiliados-accesos/afiliados-accesos.component';

const routes: Routes = [
  {
    path: '',
    component: AfiliadosComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'perfil' },
      { path: 'afiliacion/:RFC', component: AfiliacionFormComponent },
      { path: 'elegir-actividades/:RFC', component: ActividadesFormComponent },
      { path: '', component: AfiliadosAdminComponent, children:[
        { path: 'perfil', component: AfiliadosPerfilComponent },
        { path: 'experiencia', component: AfiliadosExperienciaComponent },
        { path: 'capacidad-contable', component: AfiliadosCapacidadContableComponent },
        { path: 'equipo-maquinaria', component: AfiliadosEquipoMaquinariaComponent },
        { path: 'recursos-humanos', component: AfiliadosRecursosHumanosComponent },
        { path: 'certificaciones-especializaciones', component: AfiliadosCertificacionesEspecializacionesComponent },
        { path: 'editar-afiliado/:RFC', component: EditarInformacionComponent  },
        { path: 'editar-perfil/:RFC', component: EditarPerfilComponent },
        { path: 'accesos', component: AfiliadosAccesosComponent },
      ]},
      { path: 'login', component: AfiliadosLoginComponent },
      { path: 'registro', component: AfiliadosRegistroComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfiliadosRoutingModule {}
