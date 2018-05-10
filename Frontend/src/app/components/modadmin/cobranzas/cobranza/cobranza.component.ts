import { Component, EventEmitter } from "@angular/core";
import { CobranzaService } from "../../../../services/cobranza.service";
import { MaterializeAction } from "angular2-materialize";
import { Cobranza } from "../../../../models/Cobranza";

@Component({
    selector: 'cobranza',
    templateUrl: 'cobranza.html',
    providers: [CobranzaService]
})
export class CobranzaComponent {

    public modal = new EventEmitter<string|MaterializeAction>();
    public cobranza: Cobranza;

    public constructor(
        private _cobranzaService: CobranzaService
    ) {

    }

    public abrir(cobranza:Cobranza): void {
        this.cobranza = cobranza;
        this.modal.emit({ action:"modal", params:['open'] });
    }

    public cerrar(): void {
        this.modal.emit({ action:"modal", params:['close'] });
    }

    public onSubmit(): void {
        
    }

}