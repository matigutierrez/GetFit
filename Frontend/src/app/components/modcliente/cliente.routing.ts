import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { VistaClienteComponent } from './vistacliente/vistacliente.component';
import { CobranzaComponent } from './cobranzas/cobranza.component';
import { ModClienteComponent } from './modcliente.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { ClienteGuard } from '../../guards/ClienteGuard';
import { PlanesComponent } from './planes/planes.component';

const appRoutes: Routes = [
  {
  path:'cliente',
  component: ModClienteComponent,
  canActivate:[AuthGuard, ClienteGuard],
  children: [
    {
      path:'',
      component: VistaClienteComponent
    },
    {
      path: 'cobranzas',
      component: CobranzaComponent
    },
    {
      path: 'planes',
      component: PlanesComponent
    }
  ]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);