import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CobranzaService } from '../../../services/cobranza.service'

@Component({
  selector: 'cobranza',
  templateUrl: 'cobranza.html',
  providers: [CobranzaService]
})

export class CobranzaComponent implements OnInit {

  public cobranzas: JSON[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cobranzaService: CobranzaService
  ){
    this._cobranzaService.getCliente().subscribe(
      Response => {
        this.cobranzas = Response;
        console.log(this.cobranzas);
      },
      Error => {
        console.log(<any>Error)
      }
    );
  }

  ngOnInit(){
    console.log('el compenente cobranza a sido cargado');
  }
}