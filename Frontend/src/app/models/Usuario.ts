import { Rol } from "./Rol";

export class Usuario {

	public id: number;
	public rol: Rol;
	public cliente: number;
	public usu_correo: string;
	public password: string;

	public tgf_cliente_id: number;
	public tgf_profesor_id: number;

	constructor() {

		this.rol = null;
		this.cliente = null;
		this.usu_correo = null;
		this.password = null;

		this.tgf_cliente_id = null;
		this.tgf_profesor_id = null;
		
	}

}