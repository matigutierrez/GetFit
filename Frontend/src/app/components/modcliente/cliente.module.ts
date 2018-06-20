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
import { GruposComponent } from './grupos/grupos.component';
import { ExtraModule } from '../extra/extra.module';
import { HorariosComponent } from './horarios/horarios.component';
import { SolicitarGrupoComponent } from './horarios/solicitargrupo/solicitargrupo.component';
import { ContratosHorariosComponent } from './horarios/contratoshorarios/contratoshorarios.component';

@NgModule({
  declarations: [
    ModClienteComponent,
    VistaClienteComponent,
    CobranzaComponent,
    GruposComponent,
    HorariosComponent,
    ContratosHorariosComponent,
    SolicitarGrupoComponent
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
