import { Component, Input, OnInit } from "@angular/core";
import { ContratoService } from "../../../../services/contrato.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'acta',
    templateUrl: 'acta.html',
    providers: [ContratoService]
})
export class ActaComponent implements OnInit {

    @Input()
    public contrato_id: number;

    public acta: Blob;
    public actaUrl: SafeUrl;

    public constructor(
        private _contratoService: ContratoService,
        private _sanitizer: DomSanitizer
    ) {

    }

    public ngOnInit() {

        this._contratoService.getActa(this.contrato_id).subscribe(
            Response => {
                this.acta = Response;
                this.actaUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(Response));
            },
            error => { }
        );

    }

}