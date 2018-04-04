import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/LoginGuard';

const appRoutes: Routes = [
  {
    path:'',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'login/:id',
    component: LoginComponent
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);