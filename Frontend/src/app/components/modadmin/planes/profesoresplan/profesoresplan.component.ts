import { Component, Input } from "@angular/core";
import { Plan } from "../../../../models/Plan";
import { ProfesorService } from "../../../../services/profesor.service";
import { Profesor } from "../../../../models/Profesor";
import { PlanService } from "../../../../services/plan.service";
import { PusherService } from "../../../../services/pusher.service";

@Component({
    selector: 'profesoresplan',
    templateUrl: 'profesoresplan.html',
    providers: [PlanService, ProfesorService, PusherService]
})
export class ProfesoresPlanComponent {

    // Plan del componente
    public plan: Plan;

    // Profesores del plan
    public profesores: Profesor[];

    // Canal de pusher
    private channel: any;

    public constructor(
        private _planService: PlanService,
        private _profesorService: ProfesorService,
        private _pusherService: PusherService
    ) {

    }

    @Input("plan")
    public set setPlan(plan: Plan) {
        // Fijar el plan
        this.plan = plan;

        // Obtener profesores del plan
        this._planService.getProfesores(this.plan).subscribe(
            Response => {

                // Guardar profesores
                this.profesores = Response;

            }

        )
        
    }

}