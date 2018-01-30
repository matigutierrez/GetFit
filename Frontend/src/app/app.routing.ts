import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/vistaprincipal/principal/principal.component';
import { PlanComponent } from './components/planes/plan/plan.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';

const appRoutes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'login/:id', component: LoginComponent},
  {path:'getfit', component: PrincipalComponent},
  {path:'cliente', component: ClienteComponent},
  {path:'cliente/Grupo/:plan', component: ClienteComponent},
  {path: 'plan', component: PlanComponent},
  {path:'**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);