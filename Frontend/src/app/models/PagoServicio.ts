import { MetodoPago } from "./MetodoPago";
import { CobranzaHistoricaServicio } from "./CobranzaHistoricaServicio";

export class PagoServicio {

    public id: number;
    public tgf_cobranza_historica_servicio_id: number;
    public tgf_metodo_pago_id: number;

    // No es necesario enviar esta fecha a backend
    public pag_fecha: Date;

    public cobranza_historica_servicio: CobranzaHistoricaServicio;
    public metodo_pago: MetodoPago;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.pag_fecha) { this.pag_fecha = new Date(this.pag_fecha) };

        if (this.cobranza_historica_servicio) { this.cobranza_historica_servicio = new CobranzaHistoricaServicio(this.cobranza_historica_servicio) };
        if (this.metodo_pago) { this.metodo_pago = new MetodoPago(this.metodo_pago) };

    }

    public static getJSON(pagoServicio: PagoServicio) {
        return {
            id: pagoServicio.id,
            tgf_cobranza_historica_servicio_id: pagoServicio.tgf_cobranza_historica_servicio_id,
            tgf_metodo_pago_id: pagoServicio.tgf_metodo_pago_id
        };
    }

}