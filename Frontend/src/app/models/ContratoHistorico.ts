import { Cliente } from "./Cliente";
import { Grupo } from "./Grupo";
import { Cobranza } from "./Cobranza";
import { CobranzaHistorica } from "./CobranzaHistorica";

export class ContratoHistorico {

    public id: number;
    public tgf_cliente_id: number;
    public tgf_grupo_id: number;
    public con_fecha_inicio: string;
    public con_acta: string;

    public cliente: Cliente;
    public grupo: Grupo;
    public cobranzas_historicas: CobranzaHistorica[];

    public archivo: any;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.cliente) { this.cliente = new Cliente(this.cliente) };
        if (this.grupo) { this.grupo = new Grupo(this.grupo) };
        if (this.cobranzas_historicas) { this.cobranzas_historicas = this.cobranzas_historicas.map(cobranzaHistorica => new CobranzaHistorica(cobranzaHistorica)) };

    }

    public static getJSON(contrato: ContratoHistorico): any {
        return {
            id: contrato.id,
            tgf_cliente_id: contrato.tgf_cliente_id,
            tgf_grupo_id: contrato.tgf_grupo_id,
            con_fecha_inicio: contrato.con_fecha_inicio,
            con_acta: contrato.con_acta
        };
    }

}