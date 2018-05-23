import { Component, Input, OnDestroy } from "@angular/core";
import { PlanService } from "../../../../services/plan.service";
import { Cliente } from "../../../../models/Cliente";
import { Plan } from "../../../../models/Plan";
import { Contrato } from "../../../../models/Contrato";
import { ContratoService } from "../../../../services/contrato.service";
import { PusherService } from "../../../../services/pusher.service";

@Component({
    selector: 'clientesplan',
    templateUrl: 'clientesplan.html',
    styleUrls: ['clientesplan.css'],
    providers: [PlanService]
})
export class ClientesPlanComponent implements OnDestroy {

    // Lista de contratos
    public contratos: Contrato[];

    // Plan actual
    public plan: Plan;

    // Numero de página
    public p: number = 1;

    private contratoChannel: any;
    
    public constructor(
        private _planService: PlanService,
        private _contratoService: ContratoService,
        private _pusherService: PusherService
    ) {

        this.contratoChannel = this._pusherService.getPusher().subscribe("contrato");
        this.contratoChannel.bind("create", data => { this.onCreate(data) });
        this.contratoChannel.bind("update", data => { this.onUpdate(data) });
        this.contratoChannel.bind("delete", data => { this.onDelete(data) });

    }

    public ngOnDestroy() {
        if ( this.contratoChannel ) {
            this.contratoChannel.unbind();
        }
    }

    public deleteContrato(contrato: Contrato) {
        this._contratoService.delete(contrato.id).subscribe(null);
    }

    public onCreate(contrato: Contrato) {
        // Si hay contratos
        if ( this.contratos ) {

            // Si el contrato pertenece al plan
            if ( contrato.tgf_plan_id == this.plan.id ) {

                // Agregar contrato a la lista de contratos
                this.contratos.unshift(contrato);

            }

        }
    }

    public onUpdate(contrato: Contrato) {
        // Si hay contratos
        if ( this.contratos ) {

            // Si el contrato pertenece al plan
            if ( contrato.tgf_plan_id == this.plan.id ) {

                // Por cada contrato
                for (let i = 0; i < this.contratos.length; i++) {

                    // Comparar ids
                    if ( this.contratos[i].id == contrato.id ) {

                        // Reemplazar contrato
                        this.contratos[i] = contrato;
                        break;

                    }

                }

            }
        }

    }

    public onDelete(id: number) {
        // Si hay contratos
        if ( this.contratos ) {

            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {

                // Comaparar ids
                if ( this.contratos[i].id == id ) {

                    // Eliminar contrato
                    this.contratos.splice(i, 1);
                    break;

                }

            }

        }

    }

    @Input("plan")
    set setPlan(plan:Plan) {

        // Si hay plan
        if ( plan != null && plan.id ) {

            // Guardar el plan
            this.plan = plan;

            // Obtener los contratos del plan
            this._planService.getContratos(this.plan).subscribe(
                Response => {
                    this.contratos = Response;
                }
            );

        }

    }

}