import { Component } from "@angular/core";
import { UsuarioService } from "../../../../services/usuario.service";
import { Usuario } from "../../../../models/Usuario";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'usuario',
    templateUrl: 'usuario.html',
    providers: [UsuarioService]
})
export class UsuarioComponent {

  public id: number;
  public usuario = new Usuario();

    public constructor(
        private _usuarioService: UsuarioService,
        private _route: ActivatedRoute
    ) {
      this._route.params.subscribe(params => {
        this.id = params["id"];
      });
    }

    public ngOnInit() {
      this._usuarioService.get(this.id).subscribe(Response => {
        this.usuario = Response;
        console.log(this.usuario);
      });
    }

}