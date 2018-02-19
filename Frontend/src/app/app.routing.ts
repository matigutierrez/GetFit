import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/vistaprincipal/principal/principal.component';
import { PlanComponent } from './components/planes/plan/plan.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { AuthGuardService as AuthGuard } from './services/authguard.service';

const appRoutes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'login/:id',
    component: LoginComponent
  },
  {
    path:'getfit',
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
  },
  {
    path:'**',
    component: LoginComponent
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);