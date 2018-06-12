import { Component, EventEmitter, Input, Output, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ContratoService } from '../../../../services/contrato.service';
import { MaterializeAction } from 'angular2-materialize';
import { Cliente } from '../../../../models/Cliente';
import { Contrato } from '../../../../models/Contrato';
import { ClienteService } from '../../../../services/cliente.service';
import { CobranzaHistorica } from '../../../../models/CobranzaHistorica';
import { CobranzaHistoricaService } from '../../../../services/cobranzahistorica.service';
import { AutocompleteList } from '../../../../extra/AutocompleteList';
import { Pago } from '../../../../models/Pago';
import { MetodoPago } from '../../../../models/MetodoPago';
import { MetodoPagoService } from '../../../../services/metodopago.service';
import { PagoService } from '../../../../services/pago.service';
declare var $: any;
declare var jQuery: any;

declare var Materialize: any;

@Component({
    selector: 'registrocobranza',
    templateUrl: 'registrocobranza.html'
})
export class RegistroCobranzaComponent implements AfterViewChecked {

    @ViewChild("cliente")
    public clienteInput: ElementRef;

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Lista de clientes
    public clientes: Cliente[];

    // Lista de contratos
    public contratos: Contrato[];

    // Lista de metodos de pago
    public metodos: MetodoPago[];

    // Datos para el componente autocomplete
    private autocomplete: AutocompleteList;

    // Cliente seleccionado para cobrar
    private cliente: Cliente;

    // Cobranza a registrar
    public cobranzaHistorica: CobranzaHistorica = new CobranzaHistorica();

    // En caso de registrar un pago
    public pago: Pago = new Pago();

    // Indicar que se encuentra registrando la cobranza
    public registrando: boolean;

    public constructor(
        private _clienteService: ClienteService,
        private _cobranzaHistoricaService: CobranzaHistoricaService,
        private _contratoService: ContratoService,
        private _metodoPagoService: MetodoPagoService,
        private _pagoService: PagoService
    ) {

        this.autocomplete = new AutocompleteList();
        this.autocomplete.onSelect = (cliente: Cliente) => this.seleccionar(cliente);

        // Solicitar lista de clientes
        this._clienteService.query().subscribe(
            Response => {
                this.clientes = Response;
                this.autocomplete.putOptions(this.clientes);
            }
        );

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

        this.cliente = null;
        this.contratos = null;
        this.registrando = false;
        this.cobranzaHistorica = new CobranzaHistorica();
        this.pago = new Pago();
        this.clienteInput.nativeElement.value = "";

    }

    public seleccionar(cliente: Cliente) {
        // Al seleccionar un cliente del autocomplete
        this.cliente = cliente;
        this.contratos = null;

        if (this.cliente) {

            // Obtener contratos del cliente
            this._clienteService.getContratos(this.cliente).subscribe(
                Response => {
                    this.contratos = Response;
                }
            );

        }

    }

    public onChangeContrato() {
        // Al cambiar contrato

        // Actualizar id de contrato
        this.cobranzaHistorica.tgf_contrato_historico_id = this.cobranzaHistorica.contrato_historico.id;

        // Actualizar monto
        this.cobranzaHistorica.cob_monto = this.cobranzaHistorica.contrato_historico.grupo.gru_costo;
    }

    public onSubmit() {
        // Al emitir una cobranza

        // Validar contrato
        if (this.cobranzaHistorica.tgf_contrato_historico_id != null && this.cobranzaHistorica.cob_monto != null) {
            // Indicar que se encuentra registrando la cobranza
            this.registrando = true;

            // Registrar cobranza
            this._cobranzaHistoricaService.save(this.cobranzaHistorica).subscribe(
                Response => {
                    // Si hay método de pago, agregar un pago
                    if (this.pago.tgf_metodo_pago_id) {
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

    public abrir() {
        // Eliminar datos de formulario
        this.limpiar();

        // Abrir modal
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        // Eliminar datos de formulario
        this.limpiar();

        // Cerrar modal
        this.modal.emit({ action: "modal", params: ['close'] });
    }

}