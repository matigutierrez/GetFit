import { Contrato } from "./Contrato";
import { Pago } from "./Pago";
import { CobranzaHistorica } from "./CobranzaHistorica";

export class Cobranza {

    public id: number;
    public tgf_cobranza_historica_id: number;
    public tgf_contrato_id: number;

    public contrato: Contrato;
    public cobranza_historica: CobranzaHistorica;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.contrato) { this.contrato = new Contrato(this.contrato) };
        if (this.cobranza_historica) { this.cobranza_historica = new CobranzaHistorica(this.cobranza_historica) };

    }

    public static getJSON(cobranza: Cobranza): any {
        return {
            id: cobranza.id,
            tgf_cobranza_historica_id: cobranza.tgf_cobranza_historica_id,
            tgf_contrato_id: cobranza.tgf_contrato_id
        };
    }

}