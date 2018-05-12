import { Usuario } from "./Usuario";

export class Profesor {

    public id: number;
    public pro_rut: string;
	public pro_nombres: string;
	public pro_apellidos: string;
	public pro_numerotelefonico: string;
    public pro_direccion: string;
    
    public usuario: Usuario;

    public constructor() {
        
        this.id = null;
        this.pro_rut = null;
        this.pro_nombres = null;
        this.pro_apellidos = null;
        this.pro_numerotelefonico = null;
        this.pro_direccion = null;

        this.usuario = null;
        
    }

    public static getJSON(profesor: Profesor): any {
        return {
            id: profesor.id,
            pro_rut: profesor.pro_rut,
            pro_nombres: profesor.pro_nombres,
            pro_apellidos: profesor.pro_apellidos,
            pro_numerotelefonico: profesor.pro_numerotelefonico,
            pro_direccion: profesor.pro_direccion
        };
    }

}