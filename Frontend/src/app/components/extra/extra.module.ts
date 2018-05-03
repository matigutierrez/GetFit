import { NgModule } from "@angular/core";
import { MaterializeModule } from "angular2-materialize";
import { HorarioComponent } from "./horario/horario.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        HorarioComponent
    ],
    exports: [
        HorarioComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MaterializeModule
    ],
    providers: [
        
    ]
})
export class ExtraModule { }