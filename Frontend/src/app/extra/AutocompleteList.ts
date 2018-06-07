import { Autocompletable } from "./Autocompletable";

export class AutocompleteList {

    private data: any;
    private onAutocomplete: any;
    private autocompletables: Autocompletable[];
    private autocompletablesHash: any;

    public onSelect: any;

    public constructor(autocompletables?: Autocompletable[]) {

        // Datos a mostrar
        this.data = {};

        // Al realizar autocompletado
        this.onAutocomplete = (option: string) => this.onPerformAutocomplete(option);

        // Otros datos
        this.autocompletables = [];
        this.autocompletablesHash = {}

        if (autocompletables) {
            this.putOptions(autocompletables);
        }

    }

    public clean() {
        this.data = {};
        this.autocompletables = [];
        this.autocompletablesHash = {};
    }

    public putOptions(autocompletables: Autocompletable[]) {
        for (let i = 0; i < autocompletables.length; i++) {
            this.putOption(autocompletables[i]);
        }
    }

    public putOption(autocompletable: Autocompletable) {
        // Obtener valor del autocompletable y URL
        let option: string = autocompletable.getOption();
        let url: string = null;
        
        if (autocompletable.getImageURL) {
            url = autocompletable.getImageURL();
        }

        // Hashear datos
        this.data[option] = url;
        this.autocompletables.push(autocompletable);
        this.autocompletablesHash[option] = autocompletable;
    }

    public onPerformAutocomplete(option: string) {
        // Al seleccionar un elemento autocompletable
        let autocompletable: Autocompletable = this.autocompletablesHash[option];

        // Si el elemento no es nulo
        if (autocompletable != null) {
            // Si hay una función para indicar selección
            if (this.onSelect != null) {
                this.onSelect(autocompletable);
            }
        }
    }

}