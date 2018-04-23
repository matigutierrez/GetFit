import { Usuario } from "./Usuario";

export class Cliente {

	public id: number;
	public cli_rut: string;
	public cli_nombres: string;
	public cli_apellidos: string;
	public cli_numerotelefonico: string;
	public cli_direccion: string;
	public cli_huella: ByteString;

	public usuario: Usuario;

	public constructor() {
		
		this.id = null;
		this.cli_rut = null;
		this.cli_nombres = null;
		this.cli_apellidos = null;
		this.cli_numerotelefonico = null;
		this.cli_direccion = null;
		this.cli_huella = null;

		this.usuario = null;

	}
	
}