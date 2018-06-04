import { Component, Input, OnDestroy, ViewChild } from "@angular/core";
import { PlanService } from "../../../../services/plan.service";
import { Cliente } from "../../../../models/Cliente";
import { Plan } from "../../../../models/Plan";
import { Contrato } from "../../../../models/Contrato";
import { ContratoService } from "../../../../services/contrato.service";
import { PusherService } from "../../../../services/pusher.service";
import { InscripcionPlanComponent } from "../inscripcionplan/inscripcionplan.component";
import { SolicitudPlan } from "../../../../models/SolicitudPlan";
import { SolicitudPlanService } from "../../../../services/solicitudplan.service";
import { Cobranza } from "../../../../models/Cobranza";
import { ContratoHistorico } from "../../../../models/ContratoHistorico";
import { ContratoHistoricoService } from "../../../../services/contratohistorico.service";

@Component({
    selector: 'clientesplan',
    templateUrl: 'clientesplan.html',
    styleUrls: ['clientesplan.css']
})
export class ClientesPlanComponent implements OnDestroy {

    // Componente de inscripción de clientes a un plan
    @Input("inscripcionPlanComponent")
    public inscripcionPlanComponent: InscripcionPlanComponent;

    // Lista de contratos
    public contratos: Contrato[];

    // Lista de solicitudes de planes
    public solicitudes: SolicitudPlan[];

    // Plan actual
    public plan: Plan;

    // Numero de página
    public p1: number = 1;
    public p2: number = 1;

    // Canal de contratos
    private contratoChannel: any;

    // Canal de solicitudes
    private solicitudChannel: any;
    
    public constructor(
        private _planService: PlanService,
        private _contratoService: ContratoService,
        private _contratoHistoricoService: ContratoHistoricoService,
        private _solicitudPlanService: SolicitudPlanService,
        private _pusherService: PusherService
    ) {

        this.contratoChannel = this._pusherService.getPusher().subscribe('contrato');
        this.contratoChannel.bind("create", data => { this.onCreateContrato(data) });
        this.contratoChannel.bind("update", data => { this.onUpdateContrato(data) });
        this.contratoChannel.bind("delete", data => { this.onDeleteContrato(data) });

        this.solicitudChannel = this._pusherService.getPusher().subscribe('solicitudPlan');
        this.solicitudChannel.bind("create", data => { this.onCreateSolicitud(data) });
        this.solicitudChannel.bind("update", data => { this.onUpdateSolicitud(data) });
        this.solicitudChannel.bind("delete", data => { this.onDeleteSolicitud(data) });

    }

    public ngOnDestroy() {
        if ( this.contratoChannel ) {
            this.contratoChannel.unbind();
        }
        if ( this.solicitudChannel ) {
            this.solicitudChannel.unbind();
        }
    }

    public deleteContrato(contrato: Contrato) {
        // Eliminar un contrato
        this._contratoService.delete(contrato.id).subscribe(null);
    }

    public deleteSolicitud(solicitud: SolicitudPlan) {
        // Eliminar una solicitud de plan
        this._solicitudPlanService.delete(solicitud.id).subscribe(null);
    }

    public okSolicitud(solicitud: SolicitudPlan) {
        // Eliminar una solicitud de plan
        this._solicitudPlanService.delete(solicitud.id).subscribe(
            Response => {
                // Crear un contrato historico
                let contratoHistorico: ContratoHistorico = new ContratoHistorico();

                // Fijar cliente y plan
                contratoHistorico.tgf_cliente_id = solicitud.tgf_cliente_id;
                contratoHistorico.tgf_plan_id = solicitud.tgf_plan_id;

                // Guardar contrato
                this._contratoHistoricoService.save(contratoHistorico, null).subscribe(null);
            }
        );
    }

    public onCreateContrato(contrato: Contrato) {
        // Si hay contratos
        if ( this.contratos ) {

            // Si el contrato pertenece al plan
            if ( contrato.tgf_plan_id == this.plan.id ) {

                // Agregar contrato a la lista de contratos
                this.contratos.unshift(contrato);

            }

        }
    }

    public onUpdateContrato(contrato: Contrato) {
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

    public onDeleteContrato(id: number) {
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

    public onCreateSolicitud(solicitud: SolicitudPlan) {
        // Si hay solicitudes
        if ( this.solicitudes ) {

            // Si la solicitud pertenece al plan
            if ( solicitud.tgf_plan_id == this.plan.id ) {

                // Agregar contrato a la lista de contratos
                this.solicitudes.unshift(solicitud);

            }

        }
    }

    public onUpdateSolicitud(solicitud: SolicitudPlan) {
        // Si hay solicitudes
        if ( this.solicitudes ) {

            // Si la solicitud pertenece al plan
            if ( solicitud.tgf_plan_id == this.plan.id ) {

                // Por cada solicitud
                for (let i = 0; i < this.solicitudes.length; i++) {

                    // Comparar ids
                    if ( this.solicitudes[i].id == solicitud.id ) {

                        // Reemplazar solicitud
                        this.solicitudes[i] = solicitud;
                        break;

                    }

                }

            }
        }

    }

    public onDeleteSolicitud(id: number) {
        // Si hay solicitudes
        if ( this.solicitudes ) {

            // Por cada solicitud
            for (let i = 0; i < this.solicitudes.length; i++) {

                // Comaparar ids
                if ( this.solicitudes[i].id == id ) {

                    // Eliminar solicitud
                    this.solicitudes.splice(i, 1);
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

            // Obtener las solicitudes del plan
            this._planService.getSolicitudes(this.plan).subscribe(
                Response => {
                    this.solicitudes = Response;
                }
            );

        }

    }

}