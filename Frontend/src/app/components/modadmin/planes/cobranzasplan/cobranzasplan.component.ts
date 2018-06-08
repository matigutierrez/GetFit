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
import { CancelarContratoComponent } from "../cancelarcontrato/cancelarcontrato.component";
import { CobranzaHistorica } from "../../../../models/CobranzaHistorica";
import { ContratoHistorico } from "../../../../models/ContratoHistorico";


@Component({
    selector: 'cobranzasplan',
    templateUrl: 'cobranzasplan.html',
    styleUrls: ['cobranzasplan.css']
})
export class CobranzasPlanComponent implements OnDestroy {

    // Componente para pago de cobranzas
    @Input("pagoCobranzaComponent")
    public pagoCobranzaComponent: PagoCobranzaComponent;

    // Componente para registro de cobranzas
    @Input("registroCobranzaPlanComponent")
    public registroCobranzaPlanComponent: RegistroCobranzaPlanComponent;

    // Componente para cancelar contratos
    @Input("cancelarContratoComponent")
    public cancelarContratoComponent: CancelarContratoComponent;

    // Plan
    public plan: Plan;

    // Lista de cobranzas
    public cobranzas: Cobranza[];

    // Lista de cobranzas historicas
    public cobranzasHistoricas: CobranzaHistorica[];

    // Lista de contratos
    public contratos: Contrato[];

    // Lista de contratos historicos
    public contratosHistoricos: ContratoHistorico[];

    // Canal de contratos
    private contratoChannel: any;

    // Canal de contratos historicos
    private contratoHistoricoChannel: any;

    // Canal de cobranzas
    private cobranzaChannel: any;

    // Canal de cobranzas historicas
    private cobranzaHistoricaChannel: any;

    // Canal de pagos
    private pagoChannel: any;

    // Pagina actual de cobranzas
    public p1: number = 1;
    public p2: number = 1;

    public constructor(
        private _planService: PlanService,
        private _cobranzaService: CobranzaService,
        private _contratoService: ContratoService,
        private _pusherService: PusherService
    ) {

        this.contratoChannel = this._pusherService.getPusher().subscribe('contrato');
        this.contratoChannel.bind("create", data => { this.onCreateContrato(new Contrato(data)) });
        this.contratoChannel.bind("update", data => { this.onUpdateContrato(new Contrato(data)) });
        this.contratoChannel.bind("delete", data => { this.onDeleteContrato(data) });

        this.contratoHistoricoChannel = this._pusherService.getPusher().subscribe('contrato_historico');
        this.contratoHistoricoChannel.bind("create", data => { this.onCreateContratoHistorico(new ContratoHistorico(data)) });
        this.contratoHistoricoChannel.bind("update", data => { this.onUpdateContratoHistorico(new ContratoHistorico(data)) });

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
        if (this.contratoChannel) {
            this.contratoChannel.unbind();
        }
        if (this.contratoHistoricoChannel) {
            this.contratoHistoricoChannel.unbind();
        }
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
        // Si se ha recibido la lista de contratos, y la lista de cobranzas del plan
        if (this.contratos && this.cobranzas) {
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
            // Si la cobranza historica pertenece al plan
            if (cobranzaHistorica.contrato_historico.tgf_plan_id == this.plan.id) {
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

    public onCreateContratoHistorico(contratoHistorico: ContratoHistorico) {
        // Si se ha recibido la lista de contratos historicos
        if (this.contratosHistoricos) {
            // Si el contrato historico pertenece al plan
            if (contratoHistorico.tgf_plan_id == this.plan.id) {
                // Agregar a la lista de contratos historicos
                this.contratosHistoricos.unshift(contratoHistorico);
            }
        }
    }

    public onUpdateContratoHistorico(contratoHistorico: ContratoHistorico) {
        // Si se ha recibido la lista de contratos historicos
        if (this.contratosHistoricos) {
            // Por cada contrato historico
            for (let i = 0; i < this.contratosHistoricos.length; i++) {
                // Si los IDs coinciden
                if (this.contratosHistoricos[i].id == contratoHistorico.id) {
                    // Reemplazar contrato historico
                    this.contratosHistoricos[i] = contratoHistorico;
                    break;
                }
            }
        }

        // Si se ha recibido la lista de contratos
        if (this.contratos) {
            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {
                let contrato: Contrato = this.contratos[i];

                // Si los IDs coinciden
                if (contrato.contrato_historico.id == contratoHistorico.id) {
                    // Reemplazar contrato historico
                    contrato.contrato_historico = contratoHistorico;
                    break;
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

        this._planService.getContratosCobranzasHistoricas(plan).subscribe(
            Response => {
                // Guardar contratos historicos
                this.contratosHistoricos = Response;

                // Incializar cobranzas historicas
                this.cobranzasHistoricas = [];

                // Por cada contrato historico
                for (let i = 0; i < this.contratosHistoricos.length; i++) {
                    let contratoHistorico: ContratoHistorico = this.contratosHistoricos[i];
                    let cobranzasHistoricas: CobranzaHistorica[] = contratoHistorico.cobranzas_historicas;

                    // Por cada cobranza historica
                    for (let j = 0; j < cobranzasHistoricas.length; j++) {

                        let cobranzaHistorica: CobranzaHistorica = cobranzasHistoricas[j];

                        // Asignar contrato historico a cobranza
                        cobranzaHistorica.contrato_historico = contratoHistorico;

                        // Agregar a lista de cobranzas historicas
                        this.cobranzasHistoricas.push(cobranzaHistorica);

                    }

                }

            }
        );

    }

    public registrar(): void {
        // Al registrar una cobranza
        this.registroCobranzaPlanComponent.abrir(this.plan);
    }

    public abrirCobranza(cobranza: Cobranza): void {
        // Al abrir el componente de pago de una cobranza
        this.pagoCobranzaComponent.abrir(cobranza);
    }

    public deleteCobranza(id: number): void {
        // Al eliminar una cobranza
        this._cobranzaService.delete(id).subscribe(null);
    }

    public deleteContrato(contrato: Contrato): void {
        // Al eliminar un contrato
        this.cancelarContratoComponent.abrir(contrato);
    }

}