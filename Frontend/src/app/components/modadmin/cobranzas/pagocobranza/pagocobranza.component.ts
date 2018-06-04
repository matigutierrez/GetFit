import { Component, EventEmitter, Output } from "@angular/core";
import { CobranzaService } from "../../../../services/cobranza.service";
import { MaterializeAction } from "angular2-materialize";
import { Cobranza } from "../../../../models/Cobranza";
import { MetodoPagoService } from "../../../../services/metodopago.service";
import { MetodoPago } from "../../../../models/MetodoPago";
import { PagoService } from "../../../../services/pago.service";
import { Pago } from "../../../../models/Pago";

@Component({
    selector: 'pagocobranza',
    templateUrl: 'pagocobranza.html',
    providers: [CobranzaService, MetodoPagoService, PagoService]
})
export class PagoCobranzaComponent {

    // Modal del componente
    public modal = new EventEmitter<string|MaterializeAction>();

    // Objeto cobranza
    public cobranza: Cobranza;

    // Lista de metodos de pago
    public metodosPago: MetodoPago[];

    // Metodo de pago seleccionado
    public metodoPago: MetodoPago;

    // Modelo pago (para la vista)
    public pago: Pago = new Pago();

    public constructor(
        private _cobranzaService: CobranzaService,
        private _metodoPagoService: MetodoPagoService,
        private _pagoService: PagoService
    ) {

        // Solicitar todos los metodos de pago disponibles
        this._metodoPagoService.query().subscribe(
            Response => {
                this.metodosPago = Response;
            }
        );

    }

    public abrir(cobranza:Cobranza): void {

        // Guardar cobranza en variable
        this.cobranza = cobranza;

        // Asignar el id de la cobranza al pago
        this.pago.tgf_cobranza_historica_id = this.cobranza.cobranza_historica.id;

        // Abrir modal
        this.modal.emit({ action:"modal", params:['open'] });
    }

    public cerrar(): void {
        this.modal.emit({ action:"modal", params:['close'] });
    }

    public onSubmit(): void {
        // Si se eligió un método de pago
        if ( this.pago.tgf_metodo_pago_id ) {

            // Realizar el pago
            this._pagoService.save(this.pago).subscribe(
                Response => {
                    // Cerrar modal
                    this.cerrar();
                }
            );
        }
    }

}