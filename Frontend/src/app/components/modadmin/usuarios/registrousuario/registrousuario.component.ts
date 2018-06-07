import { Component, EventEmitter, Input, Output, AfterViewChecked } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { Rol } from "../../../../models/Rol";
import { Usuario } from '../../../../models/Usuario';
import { MaterializeAction } from 'angular2-materialize';

declare var Materialize: any;

@Component({
    selector: 'registrousuario',
    templateUrl: 'registrousuario.html'
})
export class RegistroUsuarioComponent implements AfterViewChecked {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Usuario a registrar
    public usuario: Usuario;

    // Indicar que el usuario se está registrando
    public registrando: boolean;

    public constructor(
        private _usuarioService: UsuarioService
    ) {

        this.limpiar();

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public limpiar() {
        // Usuario a registrar
        this.usuario = new Usuario();

        // Rol de administrador
        this.usuario.tgf_rol_id = 1;

        // Indicar que no se encuentra registrando al usuario
        this.registrando = false;
    }

    public onSubmit() {

    }

    public abrir() {
        this.limpiar();
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.limpiar();
        this.modal.emit({ action: "modal", params: ['close'] });
    }

}