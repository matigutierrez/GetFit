import { Sede } from "./Sede";
import { Contrato } from "./Contrato";
import { Horario } from "./Horario";
import { TipoGrupo } from "./TipoGrupo";

export class Grupo {

	public id: number;
	public tgf_sede_id: number;
	public tgf_tipo_grupo_id: number;
	public gru_nombre: string;
	public gru_descripcion: string;
	public gru_costo: number;
	public gru_capacidad: number;

	// Laravel no trabaja con booleanos, solo con binarios (1|0)
	public gru_solicitable: number;

	public sede: Sede;
	public horarios: Horario[];
	public contratos: Contrato[];
	public tipo_grupo: TipoGrupo;

	public constructor(json?: any) {

		Object.assign(this, json);

		if (this.horarios) { this.horarios = this.horarios.map(horario => new Horario(horario)) };
		if (this.contratos) { this.contratos = this.contratos.map(contrato => new Contrato(contrato)) };
		if (this.tipo_grupo) { this.tipo_grupo = new TipoGrupo(this.tipo_grupo) };

	}

	public static getJSON(grupo: Grupo): any {
		return {
			id: grupo.id,
			tgf_sede_id: grupo.tgf_sede_id,
			tgf_tipo_grupo_id: grupo.tgf_tipo_grupo_id,
			gru_nombre: grupo.gru_nombre,
			gru_descripcion: grupo.gru_descripcion,
			gru_costo: grupo.gru_costo,
			gru_capacidad: grupo.gru_capacidad,
			gru_solicitable: grupo.gru_solicitable
		};
	}

}