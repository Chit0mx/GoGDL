import { Component, ChangeDetectorRef } from "@angular/core";
import { LugaresService } from "../services/lugares.service";
import { ArticulosService } from "../services/articulos.service";
import { AutorizacionService } from "../services/autorizacion.service";
import { GeoLocationService } from '../services/geolocation.service';


@Component({
  selector: "app-lugares",
  templateUrl: "./lugares.component.html"
})
export class LugaresComponent {
  title = "GoGdl";
  constante = 0.003;
  lat: number = 20.6430428;
  lng: number = -103.3703034;
  lugares = null;
  loggedUser: any = null;
  usuario: any = {};
  loggedIn = false;
  articulos: any = {};
  mC: Boolean = false;
  mV: Boolean = false;
  listaCalificacion: any = [];
  listaVistas: any = [];
  lVisto = 0;
  lPromedio = 0;
  listaCreada: Boolean = false;
  errorMsg: string; 
  currentLocation: Coordinates = null;

  constructor(
    private lugaresService: LugaresService,
    private autorizacionService: AutorizacionService,
    private articulosService: ArticulosService,
    private ref: ChangeDetectorRef,
    private geoLocationService: GeoLocationService
  ) {
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
        this.articulos = articulos;
      });
      this.searchByCurrent();
  }
  filtroArt = "";
  filterLugar = "";


  public mostrarCal(n1, n2, n3, n4, n5, lugar) {
    if (this.listaCreada == false) {
      let promedio =
        Math.round(
          ((5 * n5 + 4 * n4 + 3 * n3 + 2 * n2 + 1 * n1) /
            (n5 + n4 + n3 + n2 + n1)) *
            1000
        ) / 1000;
      lugar.promedio = promedio;
      this.listaCalificacion.push(lugar);
      this.listaCalificacion.sort((a, b) => {
        if (a.promedio > b.promedio) {
          return -1;
        }
        if (a.promedio < b.promedio) {
          return 1;
        }
        return 0;
      });
      this.lPromedio = promedio;
      this.mostrarVis(lugar);
    }
  }

  public mostrarVis(lugar) {
    if (this.listaCreada == false) {
      this.listaVistas.push(lugar);
      this.listaVistas.sort((a, b) => {
        if (a.visto > b.visto) {
          return -1;
        }
        if (a.visto < b.visto) {
          return 1;
        }
        return 0;
      });
    }
  }

  public mayorCalificacion() {
    this.mV = false;
    this.mC = !this.mC;
    this.listaCreada = true;
  }

  public mostrarListaVistas() {
    this.mC = false;
    this.mV = !this.mV;
    this.listaCreada = true;
  }

  public range(start, stop, step) {
    if (typeof stop == "undefined") {
      stop = start;
      start = 0;
    }

    if (typeof step == "undefined") {
      step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  searchByCurrent() { let self = this;
    const accuracy = { enableHighAccuracy: true }; 
    self.geoLocationService.getLocation(accuracy).subscribe((position) => {
    console.log(position);
    self.currentLocation = position; 
    self.ref.detectChanges();
    }, (error) => { 
      self.errorMsg = error;
      self.ref.detectChanges(); 
    } );
  }
}
