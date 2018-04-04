import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PrincipalComponent } from './vistaprincipal/principal/principal.component';
import { PlanComponent } from './planes/plan/plan.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { CobranzasComponent } from './cobranzas/cobranza/cobranzas.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { AdminGuard } from '../../guards/AdminGuard';

const appRoutes: Routes = [
  {
    path:'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [{
      path:'',
      component: PrincipalComponent
    },
    {
      path:'clientes',
      component: ClienteComponent
    },
    {
      path: 'plan',
      component: PlanComponent
    },
    {
      path: 'cobranzas',
      component: CobranzasComponent
    }]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);