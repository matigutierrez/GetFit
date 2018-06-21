import { Component, ViewChild, OnDestroy } from "@angular/core";
import { UsuarioService } from "../../../../services/usuario.service";
import { Usuario } from "../../../../models/Usuario";
import { RegistroUsuarioComponent } from "../registrousuario/registrousuario.component";
import { PusherService } from "../../../../services/pusher.service";

declare var Materialize: any;

@Component({
    selector: 'usuarios',
    templateUrl: 'usuarios.html'
})
export class UsuariosComponent implements OnDestroy {

    // Componente para registro de usuarios
    @ViewChild(RegistroUsuarioComponent)
    public registroUsuarioComponent: RegistroUsuarioComponent;

    // Lista de usuarios
    public usuarios: Usuario[];

    // Pagina actual del componente
    public p: number = 1;

    // Canal de usuarios de pusher
    public usuarioChannel: any;

    public constructor(
        private _usuarioService: UsuarioService,
        private _pusherService: PusherService
    ) {
        // Solicitar la lista de usuarios a backend
        this._usuarioService.query().subscribe(
            Response => {
                this.usuarios = Response;
            }
        );

        this.usuarioChannel = this._pusherService.getPusher().subscribe("usuario");
        this.usuarioChannel.bind("create", data => { this.onCreate(new Usuario(data)) });
        this.usuarioChannel.bind("update", data => { this.onUpdate(new Usuario(data)) });
        this.usuarioChannel.bind("delete", data => { this.onDelete(data) });

    }

    public ngOnDestroy() {
        if (this.usuarioChannel) {
            this.usuarioChannel.unbind();
        }
    }

    public registrarUsuario() {
        // Abrir componente para registrar usuario
        this.registroUsuarioComponent.abrir();
    }

    public onCreate(usuario: Usuario) {
        // Si se ha recibido la lista de usuarios
        if (this.usuarios) {
            // Agregar usuario a la lista de usuarios
            this.usuarios.unshift(usuario);

            // Indicar que se ha creado el usuario
            Materialize.toast('Se ha registrado el usuario "' + usuario.usu_correo + '" al sistema');
        }
    }

    public onUpdate(usuario: Usuario) {
        // Si se ha recibido la lista de usuarios
        if (this.usuarios) {
            // Por cada usuario
            for (let i = 0; i < this.usuarios.length; i++) {
                // Si los IDs coinciden
                if (this.usuarios[i].id == usuario.id) {
                    // Reemplazar usuario
                    this.usuarios[i] = usuario;
                    break;
                }
            }
        }
    }

    public onDelete(usuario: Usuario) {
        // Si se ha recibido la lista de usuarios
        if (this.usuarios) {
            // Por cada usuario
            for (let i = 0; i < this.usuarios.length; i++) {
                // Si los IDs coinciden
                if (this.usuarios[i].id == usuario.id) {
                    // Eliminar usuario
                    this.usuarios.splice(i, 1);
                    break;
                }
            }
        }
    }

}