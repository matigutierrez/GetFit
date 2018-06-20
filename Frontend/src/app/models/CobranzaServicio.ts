import { CobranzaHistoricaServicio } from "./CobranzaHistoricaServicio";
import { Cliente } from "./Cliente";

export class CobranzaServicio {

    public id: number;
    public tgf_cobranza_historica_servicio_id: number;
    public tgf_cliente_id: number;

    public cobranza_historica_servicio: CobranzaHistoricaServicio;
    public cliente: Cliente;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.cobranza_historica_servicio) { this.cobranza_historica_servicio = new CobranzaHistoricaServicio(this.cobranza_historica_servicio) };
        if (this.cliente) { this.cliente = new Cliente(this.cliente) };

    }

    public static getJSON(cobranzaServicio: CobranzaServicio) {
        return {
            id: cobranzaServicio.id,
            tgf_cobranza_historica_servicio_id: cobranzaServicio.tgf_cobranza_historica_servicio_id,
            tgf_cliente_id: cobranzaServicio.tgf_cliente_id
        };
    }

}