import { Component, Input } from "@angular/core";
import { Plan } from "../../../../models/Plan";
import { Cobranza } from "../../../../models/Cobranza";
import { CobranzaService } from "../../../../services/cobranza.service";
import { PlanService } from "../../../../services/plan.service";
import { Contrato } from "../../../../models/Contrato";
import { PusherService } from "../../../../services/pusher.service";
import { Pago } from "../../../../models/Pago";


@Component({
    selector: 'cobranzasplan',
    templateUrl: 'cobranzasplan.html'
})
export class CobranzasPlanComponent {

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

    public constructor(
        private _planService: PlanService,
        private _cobranzaService: CobranzaService,
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

    public onCreateContrato(contrato: Contrato) {

    }

    public onUpdateContrato(contrato: Contrato) {

    }

    public onDeleteContrato(id: number) {

    }

    public onCreateCobranza(cobranza: Cobranza) {

    }

    public onUpdateCobranza(cobranza: Cobranza) {

    }

    public onDeleteCobranza(id: number) {

    }

    public onCreatePago(pago: Pago) {

    }

    public onUpdatePago(pago: Pago) {

    }

    public onDeletePago(id: number) {
        
    }

    @Input("plan")
    public set setPlan(plan: Plan) {
        // Guardar el plan
        this.plan = plan;

        // Solicitar lista de cobranzas
        this._planService.getContratos(plan).subscribe(
            Response => {
                this.contratos = Response;
            }
        );

    }

}