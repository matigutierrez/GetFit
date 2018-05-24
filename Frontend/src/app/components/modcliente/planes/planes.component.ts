import { Component, ViewChild } from "@angular/core";
import { PlanService } from "../../../services/plan.service";
import { Plan } from "../../../models/Plan";
import { Contrato } from "../../../models/Contrato";
import { HorarioComponent } from "../../extra/horario/horario.component";
import { SolicitudPlan } from "../../../models/SolicitudPlan";
import { ClienteService } from "../../../services/cliente.service";

@Component({
    selector: 'planes',
    templateUrl: 'planes.html'
})
export class PlanesComponent {

    @ViewChild(HorarioComponent)
    public horarioComponent: HorarioComponent;

    // Contratos actuales
    public contratos: Contrato[];

    // Solicitudes actuales
    public solicitudes: SolicitudPlan[];

    // Planes disponibles
    public disponibles: Plan[];

    // Paginas
    public p1: number = 1;
    public p2: number = 1;
    public p3: number = 1;

    public constructor(
        private _planService: PlanService,
        private _clienteService: ClienteService
    ) {

        // Obtener contratos
        this._planService.getContratosToken().subscribe(
            Response => {
                this.contratos = Response;
            }
        )

        // Obtener solicitados
        this._clienteService.getSolicitudesToken().subscribe(
            Response => {
                this.solicitudes = Response;
            }
        );

        // Obtener planes no contratados
        this._planService.getPlanesNoContratados().subscribe(
            Response => {
                this.disponibles = Response;
            }
        );
    }

    public abrirHorarios(plan: Plan) {
        this.horarioComponent.abrir([plan]);
    }

    public solicitar(plan: Plan) {
        
    }

}