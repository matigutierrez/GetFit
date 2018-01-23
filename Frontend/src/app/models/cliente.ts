export class Cliente{
	constructor(
		public cli_rut: string,
		public cli_nombres: string,
		public cli_apellidos: string,
		public cli_numerotelefonico: string,
		public cli_direccion: string,
		public cli_huella: ByteString
	){}
}