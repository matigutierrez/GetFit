import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PrincipalComponent } from './vistaprincipal/principal/principal.component';
import { GruposComponent } from './grupos/grupos/grupos.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { CobranzasComponent } from './cobranzas/cobranzas/cobranzas.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../../guards/AuthGuard';
import { AdminGuard } from '../../guards/AdminGuard';
import { SedesComponent } from './sedes/sedes/sedes.component';
import { NotificacionComponent } from './notificaciones/notificacion/notificacion.component';
import { ProfesoresComponent } from './profesores/profesores/profesores.component';
import { GrupoComponent } from './grupos/grupo/grupo.component';
import { ProfesorComponent } from './profesores/profesor/profesor.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { ServicioComponent } from './servicios/servicio/servicio.component';
import { SedeComponent } from './sedes/sede/sede.component';
import { IndexServiciosComponent } from './servicios/index/indexservicios.component';
import { DisponibilidadServicioComponent } from './servicios/disponibilidadservicio/disponibilidadservicio.component';

const appRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard],
        children: [
            {
                path: '',
                component: PrincipalComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
            },
            {
                path: 'grupos',
                component: GruposComponent
            },
            {
                path: 'servicios',
                component: IndexServiciosComponent
            },
            {
                path: 'servicio/:id',
                component: ServicioComponent
            },
            {
                path: 'dispserv/:id',
                component: DisponibilidadServicioComponent
            },
            {
                path: 'clientes',
                component: ClientesComponent
            },
            {
                path: 'cliente/:id',
                component: ClienteComponent
            },
            {
                path: 'profesores',
                component: ProfesoresComponent
            },
            {
                path: 'profesor/:id',
                component: ProfesorComponent
            },
            {
                path: 'grupo/:id',
                component: GrupoComponent
            },
            {
                path: 'cobranzas',
                component: CobranzasComponent
            },
            {
                path: 'sedes',
                component: SedesComponent
            },
            {
                path: 'sede/:id',
                component: SedeComponent
            },
            {
                path: 'notificacion',
                component: NotificacionComponent
            },
            {
                path: 'usuario/:id',
                component: UsuarioComponent
            }
        ]
    }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);