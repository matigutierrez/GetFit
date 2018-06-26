import { SolicitudServicioHistorica } from "./SolicitudServicioHistorica";
import { DisponibilidadServicio } from "./DisponibilidadServicio";

export class SolicitudServicio {

    public id: number;
    public tgf_solicitud_servicio_historica_id: number;
    public tgf_disponibilidad_servicio_id: number;

    public solicitud_servicio_historica: SolicitudServicioHistorica;
    public disponibilidad_servicio: DisponibilidadServicio;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.solicitud_servicio_historica) { this.solicitud_servicio_historica = new SolicitudServicioHistorica(this.solicitud_servicio_historica) };
        if (this.disponibilidad_servicio) { this.disponibilidad_servicio = new DisponibilidadServicio(this.disponibilidad_servicio) };

    }

    public static getJSON(solicitudServicio: SolicitudServicio) {
        return {
            id: solicitudServicio.id,
            tgf_solicitud_servicio_historica_id: solicitudServicio.tgf_solicitud_servicio_historica_id,
            tgf_disponibilidad_servicio_id: solicitudServicio.tgf_disponibilidad_servicio_id
        };
    }

}