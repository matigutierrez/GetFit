import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DisponibilidadServicio } from "../../../../../models/DisponibilidadServicio";
import { Servicio } from "../../../../../models/Servicio";
import { ServicioService } from "../../../../../services/servicio.service";
import { DisponibilidadServicioService } from "../../../../../services/disponibilidadservicio.service";

@Component({
    selector: 'editardisponibilidadservicio',
    templateUrl: 'editardisponibilidadservicio.html'
})
export class EditarDisponibilidadServicioComponent implements OnInit {

    // Disponibilidad de servicio
    @Input("disponibilidadServicio")
    public disponibilidadServicio: DisponibilidadServicio;

    @ViewChild("dse_fecha_inicio")
    public html_dse_fecha_inicio: ElementRef;

    @ViewChild("dse_fecha_fin")
    public html_dse_fecha_fin: ElementRef;

    // Lista de servicios disponibles
    public servicios: Servicio[];

    // Indicar que se encuentra editando el servicio
    public editando: boolean;

    public constructor(
        private _disponibilidadServicioService: DisponibilidadServicioService,
        private _servicioService: ServicioService
    ) {
        this._servicioService.query().subscribe(
            Response => {
                this.servicios = Response;
            }
        );
        
    }

    public ngOnInit() {
        // Fijar la fecha inicial
        this.html_dse_fecha_inicio.nativeElement.valueAsDate = this.disponibilidadServicio.dse_fecha_inicio;

        // Fijar la fecha de termino
        this.html_dse_fecha_fin.nativeElement.valueAsDate = this.disponibilidadServicio.dse_fecha_fin;
    }

    public onChangeFechaInicio(event: any): void {
        this.disponibilidadServicio.dse_fecha_inicio = new Date(event.target.value);
    }

    public onChangeFechaTermino(event: any): void {
        this.disponibilidadServicio.dse_fecha_fin = new Date(event.target.value);
    }

    public onSubmit() {
        if (this.disponibilidadServicio.tgf_servicio_id != null && this.disponibilidadServicio.dse_fecha_inicio != null && this.disponibilidadServicio.dse_fecha_fin != null) {
            // Indicar que se encuentra editando
            this.editando = true;
            
            this._disponibilidadServicioService.update(this.disponibilidadServicio).subscribe(
                Response => {
                    // Indicar que dejó de editar
                    this.editando = false;
                }
            );
            
        }
    }
    
}