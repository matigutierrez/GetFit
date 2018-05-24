import { Sede } from "./Sede";
import { Cliente } from "./Cliente";

export class SolicitudPlan {

    public id: number;
    public tgf_plan_id: number;
    public tgf_cliente_id: number;

    public sede: Sede;
    public cliente: Cliente;

    public constructor() {

        this.id = null;
        this.tgf_plan_id = null;
        this.tgf_cliente_id = null;

        this.sede = null;
        this.cliente = null;

    }

}