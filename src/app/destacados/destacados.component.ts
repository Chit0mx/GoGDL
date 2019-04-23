import { Component } from "@angular/core";
import { LugaresService } from "../services/lugares.service";
@Component({
  selector: "app-destacados",
  templateUrl: "./destacados.component.html"
})
export class DestacadosComponent {
  title = "GoGdl";

  lat: number = 20.6430428;
  lng: number = -103.3703034;
  lugares = null;

  constructor(private lugaresService: LugaresService) {
    lugaresService
      .getLugares()
      .valueChanges()
      .subscribe(lugares => {
        this.lugares = lugares;
      });
  }
  filterLugar = "";
}
