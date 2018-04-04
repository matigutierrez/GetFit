import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { VistaClienteComponent } from './vistacliente/vistacliente.component';
import { CobranzaComponent } from './cobranzas/cobranza.component';
import { ModClienteComponent } from './modcliente.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { ClienteGuard } from '../../guards/ClienteGuard';

const appRoutes: Routes = [
  {
  path:'getfit',
  component: ModClienteComponent,
  canActivate:[AuthGuard, ClienteGuard],
  children: [
    {
      path:'cliente',
      component: VistaClienteComponent
    },
    {
      path: 'cobranzas',
      component: CobranzaComponent
    }
  ]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);