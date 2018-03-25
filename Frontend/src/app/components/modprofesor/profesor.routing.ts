import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../services/authguard.service';
import { VistaProfesorComponent } from './vistaprofesor/vistaprofesor.component';
import { ModProfesorComponent } from './modprofesor.component';

const appRoutes: Routes = [
  {
  path:'getfit',
  component: ModProfesorComponent,
  children: [
    {
      path:'profesor',
      component: VistaProfesorComponent
    }
  ]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);