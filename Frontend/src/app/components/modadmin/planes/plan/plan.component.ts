import { PlanService } from "../../../../services/plan.service";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Plan } from "../../../../models/Plan";
import { HorarioComponent } from "../../../extra/horario/horario.component";

@Component({
    selector: 'plan',
    templateUrl: 'plan.html',
    providers: [PlanService]
})
export class PlanComponent implements OnInit {

    @ViewChild(HorarioComponent)
    public horario: HorarioComponent;

    public id: number;
    public plan: Plan = new Plan();

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

    public abrirHorarios() {
    
        this.horario.abrir([this.plan]);
    
      }

}