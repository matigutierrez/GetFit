import { Cliente } from "./Cliente";
import { Plan } from "./Plan";

export class SolicitudPlan {

    public id: number;
    public tgf_plan_id: number;
    public tgf_cliente_id: number;
    public fecha_solicitud: string;

    public plan: Plan;
    public cliente: Cliente;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.plan) { this.plan = new Plan(this.plan) };
        if (this.cliente) { this.cliente = new Cliente(this.cliente) };

    }

    public static getJSON(solicitudPlan: SolicitudPlan) {
        return {
            id: solicitudPlan.id,
            tgf_plan_id: solicitudPlan.tgf_plan_id,
            tgf_cliente_id: solicitudPlan.tgf_cliente_id
        }
    }

}