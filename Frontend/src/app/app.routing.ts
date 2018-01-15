import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const appRoutes: Routes = [
	{path:'', component: LoginComponent},
	{path:'login', component: LoginComponent},
	{path:'login/:id', component: LoginComponent},
	{path:'registro', component: RegistroComponent},
	{path:'**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);