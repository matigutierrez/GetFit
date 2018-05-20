import { Component, Input, AfterViewChecked } from "@angular/core";
import { Profesor } from "../../../../models/Profesor";
import { ProfesorService } from "../../../../services/profesor.service";
import { Usuario } from "../../../../models/Usuario";
import { UsuarioService } from "../../../../services/usuario.service";

declare var Materialize: any;

@Component({
    selector: 'editarprofesor',
    templateUrl: 'editarprofesor.html'
})
export class EditarProfesorComponent implements AfterViewChecked {

    // Objeto del profesor
    public profesor: Profesor = new Profesor();

    // Objeto del usuario
    public usuario: Usuario = new Usuario();

    // Hubo error al actualizar?
    public error: boolean = false;

    public constructor(
        private _profesorService: ProfesorService,
        private _usuarioService: UsuarioService
    ) {

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    @Input("profesor")
    public set setProfesor(profesor: Profesor) {

        this.profesor = profesor;

        if ( this.profesor.usuario ) {
            this.usuario = profesor.usuario;
        } else {
            this.usuario = new Usuario();
        }
        
    }

    public onSubmit() {

    }

}