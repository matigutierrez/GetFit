import { Component, Input, ViewChild, OnDestroy } from "@angular/core";
import { PlanService } from "../../../../services/plan.service";
import { Cliente } from "../../../../models/Cliente";
import { Plan } from "../../../../models/Plan";
import { ClienteService } from "../../../../services/cliente.service";
import { Contrato } from "../../../../models/Contrato";
import { ContratoService } from "../../../../services/contrato.service";
import { HorarioComponent } from "../../../extra/horario/horario.component";
import { PusherService } from "../../../../services/pusher.service";
import { CancelarContratoComponent } from "../../planes/cancelarcontrato/cancelarcontrato.component";

@Component({
    selector: 'planescliente',
    templateUrl: 'planescliente.html'
})
export class PlanesClienteComponent implements OnDestroy {

    @Input("horarioComponent")
    public horarioComponent: HorarioComponent;

    @Input("cancelarContratoComponent")
    public cancelarContratoComponent: CancelarContratoComponent;

    // Cliente actual
    public cliente: Cliente;

    // Lista de contratos del cliente
    public contratos: Contrato[];

    // Canal de pusher
    private contratoChannel: any;

    public constructor(
        private _planService: PlanService,
        private _contratoService: ContratoService,
        private _clienteService: ClienteService,
        private _pusherService: PusherService
    ) {

        this.contratoChannel = this._pusherService.getPusher().subscribe("contrato");
        this.contratoChannel.bind("create", data => { this.onCreate(data) });
        this.contratoChannel.bind("update", data => { this.onUpdate(data) });
        this.contratoChannel.bind("delete", data => { this.onDelete(data) });

    }

    public ngOnDestroy() {
        if ( this.contratoChannel ) {
            this.contratoChannel.unbind();
        }
    }

    public onCreate(contrato: Contrato) {
        // Si se han recibido contratos
        if ( this.contratos ) {
            this.contratos.unshift(contrato);
        }
    }

    public onUpdate(contrato: Contrato) {
        // Si se han recibido contratos
        if ( this.contratos ) {
            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {
                // Comparar id de contratos
                if ( this.contratos[i].id == contrato.id ) {
                    // Actualizar contrato modificado
                    this.contratos[i] = contrato;
                    break;
                }
            }
        }
    }

    public onDelete(id: number) {
        // Si se han recibido contratos
        if ( this.contratos ) {
            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {
                // Comparar id de contratos
                if ( this.contratos[i].id == id ) {
                    // Eliminar contrato
                    this.contratos.splice(i, 1);
                    break;
                }
            }
        }
    }

    public abrirContrato(contrato: Contrato) {

    }

    public abrirHorarios(plan: Plan) {
        this.horarioComponent.abrir([plan]);
    }

    public deleteContrato(contrato: Contrato) {
        this.cancelarContratoComponent.abrir(contrato);
    }

    @Input("cliente")
    public set setCliente(cliente: Cliente) {
        this.cliente = cliente;
        this._clienteService.getContratos(this.cliente).subscribe(
            Response => {
                this.contratos = Response;
            }
        );
    }

}