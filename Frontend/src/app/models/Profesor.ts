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

}