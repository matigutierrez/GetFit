import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PrincipalComponent } from './vistaprincipal/principal/principal.component';
import { PlanComponent } from './planes/plan/plan.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { AuthGuardService as AuthGuard } from '../../services/authguard.service';
import { AdminComponent } from './admin.component';

const appRoutes: Routes = [
  {
    path:'getfit',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [{
      path:'principal',
      component: PrincipalComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'clientes',
      component: ClienteComponent
    },
    {
      path: 'plan',
      component: PlanComponent
    }]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);