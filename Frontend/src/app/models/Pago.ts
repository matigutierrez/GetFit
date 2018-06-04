export class Pago {

    public id: number;
    public tgf_cobranza_historica_id: number;
    public tgf_metodo_pago_id: number;

    public constructor() {

        this.id = null;
        this.tgf_cobranza_historica_id = null;
        this.tgf_metodo_pago_id = null;

    }
    
    public static getJSON(pago: Pago): any {
        return {
            id: pago.id,
            tgf_cobranza_historica_id: pago.tgf_cobranza_historica_id,
            tgf_metodo_pago_id: pago.tgf_metodo_pago_id
        };
    }

}