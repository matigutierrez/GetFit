import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './admin.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrincipalComponent } from './vistaprincipal/principal/principal.component';
import { ChartlineClienteComponent } from './vistaprincipal/chartlineCliente/chartlineCliente.component';
import { BarChartContratoComponent } from './vistaprincipal/barchartContratos/barchartContrato.component';
import { PlanComponent } from './planes/plan/plan.component';
import { HorarioComponent } from './planes/horario/horario.component';
import { RegistroPlanComponent } from './planes/registroplan/registroplan.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { RegistroUsuarioComponent } from './usuarios/registrousuario/registrousuario.component';
import { RegistroClienteComponent } from './clientes/registrocliente/registrocliente.component';
import { CircleChartComponent } from './vistaprincipal/circlechart/circlechart.component';
import { AuthGuardService } from '../../services/authguard.service';
import { AuthService } from '../../services/auth.service';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    ChartlineClienteComponent,
    BarChartContratoComponent,
    PrincipalComponent,
    PlanComponent,
    ClienteComponent,
    CircleChartComponent,
    RegistroPlanComponent,
    RegistroClienteComponent,
    RegistroUsuarioComponent,
    HorarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MaterializeModule,
    ChartsModule,
    NgxPaginationModule,
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    AuthGuardService
  ]
})
export class AppModuleAdmin { }
