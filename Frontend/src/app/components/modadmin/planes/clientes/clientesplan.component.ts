import { Component, Input } from "@angular/core";
import { PlanService } from "../../../../services/plan.service";
import { Cliente } from "../../../../models/Cliente";
import { Plan } from "../../../../models/Plan";

@Component({
    selector: 'clientesplan',
    templateUrl: 'clientesplan.html',
    providers: [PlanService]
})
export class ClientesPlanComponent {

    // Lista de clientes
    public clientes: Cliente[] = [];

    // Plan actual
    public plan: Plan;

    // Numero de página
    public p: number = 1;
    
    public constructor(
        private _planService: PlanService
    ) {

    }

    @Input("plan")
    set setPlan(plan:Plan) {

        // Si hay plan
        if ( plan != null && plan.id ) {

            // Obtener los clientes del plan
            this.plan = plan;
            this._planService.getClientes(this.plan).subscribe(
                Response => {
                    this.clientes = Response;
                }
            );

        }

    }

}