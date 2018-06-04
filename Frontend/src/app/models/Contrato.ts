import { Plan } from "./Plan";
import { ContratoHistorico } from "./ContratoHistorico";
import { Cobranza } from "./Cobranza";


export class Contrato {
    
    public id: number;
    public tgf_contrato_historico_id: number;
    public tgf_plan_id: number;

    public contrato_historico: ContratoHistorico;
    public cobranzas: Cobranza[];

    public constructor() {

        this.id = null;
        this.tgf_contrato_historico_id = null;
        this.tgf_plan_id = null;

        this.contrato_historico = null;
        this.cobranzas = null;

    }

    public static getJSON(contrato: Contrato) {
        return {
            id: contrato.id,
            tgf_contrato_historico_id: contrato.tgf_contrato_historico_id,
            tgf_plan_id: contrato.tgf_plan_id
        };
    }

}