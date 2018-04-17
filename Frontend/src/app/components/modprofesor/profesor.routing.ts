import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { VistaProfesorComponent } from './vistaprofesor/vistaprofesor.component';
import { ModProfesorComponent } from './modprofesor.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { ProfesorGuard } from '../../guards/ProfesorGuard';

const appRoutes: Routes = [
  {
  path:'profesor',
  component: ModProfesorComponent,
  canActivate: [AuthGuard, ProfesorGuard],
  children: [
    {
      path:'',
      component: VistaProfesorComponent
    }
  ]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);