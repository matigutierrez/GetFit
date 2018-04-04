import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { RolService } from '../../../../services/rol.service';

@Component({
  selector: 'registrousuario',
  templateUrl: 'registrousuario.html',
  providers: [UsuarioService, RolService]
})

export class RegistroUsuarioComponent implements OnInit {
  public usuario;
  public selectOptions: JSON[];
  @Output() modal = new EventEmitter();
  @Input() client: string;

  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolService
  ){
    this.usuario = {
      "tgf_rol_id": "",
      "tgf_cliente_id": "",
      "usu_correo": "",
      "password": ""
    };
    this._rolService.query().subscribe(
      Response => {
        this.selectOptions = Response;
      },
      Error => {
        console.log(<any>Error);
      }
    );
  }

  ngOnInit(){
    //console.log('el compenente registro-usuario ha sido cargado');
  }

  onSubmit(){
    if(this.client != undefined){
      this.usuario.tgf_cliente_id = this.client;
      console.log(this.usuario);
      this.modal.emit({modal: true});
    }
  }
}