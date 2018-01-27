import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PlanComponent } from './components/plan/plan.component';

const appRoutes: Routes = [
	{path:'', component: LoginComponent},
	{path:'login', component: LoginComponent},
	{path:'login/:id', component: LoginComponent},
	{path:'registro', component: RegistroComponent},
	{path:'getfit', component: PrincipalComponent},
	{path: 'plan', component: PlanComponent},
	{path:'**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);