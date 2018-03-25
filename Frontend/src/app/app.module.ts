import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/authguard.service';
import { AuthService } from './services/auth.service';
import { AppModuleAdmin } from './components/modadmin/admin.module';
import { AppModuleCliente } from './components/modcliente/cliente.module';
import { AppModuleProfesor } from './components/modprofesor/profesor.module';
import { LoginGuardService } from './services/loginguard.service';
import { UserService } from './services/user.service';
import { RolService } from './services/rol.service';

export function gettoken (){
  return localStorage.getItem('token');
};
const jwtConf: JwtModuleOptions = {
  config: {
    tokenGetter: gettoken,
    whitelistedDomains: ['localhost:4200']
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
    JwtModule.forRoot(jwtConf)
  ],
  providers: [
    appRoutingProviders,
    UserService,
    RolService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
