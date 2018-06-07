import { Component, ViewChild } from "@angular/core";
import { UsuarioService } from "../../../../services/usuario.service";
import { Usuario } from "../../../../models/Usuario";
import { RegistroUsuarioComponent } from "../registrousuario/registrousuario.component";

@Component({
    selector: 'usuarios',
    templateUrl: 'usuarios.html'
})
export class UsuariosComponent {

    // Componente para registro de usuarios
    @ViewChild(RegistroUsuarioComponent)
    public registroUsuarioComponent: RegistroUsuarioComponent;

    // Lista de usuarios
    public usuarios: Usuario[];

    // Pagina actual del componente
    public p: number = 1;

    public constructor(
        private _usuarioService: UsuarioService
    ) {
        // Solicitar la lista de usuarios a backend
        this._usuarioService.query().subscribe(
            Response => {
                this.usuarios = Response;
            }
        );
    }

    public registrarUsuario() {
        // Abrir componente para registrar usuario
        this.registroUsuarioComponent.abrir();
    }

}