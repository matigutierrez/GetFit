import { Grupo } from "./Grupo";
import { ContratoHistorico } from "./ContratoHistorico";
import { Cobranza } from "./Cobranza";
import { Autocompletable } from "../extra/Autocompletable";


export class Contrato implements Autocompletable {

    public id: number;
    public tgf_contrato_historico_id: number;
    public tgf_grupo_id: number;

    public contrato_historico: ContratoHistorico;
    public cobranzas: Cobranza[];

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.contrato_historico) { this.contrato_historico = new ContratoHistorico(this.contrato_historico) };
        if (this.cobranzas) { this.cobranzas = this.cobranzas.map(cobranza => new Cobranza(cobranza)) };

    }

    public getOption(): string {
        return this.contrato_historico.cliente.cli_nombres + " " + this.contrato_historico.cliente.cli_apellidos;
    }

    public static getJSON(contrato: Contrato) {
        return {
            id: contrato.id,
            tgf_contrato_historico_id: contrato.tgf_contrato_historico_id,
            tgf_grupo_id: contrato.tgf_grupo_id
        };
    }

}