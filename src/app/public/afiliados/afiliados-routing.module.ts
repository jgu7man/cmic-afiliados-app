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
import { AfiliadosCreateComponent } from './components/afiliados-create/afiliados-create.component';

const routes: Routes = [
  {
    path: '',
    component: AfiliadosComponent,
    data:{title: 'Afiliado'},
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'perfil' },
      { path: 'afiliacion/:RFC', component: AfiliacionFormComponent, data:{title: 'Formulario de afilación'}, },
      { path: 'elegir-actividades/:RFC', component: ActividadesFormComponent, data:{title: 'Formulario de actividades'}, },
      { path: '', component: AfiliadosAdminComponent, children:[
        { path: 'perfil/:RFC', component: AfiliadosPerfilComponent, data:{title: 'Perfil'}, },
        { path: 'experiencia', component: AfiliadosExperienciaComponent, data:{title: 'Experiencia'}, },
        { path: 'capacidad-contable', component: AfiliadosCapacidadContableComponent,data:{title: 'Capacidad contable'}, },
        { path: 'equipo-maquinaria', component: AfiliadosEquipoMaquinariaComponent, data:{title: 'Equipo y maquinaria'}, },
        { path: 'recursos-humanos', component: AfiliadosRecursosHumanosComponent, data:{title: 'Recursos humanos'}, },
        { path: 'certificaciones-especializaciones', component: AfiliadosCertificacionesEspecializacionesComponent, data:{title: 'Certificados y especializaciones'}, },
        { path: 'editar-afiliado/:RFC', component: EditarInformacionComponent, data:{title: 'Editar afiliado'},  },
        { path: 'editar-perfil/:RFC', component: EditarPerfilComponent, data:{title: 'Editar perfil'}, },
        { path: 'accesos', component: AfiliadosAccesosComponent, data:{title: 'Accesos'}, },
      ]},
      { path: 'login', component: AfiliadosLoginComponent, data:{title: 'Login'}, },
      { path: 'registro', component: AfiliadosRegistroComponent, data:{title: 'Registro'}, },
      { path: 'create', component: AfiliadosCreateComponent, data:{title: 'Crear cuenta'}, },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfiliadosRoutingModule {}
