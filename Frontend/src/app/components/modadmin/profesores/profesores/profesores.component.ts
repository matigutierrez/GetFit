import { Component, ViewChild, OnDestroy } from "@angular/core";
import { ProfesorService } from "../../../../services/profesor.service";
import { Profesor } from "../../../../models/Profesor";
import { PusherService } from "../../../../services/pusher.service";
import { RegistroProfesorComponent } from "../registroprofesor/registroprofesor.component";
import { Usuario } from "../../../../models/Usuario";

declare var Materialize: any;

@Component({
    selector: 'profesores',
    templateUrl: 'profesores.html'
})
export class ProfesoresComponent implements OnDestroy {

    // Lista de profesores
    public profesores: Profesor[];

    @ViewChild(RegistroProfesorComponent)
    public registroProfesor: RegistroProfesorComponent;

    // Canal de profesores
    private profesorChannel: any;

    // Canal de usuarios
    private usuarioChannel: any;

    public constructor(
        private _profesorService: ProfesorService,
        private _pusherService: PusherService
    ) {
        // Solicitar lista de profesores a backend
        this._profesorService.query().subscribe(
            Response => {
                this.profesores = Response;
            }
        );

        this.profesorChannel = this._pusherService.getPusher().subscribe('profesor');
        this.profesorChannel.bind('create', data => { this.onCreate(data) });
        this.profesorChannel.bind('update', data => { this.onUpdate(data) });
        this.profesorChannel.bind('delete', data => { this.onDelete(data) });

        this.usuarioChannel = this._pusherService.getPusher().subscribe('usuario');
        this.usuarioChannel.bind('create', data => { this.onCreateUsuario(data) });
        this.usuarioChannel.bind('update', data => { this.onUpdateUsuario(data) });
        this.usuarioChannel.bind('delete', data => { this.onDeleteUsuario(data) });

    }

    public ngOnDestroy() {
        if (this.profesorChannel) {
            this.profesorChannel.unbind();
        }
        if (this.usuarioChannel) {
            this.usuarioChannel.unbind();
        }
    }

    public onCreateUsuario(usuario: Usuario) {
        // Si el usuario es profesor
        if (usuario.tgf_profesor_id) {
            // Si se ha recibido la lista de profesores
            if (this.profesores) {
                // Por cada profesor
                for (let i = 0; i < this.profesores.length; i++) {
                    let profesor = this.profesores[i];
                    // Comparar ids
                    if (usuario.tgf_profesor_id == profesor.id) {
                        // Asignar usuario
                        profesor.usuario = usuario;
                        break;
                    }
                }
            }
        }

    }

    public onUpdateUsuario(usuario: Usuario) {
        // Si se ha recibido la lista de profesores
        if (this.profesores) {
            // Si hay algun profesor que tiene este usuario
            for (let i = 0; i < this.profesores.length; i++) {
                // Por cada profesor
                let profesor = this.profesores[i];
                // Si el profesor tiene usuario, comparar ids
                if ( profesor.usuario && profesor.usuario.id == usuario.id ) {
                    // Eliminar a usuario antiguo
                    profesor.usuario = null;
                    break;
                }
            }

            // Si el usuario es profesor
            if (usuario.tgf_profesor_id) {
                // Por cada profesor
                for (let i = 0; i < this.profesores.length; i++) {
                    let profesor = this.profesores[i];
                    // Comparar ids
                    if (usuario.tgf_profesor_id == profesor.id) {
                        // Actualizar usuario
                        profesor.usuario = usuario;
                        break;
                    }
                }
            }
        }
    }

    public onDeleteUsuario(id: number) {
        // Si se ha recibido la lista de profesores
        if (this.profesores) {
            // Si hay algun profesor que tiene este usuario
            for (let i = 0; i < this.profesores.length; i++) {
                // Por cada profesor
                let profesor = this.profesores[i];
                // Si el profesor tiene usuario, comparar ids
                if ( profesor.usuario && profesor.usuario.id == id ) {
                    // Eliminar a usuario
                    profesor.usuario = null;
                    break;
                }
            }
        }
    }

    public deleteProfesor(id: number) {
        // Eliminar un profesor
        this._profesorService.delete(id).subscribe(null);
    }

    public onCreate(profesor: Profesor) {
        // Validar que existe la lista de profesores
        if (this.profesores) {
            // Insertar profesor nuevo
            this.profesores.unshift(profesor);

            // Indicar que se ha registrado el profesor
            Materialize.toast('Se ha registrado el profesor "' + profesor.pro_nombres + ' ' + profesor.pro_apellidos + '" al sistema', 3000);
        }
    }

    public onUpdate(profesor: Profesor) {
        // Validar que existe la lista de profesores
        if (this.profesores) {
            // Por cada profesor
            for (let i = 0; i < this.profesores.length; i++) {
                // Comparar ids
                if (this.profesores[i].id == profesor.id) {
                    // Actualizar profesor
                    this.profesores[i] = profesor;
                    break;
                }
            }
        }
    }

    public onDelete(id: number) {
        // Validar que existe la lista de profesores
        if (this.profesores) {
            // Por cada profesor
            for (let i = 0; i < this.profesores.length; i++) {
                // Comparar ids
                if (this.profesores[i].id == id) {
                    // Quitar profesor de lista
                    this.profesores.splice(i, 1);
                    break;
                }
            }
        }
    }

}