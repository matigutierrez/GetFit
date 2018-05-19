import { Component, EventEmitter, AfterViewChecked } from "@angular/core";
import { MaterializeAction } from "angular2-materialize";
import { ProfesorService } from "../../../../services/profesor.service";
import { UsuarioService } from "../../../../services/usuario.service";
import { Profesor } from "../../../../models/Profesor";
import { Usuario } from "../../../../models/Usuario";

declare var Materialize: any;

@Component({
    selector: 'registroprofesor',
    templateUrl: 'registroprofesor.html',
    providers: [ProfesorService, UsuarioService]
})
export class RegistroProfesorComponent implements AfterViewChecked {

    public profesor: Profesor;
    public usuario: Usuario;

    public modal = new EventEmitter<string | MaterializeAction>();
    public error: boolean;

    public constructor(
        private _profesorService: ProfesorService,
        private _usuarioService: UsuarioService

    ) {

        this.profesor = new Profesor();
        this.usuario = new Usuario();

        // Rol 2 (Profesor)
        this.usuario.tgf_rol_id = 2;

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public limpiar(): void {
        this.profesor = new Profesor();
        this.usuario = new Usuario();
        
        // Rol 2 (Profesor)
        this.usuario.tgf_rol_id = 2;

        this.error = false;
    }

    public onSubmit() {
        this._profesorService.save(this.profesor).subscribe(
            Response => {

                this.profesor.id = Response;
                this.error = false;

                if (this.usuario.usu_correo.length > 0 && this.usuario.password.length > 0) {

                    this.usuario.tgf_profesor_id = this.profesor.id;
                    this._usuarioService.save(this.usuario).subscribe(null);

                }

                // Cerrar modal
                this.cerrar();

                // Limpiar campos
                this.limpiar();

            },
            error => {
                console.log(<any>error);
                this.error = true;
            }
        );
    }

    public abrir() {
        // Limpiar formulario
        this.limpiar();

        // Abrir modal
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.error = false;
        this.modal.emit({ action: "modal", params: ['close'] });
    }

}