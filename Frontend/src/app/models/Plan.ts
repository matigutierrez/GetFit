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
	
	public constructor() {

		this.id = null;
		this.tgf_sede_id = null;
		this.tgf_tipo_plan_id = null;
		this.pla_nombre = null;
		this.pla_descripcion = null;
		this.pla_costo = null;
		this.pla_capacidad = null;

		this.sede = null;
		this.horarios = null;
		this.contratos = null;
		this.tipo_plan = null;

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