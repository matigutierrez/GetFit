import { Usuario } from "./Usuario";
import { not } from "@angular/compiler/src/output/output_ast";

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

    public static getJSON(notificacion: Notificacion): any {
        return {
            id: notificacion.id,
            not_titulo: notificacion.not_titulo,
            not_contenido: notificacion.not_contenido
        };
    }

}