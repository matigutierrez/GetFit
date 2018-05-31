import { Component, EventEmitter } from "@angular/core";
import { Plan } from "../../../../models/Plan";
import { ContratoService } from "../../../../services/contrato.service";
import { MaterializeAction } from "angular2-materialize";
import { SolicitudPlanService } from "../../../../services/solicitudplan.service";

@Component({
    selector: 'solicitarplan',
    templateUrl: 'solicitarplan.html'
})
export class SolicitarPlanComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // El plan a solicitar
    public plan: Plan;

    // Indicar si el plan ya habia sido contratado
    public contratado: boolean;

    // Indicar si el plan ya habia sido solicitado
    public solicitado: boolean;

    // Indicar si se puede mostrar la pregunta por defecto
    public ok: boolean;

    // Indicar si se está solicitando
    public solicitando: boolean;

    public constructor(
        private _contratoService: ContratoService,
        private _solicitudPlanService: SolicitudPlanService
    ) {

    }

    public abrir(plan: Plan) {
        // Al abrir el modal
        this.plan = plan;

        // Resetear variables
        this.contratado = false;
        this.solicitado = false;
        this.ok = false;
        this.solicitando = false;

        // Verificar que no haya contrato actualmente
        this._contratoService.findToken(this.plan.id).subscribe(
            Response => {
                // Indicar si el plan ya había sido contratado
                this.contratado = Response != null;

                // Verificar que no haya solicitud
                this._solicitudPlanService.findToken(this.plan.id).subscribe(
                    Response => {
                        // Indicar si el plan ya había sido solicitado
                        this.solicitado = Response != null;

                        // Indicar si se puede mostrar la pregunta por defecto
                        this.ok = !this.contratado && !this.solicitado;
                    }
                );
                
            }
        );

        this.modal.emit({ action: "modal", params: ['open'] });

    }

    public cerrar() {
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {

        if ( this.plan.pla_solicitable == 0 ) {
            // Si el plan no es solicitable

            // Solo cerrar el modal
            this.cerrar();
        } else if ( this.contratado ) {
            // Si el plan ya había sido contratado

            // Solo cerrar el modal
            this.cerrar();
        } else if ( this.solicitado ) {
            // Si el plan ya había sido solicitando

            // Solo cerrar el modal
            this.cerrar();
        } else {
            // Cualquier otro caso, verificar que no haya solicitud
            this._solicitudPlanService.findToken(this.plan.id).subscribe(
                Response => {

                    if ( Response == null ) {
                        // Indicar que se está solicitando el plan
                        this.solicitando = true;

                        // No hay solicitud de plan, solicitar plan
                        this._solicitudPlanService.solicitar(this.plan.id).subscribe(
                            Response => {
                                // Dejar de indicar que se está solicitando el plan
                                this.solicitando = false;

                                // Solicitud realizada, cerrar modal
                                this.cerrar();
                            }
                        )
                    } else {
                        // Ya había solicitud de plan, cerrar modal
                        this.cerrar();
                    }

                }
            );
        }

    }

}