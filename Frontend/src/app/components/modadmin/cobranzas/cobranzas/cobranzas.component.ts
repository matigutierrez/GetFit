import { Component, EventEmitter, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CobranzaService } from '../../../../services/cobranza.service';
import { PusherService } from '../../../../services/pusher.service';
import { Cobranza } from '../../../../models/Cobranza';
import { PagoCobranzaComponent } from '../pagocobranza/pagocobranza.component';
import { RegistroCobranzaComponent } from '../registrocobranza/registrocobranza.component';
import { Pago } from '../../../../models/Pago';

@Component({
    selector: 'cobranzas',
    templateUrl: 'cobranzas.html'
})
export class CobranzasComponent implements OnDestroy {

    @ViewChild(PagoCobranzaComponent)
    public pagoCobranzaComponent: PagoCobranzaComponent;

    @ViewChild(RegistroCobranzaComponent)
    public registroCobranzaComponent: RegistroCobranzaComponent;

    public cobranzas: Cobranza[];
    public p: number = 1;

    private cobranzaChannel: any;
    private pagoChannel: any;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
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

    public registrar(): void {
        this.registroCobranzaComponent.abrir();
    }

    public abrirCobranza(cobranza: Cobranza): void {
        this.pagoCobranzaComponent.abrir(cobranza);
    }

    public deleteCobranza(id: number): void {
        this._cobranzaService.delete(id).subscribe(null);
    }

    public onCreate(cobranza: Cobranza): void {
        // Si se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Agregar cobranza
            this.cobranzas.unshift(cobranza);
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