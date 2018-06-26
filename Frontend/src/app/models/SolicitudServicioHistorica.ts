import { DisponibilidadServicio } from "./DisponibilidadServicio";
import { Cliente } from "./Cliente";

export class SolicitudServicioHistorica {

    public id: number;
    public tgf_disponibilidad_servicio_id: number;
    public tgf_cliente_id: number;

    public sse_fecha_inicio: Date;
    public sse_fecha_fin: Date;

    public disponibilidad_servicio: DisponibilidadServicio;
    public cliente: Cliente;

    public constructor(json?: any) {
        Object.assign(this, json);

        if (this.sse_fecha_inicio) { this.sse_fecha_inicio = new Date(this.sse_fecha_inicio) };
        if (this.sse_fecha_fin) { this.sse_fecha_fin = new Date(this.sse_fecha_fin) };

        if (this.disponibilidad_servicio) { this.disponibilidad_servicio = new DisponibilidadServicio(this.disponibilidad_servicio) };
        if (this.cliente) { this.cliente = new Cliente(this.cliente) };
    }

    public static getJSON(solicitud_servicio_historica: SolicitudServicioHistorica) {
        return {
            id: solicitud_servicio_historica.id,
            tgf_disponibilidad_servicio_id: solicitud_servicio_historica.tgf_disponibilidad_servicio_id,
            sse_fecha_inicio: solicitud_servicio_historica.sse_fecha_inicio,
            sse_fecha_fin: solicitud_servicio_historica.sse_fecha_fin
        };
    }

}