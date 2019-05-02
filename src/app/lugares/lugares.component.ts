import { Component } from '@angular/core';
import{LugaresService}from "../services/lugares.service";
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: "app-lugares",
  templateUrl: "./lugares.component.html"
})
export class LugaresComponent {
  title = "GoGdl";

lat: number = 20.6430428;
lng: number = -103.3703034;
lugares = null;
loggedUser:any = null;
usuario:any = {};
loggedIn = false;

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
      subscribe(usuario => {
        this.usuario = usuario;
      });
      this.autorizacionService.isLogged()
      .subscribe((result) => {
        if(result && result.uid){
          this.loggedIn = true;
          setTimeout(() => {
            this.loggedUser = this.autorizacionService.getUser().currentUser.uid;
          }, 500);
        } else {
          this.loggedIn = false;
        }
      }, (error) => {
        this.loggedIn = false;
      });
    }, 500)
  }
  filterLugar = "";
}
