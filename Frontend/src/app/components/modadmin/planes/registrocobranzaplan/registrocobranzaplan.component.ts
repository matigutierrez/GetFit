import { Component, ViewChild, ElementRef, EventEmitter, AfterViewChecked } from "@angular/core";
import { Plan } from "../../../../models/Plan";
import { MaterializeAction } from "angular2-materialize";
import { Cliente } from "../../../../models/Cliente";
import { Contrato } from "../../../../models/Contrato";
import { Cobranza } from "../../../../models/Cobranza";
import { ClienteService } from "../../../../services/cliente.service";
import { PlanService } from "../../../../services/plan.service";
import { CobranzaHistorica } from "../../../../models/CobranzaHistorica";
import { CobranzaHistoricaService } from "../../../../services/cobranzahistorica.service";
import { AutocompleteList } from "../../../../extra/AutocompleteList";
import { MetodoPago } from "../../../../models/MetodoPago";
import { MetodoPagoService } from "../../../../services/metodopago.service";
import { Pago } from "../../../../models/Pago";
import { PagoService } from "../../../../services/pago.service";

declare var Materialize: any;

@Component({
    selector: 'registrocobranzaplan',
    templateUrl: 'registrocobranzaplan.html'
})
export class RegistroCobranzaPlanComponent implements AfterViewChecked {

    // El plan en el cual se está trabajando
    public plan: Plan;

    // En caso de registrar un pago
    public pago: Pago = new Pago();

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Lista de contratos
    public contratos: Contrato[];

    // Datos para el componente autocomplete
    private autocomplete: AutocompleteList;

    // Contrato seleccionado para cobrar
    private contrato: Contrato;

    // Cobranza a registrar
    public cobranzaHistorica: CobranzaHistorica = new CobranzaHistorica();

    // Lista de metodos de pago
    public metodos: MetodoPago[];

    // Indicar que se encuentra registrando la cobranza
    public registrando: boolean;

    public constructor(
        private _clienteService: ClienteService,
        private _cobranzaHistoricaService: CobranzaHistoricaService,
        private _planService: PlanService,
        private _metodoPagoService: MetodoPagoService,
        private _pagoService: PagoService
    ) {

        // Inicializar autocomplete
        this.autocomplete = new AutocompleteList();
        this.autocomplete.onSelect = (contrato: Contrato) => this.seleccionar(contrato);

        // Obtener lista de metodos de pago
        this._metodoPagoService.query().subscribe(
            Response => {
                this.metodos = Response;
            }
        );

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public limpiar(): void {
        this.pago = new Pago();
        this.contrato = null;
        this.contratos = null;
        this.registrando = false;
        this.cobranzaHistorica = new CobranzaHistorica();
        this.autocomplete.clean();
    }

    public seleccionar(contrato: Contrato) {
        // Al seleccionar un contrato del autocomplete
        this.contrato = contrato;

        if (this.contrato) {
            // Actualizar id de contrato
            this.cobranzaHistorica.tgf_contrato_historico_id = this.contrato.contrato_historico.id;

            // Actualizar monto
            this.cobranzaHistorica.cob_monto = this.contrato.contrato_historico.plan.pla_costo;
        }
    }

    public abrir(plan: Plan) {
        // Guardar el plan
        this.plan = plan;

        // Limpiar autocomplete
        this.autocomplete.clean();

        // Obtener contratos del plan
        this._planService.getContratos(this.plan).subscribe(
            Response => {
                // Guardar contratos
                this.contratos = Response;
                this.autocomplete.putOptions(this.contratos);
            }
        );

        // Limpiar vista
        this.limpiar();

        // Abrir modal
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        // Limpiar componente
        this.limpiar();

        // Cerrar modal
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Al emitir una cobranza

        // Validar contrato
        if (this.cobranzaHistorica.tgf_contrato_historico_id != null && this.cobranzaHistorica.cob_monto != null) {
            // Indicar que se encuentra registrando la cobranza
            this.registrando = true;

            // Guardar cobranza
            this._cobranzaHistoricaService.save(this.cobranzaHistorica).subscribe(
                Response => {
                    // Si hay método de pago, agregar un pago
                    if ( this.pago.tgf_metodo_pago_id ) {
                        // Agregar ID de cobranza historica al pago
                        this.pago.tgf_cobranza_historica_id = Response;

                        // Registrar pago
                        this._pagoService.save(this.pago).subscribe(
                            Response => {
                                // Cerrar modal
                                this.cerrar();
                            }
                        );

                    } else {
                        // Cerrar modal
                        this.cerrar();
                    }
                }
            );
        }
    }

}