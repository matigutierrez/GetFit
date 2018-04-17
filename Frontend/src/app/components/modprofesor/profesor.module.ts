import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './profesor.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../../services/auth.service';
import { VistaProfesorComponent } from './vistaprofesor/vistaprofesor.component';
import { ModProfesorComponent } from './modprofesor.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { ProfesorGuard } from '../../guards/ProfesorGuard';

@NgModule({
  declarations: [
    ModProfesorComponent,
    VistaProfesorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MaterializeModule,
    ChartsModule,
    NgxPaginationModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    AuthGuard,
    ProfesorGuard
  ]
})
export class AppModuleProfesor { }
