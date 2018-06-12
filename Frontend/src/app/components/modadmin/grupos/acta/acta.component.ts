import { Component, Input } from "@angular/core";
import { ContratoService } from "../../../../services/contrato.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { HttpEventType } from "@angular/common/http";

@Component({
    selector: 'acta',
    templateUrl: 'acta.html'
})
export class ActaComponent {

    @Input()
    public contrato_id: number;

    private acta: Blob;
    private actaUrl: SafeUrl;

    public sent: boolean;
    public porcentaje: number;

    public constructor(
        private _contratoService: ContratoService,
        private _sanitizer: DomSanitizer
    ) {
        this.sent = false;
        this.porcentaje = 0;
    }

    public descargar() {

        this._contratoService.getActa(this.contrato_id).subscribe(
            Event => {
                if ( Event.type == HttpEventType.Sent ) {
                    this.sent = true;
                } else if ( Event.type == HttpEventType.DownloadProgress ) {
                    this.porcentaje = 100 * Event.loaded / Event.total;
                } else if ( Event.type == HttpEventType.Response ) {
                    // Indicar que se terminó de descargar
                    this.sent = false;
                    this.porcentaje = 0;
                    
                    // Crear objeto URL
                    let file = URL.createObjectURL(Event.body);

                    // Abrir archivo
                    window.open(file, "download");
                }
            }
        );

    }

}