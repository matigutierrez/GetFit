import { Component, EventEmitter } from "@angular/core";
import { SedeService } from "../../../../services/sede.service";
import { MaterializeAction } from "angular2-materialize";
import { Sede } from "../../../../models/Sede";

@Component({
    selector: 'registrosede',
    templateUrl: 'registrosede.html',
    providers: [SedeService]
})
export class RegistroSedeComponent {

    public sede: Sede;
    public modalRegistroSede = new EventEmitter<string | MaterializeAction>();

    public constructor(
        private _sedeService: SedeService
    ) {
        this.sede = new Sede();
    }

    public abrir() {
        this.modalRegistroSede.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.modalRegistroSede.emit({ action: "modal", params: ['close'] });
    }

}