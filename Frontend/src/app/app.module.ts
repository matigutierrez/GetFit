import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/vistaprincipal/principal/principal.component';
import { ChartlineClienteComponent } from './components/vistaprincipal/chartlineCliente/chartlineCliente.component';
import { BarChartContratoComponent } from './components/vistaprincipal/barchartContratos/barchartContrato.component';
import { PlanComponent } from './components/planes/plan/plan.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { CircleChartComponent } from './components/vistaprincipal/circlechart/circlechart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChartlineClienteComponent,
    BarChartContratoComponent,
    PrincipalComponent,
    PlanComponent,
    ClienteComponent,
    CircleChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MaterializeModule,
    ChartsModule
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
