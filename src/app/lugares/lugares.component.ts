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
  constante =  0.003;
  lat: number = 20.6430428;
  lng: number = -103.3703034;
  lugares = null;
  loggedUser:any = null;
  usuario:any = {};
  loggedIn = false;
  articulos: any = {};
  private promedio = 0;
  mC: Boolean = false;
  listaCalificacion:any = [];

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
      //navigator.geolocation.getCurrentPosition(this.mostrar);
  }
  filtroArt = "";
  filterLugar = "";

  public mostrarCal(n1, n2, n3, n4,n5, lugar) {
    this.promedio = Math.round((5 * n5 + 4 * n4 + 3 * n3 + 2 * n2 + 1 * n1) / (n5 + n4 + n3 + n2 + n1)*1000)/1000;
    
    console.log(this.promedio);
  }
  public mayorCalificacion(){
    this.mC = !(this.mC);
  }

  public mostrar(pos) {
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.longitude;
  }
}
