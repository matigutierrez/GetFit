import { Component } from "@angular/core";
import { Plan } from "../../../models/Plan";
import { HorarioService } from "../../../services/horario.service";
import { Horario } from "../../../models/Horario";
import { HoraDiaService } from "../../../services/horadia.service";
import { HoraDia } from "../../../models/HoraDia";
import { DiaSemana } from "../../../models/DiaSemana";
import { DiaSemanaService } from "../../../services/diasemana.service";
import { TipoPlanService } from "../../../services/tipoplan.service";
import { TipoPlan } from "../../../models/TipoPlan";

@Component({
    selector: 'tablahorarios',
    templateUrl: 'tablahorarios.html',
    styleUrls: ['tablahorarios.css']
})
export class TablaHorariosComponent {

    // Lista de horarios
    public horarios: Horario[];

    // Lista de horas
    public horas: HoraDia[];

    // Lista de dias
    public dias: DiaSemana[];

    // Lista de tipos de planes
    public tipoPlanes: TipoPlan[];

    // Mapeo de horarios
    public mapHorario: any;

    public constructor(
        private _horarioService: HorarioService,
        private _horaDiaService: HoraDiaService,
        private _diaSemanaService: DiaSemanaService,
        private _tipoPlanService: TipoPlanService
    ) {

        this.mapHorario = {};

        this._horaDiaService.query().subscribe(
            Response => {
                this.horas = Response;
            }
        );

        this._diaSemanaService.query().subscribe(
            Response => {
                this.dias = Response;
            }
        );

        this._horarioService.query().subscribe(
            Response => {
                this.horarios = [];

                for (let i = 0; i < Response.length; i++) {
                    this.putHorario( Response[i] );
                }
            }
        );

        this._tipoPlanService.query().subscribe(
            Response => {
                this.tipoPlanes = Response;
            }
        );

    }

    private putHorario(horario: Horario) {

        let hora: number = horario.tgf_hora_dia_id;
        let dia: number = horario.tgf_dia_semana_id;

        // Si la matriz no contiene fila en esta posición
        if ( this.mapHorario[hora] == null ) {
            this.mapHorario[hora] = {};
        }

        let horarioAnterior: Horario = this.mapHorario[hora][dia];

        // Si había un horario anteriormente en esta posición
        if (horarioAnterior != null) {

            // Buscar en la lista de horarios
            let indice = this.horarios.indexOf(horarioAnterior);

            // Si se encuentra en la lista
            if (indice != null) {
                
                // Eliminar de la lista
                this.horarios.splice(indice, 1);
            }
        }

        // Insertar nuevo horario a la tabla
        this.mapHorario[hora][dia] = horario;

        // Insertar nuevo horario a la lista
        this.horarios.push(horario);

    }

    public getHorario(hora: number, dia: number): Horario {
        // Si existe una fila con esta hora
        if ( this.mapHorario[hora] ) {
            // Retornar horario
            return this.mapHorario[hora][dia];
        }
        return null;
    }

    public getHorarioActivo(hora: number, dia: number): boolean {
        // Encontrar objeto horario
        let horario: Horario = this.getHorario(hora, dia);

        // Si el horario existe
        if ( horario ) {
            // Retornar si está activo o no
            return !horario.hor_inactivo;
        }

        return false;
    }

}