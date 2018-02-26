import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../services/authguard.service';
import { VistaClienteComponent } from './vistacliente/vistacliente.component';

const appRoutes: Routes = [
  {
    path:'getfit/cliente',
    component: VistaClienteComponent
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);