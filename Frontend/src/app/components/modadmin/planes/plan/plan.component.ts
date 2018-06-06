import { PlanService } from "../../../../services/plan.service";
import { Component, Input, OnInit, ViewChild, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Plan } from "../../../../models/Plan";
import { HorarioComponent } from "../../../extra/horario/horario.component";
import { HorarioPlanComponent } from "../horarioplan/horarioplan.component";
import { Contrato } from "../../../../models/Contrato";
import { EditarPlanComponent } from "../editarplan/editarplan.component";
import { InscripcionPlanComponent } from "../inscripcionplan/inscripcionplan.component";
import { PagoCobranzaComponent } from "../../cobranzas/pagocobranza/pagocobranza.component";
import { RegistroCobranzaPlanComponent } from "../registrocobranzaplan/registrocobranzaplan.component";
import { CancelarContratoComponent } from "../cancelarcontrato/cancelarcontrato.component";

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

    @ViewChild(PagoCobranzaComponent)
    public pagoCobranzaComponent: PagoCobranzaComponent;

    @ViewChild(RegistroCobranzaPlanComponent)
    public registroCobranzaPlanComponent: RegistroCobranzaPlanComponent;

    @ViewChild(CancelarContratoComponent)
    public cancelarContratoComponent: CancelarContratoComponent;

    // El id del plan
    public id: number;

    // El plan actual
    public plan: Plan;

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