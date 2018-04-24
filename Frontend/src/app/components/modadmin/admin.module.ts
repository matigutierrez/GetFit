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
import { AuthService } from '../../services/auth.service';
import { AdminComponent } from './admin.component';
import { CobranzasComponent } from './cobranzas/cobranza/cobranzas.component';
import { RegistroCobranzaComponent } from './cobranzas/registrocobranza/registrocobranza.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { AdminGuard } from '../../guards/AdminGuard';
import { SedeComponent } from './sedes/sede/sede.component';
import { NotificacionComponent } from './notificaciones/notificacion/notificacion.component';
import { NotificacionViewerComponent } from './notificaciones/notificacionviewer/notificacionviewer.component';
import { InscripcionPlanComponent } from './planes/inscripcionplan/inscripcionplan.component';
import { ActaComponent } from './planes/acta/acta.component';
import { ProfesorComponent } from './profesores/profesor/profesor.component';
import { RegistroProfesorComponent } from './profesores/registroprofesor/registroprofesor.component';
import { RegistroSedeComponent } from './sedes/registrosede/registrosede.component';

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
    HorarioComponent,
    CobranzasComponent,
    RegistroCobranzaComponent,
    SedeComponent,
    RegistroSedeComponent,
    NotificacionComponent,
    NotificacionViewerComponent,
    InscripcionPlanComponent,
    ActaComponent,
    ProfesorComponent,
    RegistroProfesorComponent
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
    AuthGuard,
    AdminGuard
  ]
})
export class AppModuleAdmin { }
