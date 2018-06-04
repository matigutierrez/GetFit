import { Component, Input, OnDestroy, ViewChild } from "@angular/core";
import { Plan } from "../../../../models/Plan";
import { Cobranza } from "../../../../models/Cobranza";
import { CobranzaService } from "../../../../services/cobranza.service";
import { PlanService } from "../../../../services/plan.service";
import { Contrato } from "../../../../models/Contrato";
import { PusherService } from "../../../../services/pusher.service";
import { Pago } from "../../../../models/Pago";
import { PagoCobranzaComponent } from "../../cobranzas/pagocobranza/pagocobranza.component";
import { RegistroCobranzaPlanComponent } from "../registrocobranzaplan/registrocobranzaplan.component";
import { ContratoService } from "../../../../services/contrato.service";


@Component({
    selector: 'cobranzasplan',
    templateUrl: 'cobranzasplan.html'
})
export class CobranzasPlanComponent implements OnDestroy {

    // Componente para pago de cobranzas
    @Input("pagoCobranzaComponent")
    public pagoCobranzaComponent: PagoCobranzaComponent;

    // Componente para registro de cobranzas
    @Input("registroCobranzaPlanComponent")
    public registroCobranzaPlanComponent: RegistroCobranzaPlanComponent;

    // Plan
    public plan: Plan;

    // Lista de cobranzas
    public cobranzas: Cobranza[];

    // Lista de contratos
    public contratos: Contrato[];

    // Canal de contratos
    private contratoChannel: any;

    // Canal de cobranzas
    private cobranzaChannel: any;

    // Canal de pagos
    private pagoChannel: any;

    // Pagina actual de cobranzas
    public p: number = 1;

    public constructor(
        private _planService: PlanService,
        private _cobranzaService: CobranzaService,
        private _contratoService: ContratoService,
        private _pusherService: PusherService
    ) {

        this.contratoChannel = this._pusherService.getPusher().subscribe('contrato');
        this.contratoChannel.bind("create", data => { this.onCreateContrato(data) });
        this.contratoChannel.bind("update", data => { this.onUpdateContrato(data) });
        this.contratoChannel.bind("delete", data => { this.onDeleteContrato(data) });

        this.cobranzaChannel = this._pusherService.getPusher().subscribe('cobranza');
        this.cobranzaChannel.bind("create", data => { this.onCreateCobranza(data) });
        this.cobranzaChannel.bind("update", data => { this.onUpdateCobranza(data) });
        this.cobranzaChannel.bind("delete", data => { this.onDeleteCobranza(data) });

        this.pagoChannel = this._pusherService.getPusher().subscribe('pago');
        this.pagoChannel.bind("create", data => { this.onCreatePago(data) });
        this.pagoChannel.bind("update", data => { this.onUpdatePago(data) });
        this.pagoChannel.bind("delete", data => { this.onDeletePago(data) });

    }

    public ngOnDestroy() {
        if (this.contratoChannel) {
            this.contratoChannel.unbind();
        }
        if (this.cobranzaChannel) {
            this.cobranzaChannel.unbind();
        }
        if (this.pagoChannel) {
            this.pagoChannel.unbind();
        }
    }

    public onCreateContrato(contrato: Contrato) {
        // Si se ha recibido la lista de contratos
        if (this.contratos) {
            // Agregar contrato a la lista de contratos
            this.contratos.unshift(contrato);
        }
    }

    public onUpdateContrato(contrato: Contrato) {
        // Si se ha recibido la lista de contratos
        if (this.contratos) {
            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {
                // Si coinciden ids
                if (this.contratos[i].id == contrato.id) {
                    // Reemplazar contrato
                    this.contratos[i] = contrato;
                    break;
                }
            }
        }
    }

    public onDeleteContrato(id: number) {
        // Si se ha recibido la lista de contratos
        if (this.contratos) {
            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {
                // Si coinciden ids
                if (this.contratos[i].id == id) {
                    // Eliminar contrato
                    this.contratos.splice(i, 1);
                    break;
                }
            }
        }

        // Si se ha recibido la lista de cobranzas
        if (this.cobranzas) {
            // Por cada cobranza
            for (let i = 0; i < this.cobranzas.length; i++) {
                // Si la cobranza pertenece al contrato
                if (this.cobranzas[i].tgf_contrato_id == id) {
                    // Eliminar cobranza
                    this.cobranzas.splice(i, 1);

                    // Retroceder el contador
                    i--;
                }
            }
        }
    }

    public onCreateCobranza(cobranza: Cobranza) {
        // Si se ha recibido la lista de cobranzas del plan
        if (this.cobranzas) {
            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {
                let contrato: Contrato = this.contratos[i];

                // Si la cobranza pertenece al contrato
                if (cobranza.tgf_contrato_id == contrato.id) {
                    // Insertar a la lista de cobranzas
                    this.cobranzas.unshift(cobranza);

                    // Asignar contrato a cobranza
                    cobranza.contrato = contrato;
                }
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
                if (pago.tgf_cobranza_id == cobranza.id) {
                    // Asignar pago a la cobranza
                    cobranza.cobranza_historica.pago = pago;
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
                if (pago.tgf_cobranza_id == cobranza.id) {
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

    @Input("plan")
    public set setPlan(plan: Plan) {
        // Guardar el plan
        this.plan = plan;

        // Solicitar lista de contratos
        this._planService.getContratosCobranzas(plan).subscribe(
            Response => {
                // Guardar contratos
                this.contratos = Response;

                // Inicializar cobranzas
                this.cobranzas = [];

                // Por cada contrato
                for (let i = 0; i < this.contratos.length; i++) {
                    let contrato: Contrato = this.contratos[i];
                    let cobranzas: Cobranza[] = contrato.cobranzas;

                    // Por cada cobranza
                    for (let j = 0; j < cobranzas.length; j++) {

                        let cobranza: Cobranza = cobranzas[j];

                        // Asignar contrato a cobranza
                        cobranza.contrato = contrato;

                        // Agregar a la lista de cobranzas
                        this.cobranzas.push(cobranza);
                    }
                }
            }
        );

    }

    public registrar(): void {
        this.registroCobranzaPlanComponent.abrir(this.plan);
    }

    public abrirCobranza(cobranza: Cobranza): void {
        this.pagoCobranzaComponent.abrir(cobranza);
    }

    public deleteCobranza(id: number): void {
        this._cobranzaService.delete(id).subscribe(null);
    }

    public deleteContrato(id: number): void {
        this._contratoService.delete(id).subscribe(null);
    }

}