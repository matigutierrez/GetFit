import { Component } from "@angular/core";
import { UsuarioService } from "../../../../services/usuario.service";
import { Usuario } from "../../../../models/Usuario";

@Component({
    selector: 'usuarios',
    templateUrl: 'usuarios.html',
    providers: [UsuarioService]
})
export class UsuariosComponent {

    public usuarios: Usuario[];
    public p: number;

    public constructor(
        private _usuarioService: UsuarioService
    ) {
        this._usuarioService.query().subscribe(
            Response => {
                this.usuarios = Response;
            }
        );
    }

}