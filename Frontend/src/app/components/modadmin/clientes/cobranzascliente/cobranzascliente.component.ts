import { Component, Input, OnDestroy } from "@angular/core";
import { ClienteService } from "../../../../services/cliente.service";
import { Cliente } from "../../../../models/Cliente";
import { Cobranza } from "../../../../models/Cobranza";
import { CobranzaHistorica } from "../../../../models/CobranzaHistorica";
import { CancelarContratoComponent } from "../../grupos/cancelarcontrato/cancelarcontrato.component";
import { Contrato } from "../../../../models/Contrato";
import { PagoCobranzaComponent } from "../../cobranzas/pagocobranza/pagocobranza.component";
import { PusherService } from "../../../../services/pusher.service";
import { Pago } from "../../../../models/Pago";

@Component({
    selector: 'cobranzascliente',
    templateUrl: 'cobranzascliente.html',
    styleUrls: ['cobranzascliente.css']
})
export class CobranzasClienteComponent implements OnDestroy {

    // Componente para cancelar contratos
    @Input("cancelarContratoComponent")
    public cancelarContratoComponent: CancelarContratoComponent;

    // Componente para pago de cobranzas
    @Input("pagoCobranzaComponent")
    public pagoCobranzaComponent: PagoCobranzaComponent;

    // El cliente actual
    public cliente: Cliente;

    // Lista de cobranzas
    public cobranzas: Cobranza[];

    // Lista de cobranzas historicas
    public cobranzasHistoricas: CobranzaHistorica[];

    // Canal de cobranzas
    private cobranzaChannel: any;

    // Canal de cobranzas historicas
    private cobranzaHistoricaChannel: any;

    // Canal de pagos
    private pagoChannel: any;

    public constructor(
        private _clienteService: ClienteService,
        private _pusherService: PusherService
    ) {

        this.cobranzaChannel = this._pusherService.getPusher().subscribe('cobranza');
        this.cobranzaChannel.bind("create", data => { this.onCreateCobranza(new Cobranza(data)) });
        this.cobranzaChannel.bind("update", data => { this.onUpdateCobranza(new Cobranza(data)) });
        this.cobranzaChannel.bind("delete", data => { this.onDeleteCobranza(data) });

        this.cobranzaHistoricaChannel = this._pusherService.getPusher().subscribe('cobranza_historica');
        this.cobranzaHistoricaChannel.bind("create", data => { this.onCreateCobranzaHistorica(new CobranzaHistorica(data)) });
        this.cobranzaHistoricaChannel.bind("update", data => { this.onUpdateCobranzaHistorica(new CobranzaHistorica(data)) });

        this.pagoChannel = this._pusherService.getPusher().subscribe('pago');
        this.pagoChannel.bind("create", data => { this.onCreatePago(new Pago(data)) });
        this.pagoChannel.bind("update", data => { this.onUpdatePago(new Pago(data)) });
        this.pagoChannel.bind("delete", data => { this.onDeletePago(data) });

    }

    public ngOnDestroy() {
        if (this.cobranzaChannel) {
            this.cobranzaChannel.unbind();
        }
        if (this.cobranzaHistoricaChannel) {
            this.cobranzaHistoricaChannel.unbind();
        }
        if (this.pagoChannel) {
            this.pagoChannel.unbind();
        }
    }

    public onCreateCobranza(cobranza: Cobranza) {
        // Si se ha recibido la lista de contratos, y la lista de cobranzas del grupo
        if (this.cobranzas) {
            // Si la cobranza es para el cliente
            if ( cobranza.cobranza_historica.contrato_historico.tgf_cliente_id == this.cliente.id ) {
                this.cobranzas.unshift(cobranza);
            }
        }
    }

    public onUpdateCobranza(cobranza: Cobranza) {
        // Si se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                // Si las cobranzas coinciden IDs
                if (this.cobranzas[i].id == cobranza.id) {
                    // Reemplazar cobranza
                    this.cobranzas[i] = cobranza;
                    break;
                }
            }
        }
    }

    public onDeleteCobranza(id: number) {
        // Si se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                // Si las cobranzas coinciden ids
                if (this.cobranzas[i].id == id) {
                    // Eliminar cobranza
                    this.cobranzas.splice(i, 1);
                    break;
                }
            }
        }
    }

    public onCreatePago(pago: Pago) {
        // Si se ha recibido la lista de cobrazas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                let cobranza: Cobranza = this.cobranzas[i];

                // Si el pago pertenece a la cobranza
                if (pago.tgf_cobranza_historica_id == cobranza.cobranza_historica.id) {
                    // Asignar pago a la cobranza
                    cobranza.cobranza_historica.pago = pago;
                    break;
                }
            }
        }

        // Si se ha recibido la lista de cobranzas historicas
        if (this.cobranzasHistoricas) {
            // Por cada cobranza historica
            for (let i = 0; i < this.cobranzasHistoricas.length; i++) {
                let cobranzaHistorica: CobranzaHistorica = this.cobranzasHistoricas[i];

                // Si el pago pertenece a la cobranza historica
                if (pago.tgf_cobranza_historica_id == cobranzaHistorica.id) {
                    // Asignar pago a la cobranza historica
                    cobranzaHistorica.pago = pago;
                    break;
                }
            }
        }
    }

    public onUpdatePago(pago: Pago) {
        // Si se ha recibido la lista de cobrazas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                let cobranza: Cobranza = this.cobranzas[i];

                // Si el pago pertenece a la cobranza
                if (pago.tgf_cobranza_historica_id == cobranza.cobranza_historica.id) {
                    // Asignar pago a la cobranza
                    cobranza.cobranza_historica.pago = pago;
                    break;
                }
            }
        }
    }

    public onDeletePago(id: number) {
        // Si se ha recibido la lista de cobrazas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                let cobranza: Cobranza = this.cobranzas[i];

                // Si la cobranza tiene un pago
                if (cobranza.cobranza_historica.pago) {
                    // Si coincide la id del pago con el id recibido
                    if (cobranza.cobranza_historica.pago.id == id) {
                        // Eliminar el pago
                        cobranza.cobranza_historica.pago = null;
                    }
                }
            }
        }
    }

    public onCreateCobranzaHistorica(cobranzaHistorica: CobranzaHistorica) {
        // Si se ha recibido la lista de cobranzas historicas
        if (this.cobranzasHistoricas) {
            // Si la cobranza historica pertenece al cliente
            if (cobranzaHistorica.contrato_historico.tgf_cliente_id == this.cliente.id) {
                // Agregar a lista de cobranzas historicas
                this.cobranzasHistoricas.unshift(cobranzaHistorica);
            }
        }
    }

    public onUpdateCobranzaHistorica(cobranzaHistorica: CobranzaHistorica) {
        // Si se ha recibido la lista de cobranzas historicas
        if (this.cobranzasHistoricas) {
            // Por cada cobranza historica
            for (let i = 0; i < this.cobranzasHistoricas.length; i++) {
                // Si coinciden los IDs
                if (this.cobranzasHistoricas[i].id == cobranzaHistorica.id) {
                    // Reemplazar cobranza historica
                    this.cobranzasHistoricas[i] = cobranzaHistorica;
                    break;
                }
            }
        }

        // Si se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                let cobranza: Cobranza = this.cobranzas[i];

                // Si coinciden los IDs
                if (cobranza.cobranza_historica.id == cobranzaHistorica.id) {
                    // Reemplazar cobranza historica
                    cobranza.cobranza_historica = cobranzaHistorica;
                    break;
                }
            }
        }
    }

    @Input("cliente")
    public set setCliente(cliente: Cliente) {
        // Guardar cliente
        this.cliente = cliente;

        // Solicitar cobranzas del cliente
        this._clienteService.getCobranzas(this.cliente).subscribe(
            Response => {
                // Guardar lista de cobranzas
                this.cobranzas = Response;
            }
        );

        // Solicitar cobranzas historicas del cliente
        this._clienteService.getCobranzasHistoricas(this.cliente).subscribe(
            Response => {
                // Guardar lista de cobranzas historicas
                this.cobranzasHistoricas = Response;
            }
        );
    }

    public abrirCobranza(cobranza: Cobranza) {
        // Al abrir el componente de pago de una cobranza
        this.pagoCobranzaComponent.abrir(cobranza);
    }

    public deleteContrato(contrato: Contrato) {
        this.cancelarContratoComponent.abrir(contrato);
    }

}