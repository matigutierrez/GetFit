export class Sede {

	public id: number;
	public sed_nombre: string;

	public constructor() {

		this.id = null;
		this.sed_nombre = null;

	}

	public static getJSON(sede: Sede): any {
		return {
			id: sede.id,
			sed_nombre: sede.sed_nombre
		};
	}

}