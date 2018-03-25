import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../services/authguard.service';
import { VistaClienteComponent } from './vistacliente/vistacliente.component';
import { CobranzaComponent } from './cobranzas/cobranza.component';
import { ModClienteComponent } from './modcliente.component';
import { ClienteGuardService } from '../../services/clienteguard.service';

const appRoutes: Routes = [
  {
  path:'getfitc',
  component: ModClienteComponent,
  canActivate:[AuthGuard, ClienteGuardService],
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