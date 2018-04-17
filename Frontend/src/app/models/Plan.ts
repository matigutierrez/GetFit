import { Sede } from "./Sede";

export class Plan {

	public id: number;
	public tgf_sede_id: number;
	public pla_nombre: string;
	public pla_descripcion: string;
	public pla_costo: string;

	public sede: Sede;
	public horarios: string[];
	
	constructor() {

		this.pla_nombre = null;
		this.pla_descripcion = null;
		this.pla_costo = null;
		this.tgf_sede_id = null;

		this.sede = null;
		this.horarios = null;

	}
}