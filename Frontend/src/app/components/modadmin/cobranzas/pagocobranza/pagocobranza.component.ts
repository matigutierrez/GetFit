import { Component, EventEmitter, Output } from "@angular/core";
import { CobranzaService } from "../../../../services/cobranza.service";
import { MaterializeAction } from "angular2-materialize";
import { Cobranza } from "../../../../models/Cobranza";
import { MetodoPagoService } from "../../../../services/metodopago.service";
import { MetodoPago } from "../../../../models/MetodoPago";

@Component({
    selector: 'pagocobranza',
    templateUrl: 'pagocobranza.html',
    providers: [CobranzaService, MetodoPagoService]
})
export class PagoCobranzaComponent {

    public modal = new EventEmitter<string|MaterializeAction>();
    public cobranza: Cobranza;

    public metodosPago: MetodoPago[];

    // Metodo de pago seleccionado
    public metodoPago: MetodoPago;

    public constructor(
        private _cobranzaService: CobranzaService,
        private _metodoPagoService: MetodoPagoService
    ) {
        this._metodoPagoService.query().subscribe(
            Response => {
                this.metodosPago = Response;
            }
        );
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

    public seleccionarMetodo(event: any) {
        // Para cada metodo de pago
        for (let i = 0; i < this.metodosPago.length; i++) {
            let metodoPago: MetodoPago = this.metodosPago[i];

            // Seleccionar el metodo de pago que corresponda con su ID
            if ( metodoPago.id == event.target.value ) {
                this.metodoPago = metodoPago;
            }
        }
    }

}