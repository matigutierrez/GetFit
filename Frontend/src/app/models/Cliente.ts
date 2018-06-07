import { Usuario } from "./Usuario";
import { Contrato } from "./Contrato";
import { Autocompletable } from "../extra/Autocompletable";

export class Cliente implements Autocompletable {

	public id: number;
	public cli_rut: string;
	public cli_nombres: string;
	public cli_apellidos: string;
	public cli_numerotelefonico: string;
	public cli_direccion: string;
	public cli_huella: ByteString;

	public usuario: Usuario;
	public contratos: Contrato[];

	public constructor(json?: any) {

		Object.assign(this, json);

		if (this.usuario) { this.usuario = new Usuario(this.usuario) };
		if (this.contratos) { this.contratos = this.contratos.map(contrato => new Contrato(contrato)) };

	}

	public getOption(): string {
		return this.cli_nombres + " " + this.cli_apellidos;
	}

	public static getJSON(cliente: Cliente): any {
		return {
			id: cliente.id,
			cli_rut: cliente.cli_rut,
			cli_nombres: cliente.cli_nombres,
			cli_apellidos: cliente.cli_apellidos,
			cli_numerotelefonico: cliente.cli_numerotelefonico,
			cli_direccion: cliente.cli_direccion,
			cli_huella: cliente.cli_huella
		};
	}

}