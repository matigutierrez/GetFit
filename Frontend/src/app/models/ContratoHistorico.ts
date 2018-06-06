import { Cliente } from "./Cliente";
import { Plan } from "./Plan";
import { Cobranza } from "./Cobranza";
import { CobranzaHistorica } from "./CobranzaHistorica";

export class ContratoHistorico {

    public id: number;
    public tgf_cliente_id: number;
    public tgf_plan_id: number;
    public con_fecha_inicio: string;
    public con_acta: string;

    public cliente: Cliente;
    public plan: Plan;
    public cobranzas_historicas: CobranzaHistorica[];

    public archivo: any;

    public constructor() {

        this.id = null;
        this.tgf_cliente_id = null;
        this.tgf_plan_id = null;
        this.con_fecha_inicio = null;
        this.con_acta = null;

        this.cliente = null;
        this.plan = null;
        this.cobranzas_historicas = null;

        this.archivo = null;

    }

    public static getJSON(contrato: ContratoHistorico): any {
        return {
            id: contrato.id,
            tgf_cliente_id: contrato.tgf_cliente_id,
            tgf_plan_id: contrato.tgf_plan_id,
            con_fecha_inicio: contrato.con_fecha_inicio,
            con_acta: contrato.con_acta
        };
    }

}