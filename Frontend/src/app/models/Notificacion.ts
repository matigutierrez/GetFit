import { Usuario } from "./usuario";

export class Notificacion {

    public id:number;
    public not_titulo:string;
    public not_contenido:string;

    public usuarios:Usuario[];

    public constructor() {
        
        this.id = null;
        this.not_titulo = null;
        this.not_contenido = null;

        this.usuarios = null;

    }

}