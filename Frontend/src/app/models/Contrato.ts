import { Cliente } from "./Cliente";
import { Plan } from "./Plan";
import { Cobranza } from "./Cobranza";

export class Contrato {
    
    public id: number;
    public con_fecha_inicio: string;
    public con_acta: string;

    public tgf_cliente_id: number;
    public tgf_plan_id: number;

    public cliente: Cliente;
    public plan: Plan;
    public cobranzas: Cobranza[];

    public constructor() {

        this.id = null;
        this.con_fecha_inicio = null;
        this.con_acta = null;

        this.tgf_cliente_id = null;
        this.tgf_plan_id = null;

        this.cliente = null;
        this.plan = null;
        this.cobranzas = null;

    }

}