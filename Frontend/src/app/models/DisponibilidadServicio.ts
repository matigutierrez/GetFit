import { Servicio } from "./Servicio";

export class DisponibilidadServicio {

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

    public static getJSON(disponibilidadServicio: DisponibilidadServicio) {
        return {
            id: disponibilidadServicio.id,
            tgf_servicio_id: disponibilidadServicio.tgf_servicio_id,
            dse_fecha_inicio: disponibilidadServicio.dse_fecha_inicio,
            dse_fecha_fin: disponibilidadServicio.dse_fecha_fin
        };
    }

}