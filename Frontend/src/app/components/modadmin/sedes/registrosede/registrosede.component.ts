import { Component, EventEmitter, AfterViewChecked } from "@angular/core";
import { SedeService } from "../../../../services/sede.service";
import { MaterializeAction } from "angular2-materialize";
import { Sede } from "../../../../models/Sede";

declare var Materialize: any;

@Component({
    selector: 'registrosede',
    templateUrl: 'registrosede.html',
    providers: [SedeService]
})
export class RegistroSedeComponent implements AfterViewChecked {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Sede a registrar
    public sede: Sede = new Sede();

    // Indicar que se encuentra registrando la sede
    public registrando: boolean;

    public constructor(
        private _sedeService: SedeService
    ) {
        
    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public limpiar() {
        this.sede = new Sede();
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
        // Si la longitud del nombre de la sede es mayor que cero
        if ( this.sede.sed_nombre.length > 0 ) {
            // Indicar que se encuentra registrando la sede
            this.registrando = true;

            // Registrar la sede
            this._sedeService.save(this.sede).subscribe(
                Response => {
                    // Cerrar modal
                    this.cerrar();
                }
            );
        }
    }

}