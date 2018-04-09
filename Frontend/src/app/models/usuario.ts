import { Rol } from "./Rol";

export class Usuario {

	public id: number;
	public rol: Rol;
	public cliente: number;
	public usu_correo: string;
	public password: string;

	constructor() {
		this.rol = null;
		this.cliente = null;
		this.usu_correo = null;
		this.password = null;
	}

}