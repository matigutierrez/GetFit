import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CobranzaService } from '../../../../services/cobranza.service';
import { PusherService } from '../../../../services/pusher.service';
import { Cobranza } from '../../../../models/Cobranza';
import { PagoCobranzaComponent } from '../pagocobranza/pagocobranza.component';
import { RegistroCobranzaComponent } from '../registrocobranza/registrocobranza.component';
import { Pago } from '../../../../models/Pago';

declare var Materialize: any;

@Component({
    selector: 'cobranzas',
    templateUrl: 'cobranzas.html'
})
export class CobranzasComponent implements OnDestroy {

    // Componente para pago de cobranzas
    @ViewChild(PagoCobranzaComponent)
    public pagoCobranzaComponent: PagoCobranzaComponent;

    // Componente para registro de cobranzas
    @ViewChild(RegistroCobranzaComponent)
    public registroCobranzaComponent: RegistroCobranzaComponent;

    // Lista de cobranzas
    public cobranzas: Cobranza[];

    // Pagina actual del componente
    public p: number = 1;

    // Canal de pusher para cobranzas
    private cobranzaChannel: any;

    // Canal de pusher para pagos
    private pagoChannel: any;

    public constructor(
        private _cobranzaService: CobranzaService,
        private _pusherService: PusherService
    ) {

        // Solicitar cobranzas
        this._cobranzaService.query().subscribe(
            Response => {
                this.cobranzas = Response;
            }
        );

        this.cobranzaChannel = this._pusherService.getPusher().subscribe("cobranza");
        this.cobranzaChannel.bind("create", data => { this.onCreate(data) });
        this.cobranzaChannel.bind("update", data => { this.onUpdate(data) });
        this.cobranzaChannel.bind("delete", data => { this.onDelete(data) });

        this.pagoChannel = this._pusherService.getPusher().subscribe("pago");
        this.pagoChannel.bind("create", data => { this.onCreatePago(data) });
        this.pagoChannel.bind("update", data => { this.onUpdatePago(data) });
        this.pagoChannel.bind("delete", data => { this.onDeletePago(data) });

    }

    public ngOnDestroy() {
        if (this.cobranzaChannel) {
            this.cobranzaChannel.unbind();
        }
        if (this.pagoChannel) {
            this.pagoChannel.unbind();
        }
    }

    public registrar(): void {
        this.registroCobranzaComponent.abrir();
    }

    public abrirCobranza(cobranza: Cobranza): void {
        this.pagoCobranzaComponent.abrir(cobranza);
    }

    public deleteCobranza(cobranza: Cobranza): void {
        this._cobranzaService.delete(cobranza.id).subscribe(null);
    }

    public onCreatePago(pago: Pago) {
        // Una vez se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                let cobranza: Cobranza = this.cobranzas[i];
                // Verificar que coincidan ids
                if (pago.tgf_cobranza_historica_id == cobranza.cobranza_historica.id) {
                    // Asignar pago a cobranza
                    cobranza.cobranza_historica.pago = pago;
                    break;
                }
            }
        }
    }

    public onUpdatePago(pago: Pago) {
        // Una vez se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                let cobranza: Cobranza = this.cobranzas[i];
                // Verificar que coincidan ids
                if (pago.tgf_cobranza_historica_id == cobranza.cobranza_historica.id) {
                    // Asignar pago a cobranza
                    cobranza.cobranza_historica.pago = pago;
                    break;
                }
            }
        }
    }

    public onDeletePago(id: number) {
        // Una vez se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                let cobranza: Cobranza = this.cobranzas[i];
                let pago: Pago = cobranza.cobranza_historica.pago;
                // Si hay pago, y los ids coinciden
                if (pago && pago.id == id) {
                    // Eliminar el pago
                    cobranza.cobranza_historica.pago = null;
                    break;
                }
            }
        }
    }

    public onCreate(cobranza: Cobranza): void {
        // Si se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Agregar cobranza
            this.cobranzas.unshift(cobranza);

            // Indicar que se ha registrado la cobranza
            Materialize.toast("Se ha registrado una cobranza por $" + cobranza.cobranza_historica.cob_monto + " al sistema", 3000);
        }
    }

    public onUpdate(cobranza: Cobranza): void {
        // Una vez se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                // Comparar ids
                if (this.cobranzas[i].id == cobranza.id) {
                    // Asignar cobranza
                    this.cobranzas[i] = cobranza;
                    break;
                }
            }
        }
    }

    public onDelete(id: number): void {
        // Una vez se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                // Comparar ids
                if (this.cobranzas[i].id == id) {
                    // Eliminar cobranza
                    this.cobranzas.splice(i, 1);
                    break;
                }
            }
        }
    }

}