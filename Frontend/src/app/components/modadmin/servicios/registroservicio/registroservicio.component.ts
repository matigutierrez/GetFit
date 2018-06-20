import { Component, AfterViewChecked, EventEmitter } from "@angular/core";
import { ServicioService } from "../../../../services/servicio.service";
import { Servicio } from "../../../../models/Servicio";
import { MaterializeAction } from "angular2-materialize";

declare var Materialize: any;

@Component({
    selector: 'registroservicio',
    templateUrl: 'registroservicio.html'
})
export class RegistroServicioComponent implements AfterViewChecked {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Servicio que se va a registrar
    public servicio: Servicio = new Servicio();

    // Indicar que se encuentra registrando el servicio
    public registrando: boolean;

    public constructor(
        private _servicioService: ServicioService
    ) {

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public limpiar() {
        this.servicio = new Servicio();
        this.registrando = false;
    }

    public abrir() {
        this.limpiar();
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.limpiar();
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Si la longitud del nombre de el servicio es mayor que cero
        if ( this.servicio.ser_nombre.length > 0 ) {
            // Indicar que se encuentra registrando el servicio
            this.registrando = true;

            // Registrar el servicio
            this._servicioService.save(this.servicio).subscribe(
                Response => {
                    // Cerrar modal
                    this.cerrar();
                }
            );
        }
    }

}