import { SolicitudServicioHistorica } from "./SolicitudServicioHistorica";
import { DisponibilidadHistoricaServicio } from "./DisponibilidadHistoricaServicio";

export class SolicitudServicio {

    public id: number;
    public tgf_solicitud_servicio_historica_id: number;
    public tgf_disponibilidad_servicio_id: number;

    public solicitud_servicio_historica: SolicitudServicioHistorica;
    public disponibilidad_historica_servicio: DisponibilidadHistoricaServicio;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.solicitud_servicio_historica) { this.solicitud_servicio_historica = new SolicitudServicioHistorica(this.solicitud_servicio_historica) };
        if (this.disponibilidad_historica_servicio) { this.disponibilidad_historica_servicio = new DisponibilidadHistoricaServicio(this.disponibilidad_historica_servicio) };

    }

    public static getJSON(solicitudServicio: SolicitudServicio) {
        return {
            id: solicitudServicio.id,
            tgf_solicitud_servicio_historica_id: solicitudServicio.tgf_solicitud_servicio_historica_id,
            tgf_disponibilidad_servicio_id: solicitudServicio.tgf_disponibilidad_servicio_id
        };
    }

}