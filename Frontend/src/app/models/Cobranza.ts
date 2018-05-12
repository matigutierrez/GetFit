import { Contrato } from "./Contrato";
import { Pago } from "./Pago";

export class Cobranza {

    public id: number;
    public tgf_contrato_id: number;
    public cob_monto: number;
    public cob_fecha: Date;

    public contrato: Contrato;
    public pago: Pago;
    
    public constructor() {

        this.id = null;
        this.tgf_contrato_id = null;
        this.cob_monto = null;
        this.cob_fecha = null;

        this.contrato = null;
        this.pago = null;

    }

    public static getJSON(cobranza: Cobranza): any {
        return {
            id: cobranza.id,
            tgf_contrato_id: cobranza.tgf_contrato_id,
            cob_monto: cobranza.cob_monto,
            cob_fecha: cobranza.cob_fecha
        };
    }

}