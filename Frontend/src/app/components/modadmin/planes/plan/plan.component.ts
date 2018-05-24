import { PlanService } from "../../../../services/plan.service";
import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Plan } from "../../../../models/Plan";
import { HorarioComponent } from "../../../extra/horario/horario.component";
import { HorarioPlanComponent } from "../horarioplan/horarioplan.component";
import { Contrato } from "../../../../models/Contrato";
import { MaterializeAction } from "angular2-materialize";
import { EditarPlanComponent } from "../editarplan/editarplan.component";
import { InscripcionPlanComponent } from "../inscripcionplan/inscripcionplan.component";

@Component({
    selector: 'plan',
    templateUrl: 'plan.html',
    providers: [PlanService]
})
export class PlanComponent implements OnInit {

    @ViewChild(HorarioPlanComponent)
    public horarioPlan: HorarioPlanComponent;

    @ViewChild(EditarPlanComponent)
    public editarPlan: EditarPlanComponent;

    @ViewChild(InscripcionPlanComponent)
    public inscripcionPlanComponent: InscripcionPlanComponent;

    public id: number;
    public plan: Plan;
    public modalActions = new EventEmitter<string | MaterializeAction>();
    public contratos: Contrato[];

    public constructor(
        private _planService: PlanService,
        private _route: ActivatedRoute
    ) {
        this._route.params.subscribe(params => {
            this.id = params["id"];
        });
    }

    public ngOnInit() {

        this._planService.get(this.id).subscribe(
            Response => {
                this.plan = Response;
            }
        )

    }

}