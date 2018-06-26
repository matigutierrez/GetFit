import { PagoServicio } from "./PagoServicio";
import { Cliente } from "./Cliente";
import { CobranzaServicio } from "./CobranzaServicio";
import { SolicitudServicioHistorica } from "./SolicitudServicioHistorica";

export class CobranzaHistoricaServicio {

    public id: number;
    public tgf_solicitud_servicio_historica_id: number;
    public tgf_cliente_id: number;
    public chs_monto: number;

    // Fecha no es necesario enviarla por json
    public chs_fecha: Date;

    public solicitud_servicio_historica: SolicitudServicioHistorica;
    public cliente: Cliente;
    public pago_servicio: PagoServicio;
    public cobranza_servicio: CobranzaServicio;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.chs_fecha) { this.chs_fecha = new Date(this.chs_fecha) };

        if (this.solicitud_servicio_historica) { this.solicitud_servicio_historica = new SolicitudServicioHistorica(this.solicitud_servicio_historica) };
        if (this.cliente) { this.cliente = new Cliente(this.cliente) };
        if (this.pago_servicio) { this.pago_servicio = new PagoServicio(this.pago_servicio) };
        if (this.cobranza_servicio) { this.cobranza_servicio = new CobranzaServicio(this.cobranza_servicio) };

    }

    public static getJSON(cobranzaHistoricaServicio: CobranzaHistoricaServicio) {
        return {
            id: cobranzaHistoricaServicio.id,
            tgf_solicitud_servicio_historica_id: cobranzaHistoricaServicio.tgf_solicitud_servicio_historica_id,
            tgf_cliente_id: cobranzaHistoricaServicio.tgf_cliente_id,
            chs_monto: cobranzaHistoricaServicio.chs_monto
        };
    }

}