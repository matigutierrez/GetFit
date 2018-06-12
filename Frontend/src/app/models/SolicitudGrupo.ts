import { Cliente } from "./Cliente";
import { Grupo } from "./Grupo";

export class SolicitudGrupo {

    public id: number;
    public tgf_grupo_id: number;
    public tgf_cliente_id: number;
    public fecha_solicitud: string;

    public grupo: Grupo;
    public cliente: Cliente;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.grupo) { this.grupo = new Grupo(this.grupo) };
        if (this.cliente) { this.cliente = new Cliente(this.cliente) };

    }

    public static getJSON(solicitudGrupo: SolicitudGrupo) {
        return {
            id: solicitudGrupo.id,
            tgf_grupo_id: solicitudGrupo.tgf_grupo_id,
            tgf_cliente_id: solicitudGrupo.tgf_cliente_id
        }
    }

}