import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './services/authguard.service';
import { LoginGuardService } from './services/loginguard.service';

const appRoutes: Routes = [
  {
    path:'',
    component: LoginComponent,
    canActivate: [LoginGuardService]
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