import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/vistaprincipal/principal/principal.component';
import { ChartlineClienteComponent } from './components/vistaprincipal/chartlineCliente/chartlineCliente.component';
import { BarChartContratoComponent } from './components/vistaprincipal/barchartContratos/barchartContrato.component';
import { PlanComponent } from './components/planes/plan/plan.component';
import { HorarioComponent } from './components/planes/horario/horario.component';
import { RegistroPlanComponent } from './components/planes/registroplan/registroplan.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { RegistroUsuarioComponent } from './components/usuarios/registrousuario/registrousuario.component';
import { RegistroClienteComponent } from './components/clientes/registrocliente/registrocliente.component';
import { CircleChartComponent } from './components/vistaprincipal/circlechart/circlechart.component';
import { AuthGuardService } from './services/authguard.service';
import { AuthService } from './services/auth.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:4200']
      }
    })
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
