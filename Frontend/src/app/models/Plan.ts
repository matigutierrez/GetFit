import { Sede } from "./Sede";
import { Contrato } from "./Contrato";
import { Horario } from "./Horario";
import { TipoPlan } from "./TipoPlan";

export class Plan {

	public id: number;
	public tgf_sede_id: number;
	public tgf_tipo_plan_id: number;
	public pla_nombre: string;
	public pla_descripcion: string;
	public pla_costo: number;
	public pla_capacidad: number;

	// Laravel no trabaja con booleanos, solo con binarios (1|0)
	public pla_solicitable: number;

	public sede: Sede;
	public horarios: Horario[];
	public contratos: Contrato[];
	public tipo_plan: TipoPlan;

	public constructor(json?: any) {

		Object.assign(this, json);

		if (this.horarios) { this.horarios = this.horarios.map(horario => new Horario(horario)) };
		if (this.contratos) { this.contratos = this.contratos.map(contrato => new Contrato(contrato)) };
		if (this.tipo_plan) { this.tipo_plan = new TipoPlan(this.tipo_plan) };

	}

	public static getJSON(plan: Plan): any {
		return {
			id: plan.id,
			tgf_sede_id: plan.tgf_sede_id,
			tgf_tipo_plan_id: plan.tgf_tipo_plan_id,
			pla_nombre: plan.pla_nombre,
			pla_descripcion: plan.pla_descripcion,
			pla_costo: plan.pla_costo,
			pla_capacidad: plan.pla_capacidad,
			pla_solicitable: plan.pla_solicitable
		};
	}

}