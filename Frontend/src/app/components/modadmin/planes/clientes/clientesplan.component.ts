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

    // Pagina actual
    public p: number = 0;

    public clientes: Cliente[];

    private _plan: Plan;
    
    public constructor(
        private _planService: PlanService
    ) {

    }

    @Input()
    set plan(plan:Plan) {
        if ( plan != null && plan.id ) {
            this._plan = plan;
            this._planService.getClientes(this._plan).subscribe(
                Response => {
                    this.clientes = Response;
                }
            );
        }
    }

}