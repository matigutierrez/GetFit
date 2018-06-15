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
import { GruposComponent } from './grupos/grupos/grupos.component';
import { GrupoComponent } from './grupos/grupo/grupo.component';
import { RegistroGrupoComponent } from './grupos/registrogrupo/registrogrupo.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { RegistroUsuarioComponent } from './usuarios/registrousuario/registrousuario.component';
import { RegistroClienteComponent } from './clientes/registrocliente/registrocliente.component';
import { CircleChartComponent } from './vistaprincipal/circlechart/circlechart.component';
import { AuthService } from '../../services/auth.service';
import { AdminComponent } from './admin.component';
import { CobranzasComponent } from './cobranzas/cobranzas/cobranzas.component';
import { RegistroCobranzaComponent } from './cobranzas/registrocobranza/registrocobranza.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { AdminGuard } from '../../guards/AdminGuard';
import { SedesComponent } from './sedes/sedes/sedes.component';
import { NotificacionComponent } from './notificaciones/notificacion/notificacion.component';
import { NotificacionViewerComponent } from './notificaciones/notificacionviewer/notificacionviewer.component';
import { InscripcionGrupoComponent } from './grupos/inscripciongrupo/inscripciongrupo.component';
import { ActaComponent } from './grupos/acta/acta.component';
import { ProfesoresComponent } from './profesores/profesores/profesores.component';
import { ProfesorComponent } from './profesores/profesor/profesor.component';
import { RegistroProfesorComponent } from './profesores/registroprofesor/registroprofesor.component';
import { RegistroSedeComponent } from './sedes/registrosede/registrosede.component';
import { ExtraModule } from '../extra/extra.module';
import { PagoCobranzaComponent } from './cobranzas/pagocobranza/pagocobranza.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { HorarioGrupoComponent } from './grupos/horariogrupo/horariogrupo.component';
import { ClientesGrupoComponent } from './grupos/clientesgrupo/clientesgrupo.component';
import { EditarGrupoComponent } from './grupos/editargrupo/editargrupo.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { ProfesoresGrupoComponent } from './grupos/profesoresgrupo/profesoresgrupo.component';
import { ContratosComponent } from './clientes/contratos/contratos.component';
import { EditarProfesorComponent } from './profesores/editarprofesor/editarprofesor.component';
import { EditarClienteComponent } from './clientes/editarcliente/editarcliente.component';
import { GruposClienteComponent } from './clientes/gruposcliente/gruposcliente.component';
import { CobranzasGrupoComponent } from './grupos/cobranzasgrupo/cobranzasgrupo.component';
import { RegistroCobranzaGrupoComponent } from './grupos/registrocobranzagrupo/registrocobranzagrupo.component';
import { CancelarContratoComponent } from './grupos/cancelarcontrato/cancelarcontrato.component';
import { EliminarSedeComponent } from './sedes/eliminarsede/eliminarsede.component';
import { CobranzasClienteComponent } from './clientes/cobranzascliente/cobranzascliente.component';
import { ServiciosComponent } from './servicios/servicios/servicios.component';
import { EliminarServicioComponent } from './servicios/eliminarservicio/eliminarservicio.component';

@NgModule({
  declarations: [
    AdminComponent,
    ChartlineClienteComponent,
    BarChartContratoComponent,
    PrincipalComponent,

    // Componentes de grupo/grupos
    GruposComponent,
    GrupoComponent,
    EditarGrupoComponent,
    ClientesGrupoComponent,
    CobranzasGrupoComponent,
    CancelarContratoComponent,
    RegistroCobranzaGrupoComponent,
    RegistroGrupoComponent,
    HorarioGrupoComponent,
    ProfesoresGrupoComponent,
    InscripcionGrupoComponent,
    ActaComponent,

    // Componentes de servicio/servicios
    ServiciosComponent,
    EliminarServicioComponent,

    // Componentes de cliente
    ClientesComponent,
    ClienteComponent,
    GruposClienteComponent,
    EditarClienteComponent,
    RegistroClienteComponent,
    CobranzasClienteComponent,
    
    // Componentes de cobranza
    ContratosComponent,
    CobranzasComponent,
    PagoCobranzaComponent,
    RegistroCobranzaComponent,

    CircleChartComponent,

    // Componentes de usuario
    UsuariosComponent,
    RegistroUsuarioComponent,
    UsuarioComponent,

    // Componentes de sede
    SedesComponent,
    RegistroSedeComponent,
    EliminarSedeComponent,

    // Componentes de notificacion
    NotificacionComponent,
    NotificacionViewerComponent,
    
    // Componentes de profesor
    ProfesoresComponent,
    ProfesorComponent,
    EditarProfesorComponent,
    RegistroProfesorComponent,
    
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
    AdminGuard
  ]
})
export class AppModuleAdmin { }
