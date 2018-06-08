import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CobranzaService } from '../../../services/cobranza.service';
import { GLOBAL } from '../../../services/global';
import { Cobranza } from '../../../models/Cobranza';

@Component({
  selector: 'cobranza',
  templateUrl: 'cobranza.html'
})
export class CobranzaComponent {

  // Lista de cobranzas
  public cobranzas: Cobranza[];

  // Pagina actual
  public p: number = 1;

  public constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cobranzaService: CobranzaService
  ) {

    // Solicitar las cobranzas del cliente a backend
    this._cobranzaService.getCobranzasCliente().subscribe(
      Response => {
        this.cobranzas = Response;
      }
    );
    
  }

  public redirect(id) {
    window.location.href = GLOBAL.url + 'webpay/pagar/' + id;
  }
}