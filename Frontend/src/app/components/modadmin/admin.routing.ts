import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PrincipalComponent } from './vistaprincipal/principal/principal.component';
import { PlanesComponent } from './planes/planes/planes.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { CobranzasComponent } from './cobranzas/cobranzas/cobranzas.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { AdminGuard } from '../../guards/AdminGuard';
import { SedesComponent } from './sedes/sedes/sedes.component';
import { NotificacionComponent } from './notificaciones/notificacion/notificacion.component';
import { ProfesoresComponent } from './profesores/profesores/profesores.component';
import { PlanComponent } from './planes/plan/plan.component';
import { ProfesorComponent } from './profesores/profesor/profesor.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';

const appRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: '',
        component: PrincipalComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'cliente/:id',
        component: ClienteComponent
      },
      {
        path: 'profesores',
        component: ProfesoresComponent
      },
      {
        path: 'profesor/:id',
        component: ProfesorComponent
      },
      {
        path: 'planes',
        component: PlanesComponent
      },
      {
        path: 'plan/:id',
        component: PlanComponent
      },
      {
        path: 'cobranzas',
        component: CobranzasComponent
      },
      {
        path: 'sedes',
        component: SedesComponent
      },
      {
        path: 'notificacion',
        component: NotificacionComponent
      }
    ]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);