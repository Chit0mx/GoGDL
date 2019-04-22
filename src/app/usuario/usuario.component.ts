import { Component } from '@angular/core';
import{LugaresService}from "../services/lugares.service";
import { AutorizacionService } from '../services/autorizacion.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
  title = 'GoGdl';
  lugares =null;
  loggedUser:any = null;
  usuarioDB:any = {};
  constructor(private lugaresService: LugaresService, private autorizacionService:AutorizacionService) {
    lugaresService.getLugares().
    valueChanges().
    subscribe(lugares => {
      this.lugares = lugares;
    });
    setTimeout(() => {
      this.loggedUser = this.autorizacionService.getUser().currentUser.uid;
      this.autorizacionService.obtenerUsuario()
      .valueChanges().
      subscribe(usuarioDB => {
        this.usuarioDB = usuarioDB;
      });
    }, 500)
  }
}
