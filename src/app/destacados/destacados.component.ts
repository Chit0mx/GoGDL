import { Component } from "@angular/core";
import { LugaresService } from "../services/lugares.service";
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: "app-destacados",
  templateUrl: "./destacados.component.html"
})
export class DestacadosComponent {
  title = "GoGdl";

  lat: number = 20.6430428;
  lng: number = -103.3703034;
  lugares = null;
  articulos: any = {};

  constructor(private lugaresService: LugaresService, private articulosService:ArticulosService) {
    lugaresService
      .getLugares()
      .valueChanges()
      .subscribe(lugares => {
        this.lugares = lugares;
      });
    articulosService
      .getArticulos()
      .valueChanges()
      .subscribe(articulos => {
        this.articulos = articulos ;
      });
  }
  filterLugar = "";
}
