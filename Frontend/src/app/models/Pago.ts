import { CobranzaHistorica } from "./CobranzaHistorica";
import { MetodoPago } from "./MetodoPago";

export class Pago {

    public id: number;
    public tgf_cobranza_historica_id: number;
    public tgf_metodo_pago_id: number;

    public cobranza_historica: CobranzaHistorica;
    public metodo_pago: MetodoPago;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.cobranza_historica) { this.cobranza_historica = new CobranzaHistorica(this.cobranza_historica) };
        if (this.metodo_pago) { this.metodo_pago = new MetodoPago(this.metodo_pago) };

    }

    public static getJSON(pago: Pago): any {
        return {
            id: pago.id,
            tgf_cobranza_historica_id: pago.tgf_cobranza_historica_id,
            tgf_metodo_pago_id: pago.tgf_metodo_pago_id
        };
    }

}