import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../services/authguard.service';
import { VistaProfesorComponent } from './vistaprofesor/vistaprofesor.component';
import { ModProfesorComponent } from './modprofesor.component';
import { ProfesorGuardService } from '../../services/profesorguard.service';

const appRoutes: Routes = [
  {
  path:'getfit',
  component: ModProfesorComponent,
  canActivate: [AuthGuard, ProfesorGuardService],
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