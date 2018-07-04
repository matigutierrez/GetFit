import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppModuleAdmin } from './components/modadmin/admin.module';
import { AppModuleCliente } from './components/modcliente/cliente.module';
import { AppModuleProfesor } from './components/modprofesor/profesor.module';
import { RolService } from './services/rol.service';
import { LoginGuard } from './guards/LoginGuard';
import { PusherService } from './services/pusher.service';
import { ContratoService } from './services/contrato.service';
import { NotificacionService } from './services/notificacion.service';
import { GLOBAL } from './services/global';
import { ExtraModule } from './components/extra/extra.module';

export function getToken(): string {

  let token: any = localStorage.getItem('token');

  if ( token != null ) {

    return JSON.parse(localStorage.getItem('token'));

  }

  return null;

}

const jwtConf: JwtModuleOptions = {
  config: {
    tokenGetter: getToken,
    authScheme: '',
    whitelistedDomains: [GLOBAL.host]
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MaterializeModule,
    AppModuleAdmin,
    AppModuleCliente,
    AppModuleProfesor,
    ExtraModule,
    JwtModule.forRoot(jwtConf)
  ],
  providers: [
    appRoutingProviders,
    RolService,
    ContratoService,
    PusherService,
    NotificacionService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
