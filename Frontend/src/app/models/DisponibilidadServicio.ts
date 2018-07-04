import { DisponibilidadHistoricaServicio } from "./DisponibilidadHistoricaServicio";

export class DisponibilidadServicio {

    public id: number;
    public tgf_disponibilidad_historica_servicio_id: number;

    public disponibilidad_historica_servicio: DisponibilidadHistoricaServicio;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.disponibilidad_historica_servicio) { this.disponibilidad_historica_servicio = new DisponibilidadHistoricaServicio(this.disponibilidad_historica_servicio) };

    }

    public static getJSON(disponibilidadServicio: DisponibilidadServicio) {
        return {
            id: disponibilidadServicio.id,
            tgf_disponibilidad_historica_servicio_id: disponibilidadServicio.tgf_disponibilidad_historica_servicio_id
        };
    }

}