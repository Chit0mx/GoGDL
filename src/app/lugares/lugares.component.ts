import { Component } from '@angular/core';
import{LugaresService}from "../services/lugares.service";
import { ArticulosService } from '../services/articulos.service';
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
articulos: any = {};

  constructor(private lugaresService: LugaresService, private autorizacionService:AutorizacionService, private articulosService:ArticulosService) {
    lugaresService.getLugares().
    valueChanges().
    subscribe(lugares => {
      this.lugares = lugares;
    });
    articulosService
      .getArticulos()
      .valueChanges()
      .subscribe(articulos => {
        this.articulos = articulos ;
      });
  }
  filtroArt = "";
  filterLugar = "";
}
