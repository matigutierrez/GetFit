import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { PlanService } from '../../../services/plan.service';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'cliente',
  templateUrl: 'cliente.html',
  providers: [ClienteService, PlanService]
})

export class ClienteComponent implements OnInit {
  public cliente;
  public plan: JSON;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _planService: PlanService

  ){
    this.cliente = {
      "cli_rut": "",
      "cli_nombres": "",
      "cli_apellidos": "",
      "cli_numerotelefonico": "",
      "cli_direccion": "",
      "cli_huella": "",
    };

    this._route.params.forEach((params: Params) => {
      let plan = +params['plan'];
      this._planService.getPlanId(plan).subscribe(
        Response => {
          this.plan = Response;
          console.log(this.plan);
        },
        Error => {
          console.log(<any>Error);
        }
      );
    });
  }

  ngOnInit(){
    console.log('el compenente cliente a sido cargado');
  }

  onSubmit(){
    console.log(this.cliente);
    $('ul.tabs').tabs('select_tab', 'test2');
  }
}