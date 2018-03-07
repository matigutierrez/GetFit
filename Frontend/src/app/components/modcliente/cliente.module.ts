import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './cliente.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuardService } from '../../services/authguard.service';
import { AuthService } from '../../services/auth.service';
import { VistaClienteComponent } from './vistacliente/vistacliente.component';

@NgModule({
  declarations: [
    VistaClienteComponent
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
  ]
})
export class AppModuleCliente { }