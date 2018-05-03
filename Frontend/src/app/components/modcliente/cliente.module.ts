import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './cliente.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../../services/auth.service';
import { VistaClienteComponent } from './vistacliente/vistacliente.component';
import { CobranzaComponent } from './cobranzas/cobranza.component';
import { ModClienteComponent } from './modcliente.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { ClienteGuard } from '../../guards/ClienteGuard';
import { PlanesComponent } from './planes/planes.component';
import { ExtraModule } from '../extra/extra.module';

@NgModule({
  declarations: [
    ModClienteComponent,
    VistaClienteComponent,
    CobranzaComponent,
    PlanesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MaterializeModule,
    ChartsModule,
    NgxPaginationModule,
    ExtraModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    AuthGuard,
    ClienteGuard
  ]
})
export class AppModuleCliente { }
