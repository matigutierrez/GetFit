import { Rol } from "./Rol";
import { Cliente } from "./Cliente";

export class Usuario {

	public id: number;
	public tgf_cliente_id: number;
	public tgf_profesor_id: number;
	public tgf_rol_id: number;
	public usu_correo: string;
	public password: string;

	public rol: Rol;
	public cliente: Cliente;

	public constructor() {

		this.id = null;
		this.tgf_cliente_id = null;
		this.tgf_profesor_id = null;
		this.usu_correo = null;
		this.password = null;

		this.rol = null;
		this.cliente = null;
		
	}

	public static getJSON(usuario: Usuario): any {
		if ( usuario.password && usuario.password.length > 0 ) {
			return {
				id: usuario.id,
				tgf_cliente_id: usuario.tgf_cliente_id,
				tgf_profesor_id: usuario.tgf_profesor_id,
				tgf_rol_id: usuario.tgf_rol_id,
				usu_correo: usuario.usu_correo,
				password: usuario.password
			};
		}
		return {
			id: usuario.id,
			tgf_cliente_id: usuario.tgf_cliente_id,
			tgf_profesor_id: usuario.tgf_profesor_id,
			tgf_rol_id: usuario.tgf_rol_id,
			usu_correo: usuario.usu_correo
		};
	}

}