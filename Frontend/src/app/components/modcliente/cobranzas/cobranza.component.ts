import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CobranzaService } from '../../../services/cobranza.service';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'cobranza',
  templateUrl: 'cobranza.html',
  providers: [CobranzaService]
})

export class CobranzaComponent implements OnInit {

  public cobranzas: JSON[];
  public p: number = 1;
  public API: string;
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cobranzaService: CobranzaService
  ){
    this._cobranzaService.getCobranzasCliente().subscribe(
      Response => {
        this.cobranzas = Response;
        console.log(this.cobranzas);
      },
      Error => {
        console.log(<any>Error)
      }
    );
    this.API = GLOBAL.url;
  }

  ngOnInit(){
    //console.log('el componente cobranza ha sido cargado');
  }

  redirect(id) {
    window.location.href = this.API+'webpay/pagar/'+ id;
  }
}