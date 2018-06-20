import { DisponibilidadServicio } from "./DisponibilidadServicio";
import { PagoServicio } from "./PagoServicio";
import { Cliente } from "./Cliente";
import { CobranzaServicio } from "./CobranzaServicio";

export class CobranzaHistoricaServicio {

    public id: number;
    public tgf_disponibilidad_servicio_id: number;
    public tgf_cliente_id: number;
    public chs_monto: number;

    // Fecha no es necesario enviarla por json
    public chs_fecha: Date;

    public disponibilidad_servicio: DisponibilidadServicio;
    public cliente: Cliente;
    public pago_servicio: PagoServicio;
    public cobranza_servicio: CobranzaServicio;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.chs_fecha) { this.chs_fecha = new Date(this.chs_fecha) };

        if (this.disponibilidad_servicio) { this.disponibilidad_servicio = new DisponibilidadServicio(this.disponibilidad_servicio) };
        if (this.cliente) { this.cliente = new Cliente(this.cliente) };
        if (this.pago_servicio) { this.pago_servicio = new PagoServicio(this.pago_servicio) };
        if (this.cobranza_servicio) { this.cobranza_servicio = new CobranzaServicio(this.cobranza_servicio) };

    }

    public static getJSON(cobranzaHistoricaServicio: CobranzaHistoricaServicio) {
        return {
            id: cobranzaHistoricaServicio.id,
            tgf_disponibilidad_servicio_id: cobranzaHistoricaServicio.tgf_disponibilidad_servicio_id,
            tgf_cliente_id: cobranzaHistoricaServicio.tgf_cliente_id,
            chs_monto: cobranzaHistoricaServicio.chs_monto
        };
    }

}