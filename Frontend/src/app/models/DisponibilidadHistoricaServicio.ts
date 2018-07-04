import { Servicio } from "./Servicio";

export class DisponibilidadHistoricaServicio {

    public id: number;
    public tgf_servicio_id: number;
    public dse_fecha_inicio: Date;
    public dse_fecha_fin: Date;

    public servicio: Servicio;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.dse_fecha_inicio) { this.dse_fecha_inicio = new Date(this.dse_fecha_inicio) };
        if (this.dse_fecha_fin) { this.dse_fecha_fin = new Date(this.dse_fecha_fin) };

        if (this.servicio) { this.servicio = new Servicio(this.servicio) };

    }

    public static getJSON(disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio) {
        return {
            id: disponibilidadHistoricaServicio.id,
            tgf_servicio_id: disponibilidadHistoricaServicio.tgf_servicio_id,
            dse_fecha_inicio: disponibilidadHistoricaServicio.dse_fecha_inicio,
            dse_fecha_fin: disponibilidadHistoricaServicio.dse_fecha_fin
        };
    }

}