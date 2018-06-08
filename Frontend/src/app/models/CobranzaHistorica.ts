import { Contrato } from "./Contrato";
import { Pago } from "./Pago";
import { ContratoHistorico } from "./ContratoHistorico";

export class CobranzaHistorica {

    public id: number;
    public tgf_contrato_historico_id: number;
    public cob_monto: number;
    public cob_fecha: Date;

    public contrato_historico: ContratoHistorico;
    public pago: Pago;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.contrato_historico) { this.contrato_historico = new ContratoHistorico(this.contrato_historico) };
        if (this.pago) { this.pago = new Pago(this.pago) };
        if (this.cob_fecha) { this.cob_fecha = new Date(this.cob_fecha) };

    }

    public static getJSON(cobranza: CobranzaHistorica): any {
        return {
            id: cobranza.id,
            tgf_contrato_historico_id: cobranza.tgf_contrato_historico_id,
            cob_monto: cobranza.cob_monto,
            cob_fecha: cobranza.cob_fecha
        };
    }

}